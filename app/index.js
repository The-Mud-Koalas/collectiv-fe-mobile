import { useLocalSearchParams, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const LOCATION_TRACKING = "location-tracking";

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error("Location tracking is broken");
    return;
  }

  const token = await AsyncStorage.getItem("refreshToken");

  const coords = data.locations[0].coords;
  const { latitude, longitude } = coords;
  
  const API_KEY = "AIzaSyDNn2Derdiv7ygS445WhQdwaNU8j_UIkX4";

  const idTokenResponse = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
    method: "POST",
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: token
    })
  });

  const { id_token: idToken } = await idTokenResponse.json();

  const searchParam = new URLSearchParams({ latitude, longitude });

  const url = `${
    process.env.EXPO_PUBLIC_BACKEND_URL
  }/event/discover/nearby/?${searchParam.toString()}`;

  // If statement to check whether still participating on events

  const listOfEventsResponse = await fetch(url, {
    headers: { Authorization: `Bearer ${idToken}` },
  });

  if (!listOfEventsResponse.ok) {
    console.error(listOfEventsResponse.status);
  }

  const listOfEventsJSON = await listOfEventsResponse.json();
  console.log({ listOfEventsJSON });
});

export default function App() {
  const searchParam = useLocalSearchParams();

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));

  console = {
    log: (log) => consoleLog('log', log),
    debug: (log) => consoleLog('debug', log),
    info: (log) => consoleLog('info', log),
    warn: (log) => {},
    error: (log) => consoleLog('error', log),
  };
`;

  const askLocationPerms = async () => {
    const permFg = await Location.requestForegroundPermissionsAsync();

    if (permFg.status !== "granted") {
      return { allow: false, reason: "Foreground Location access is denied." };
    }

    const permBg = await Location.requestBackgroundPermissionsAsync();
    if (permBg.status !== "granted") {
      return { allow: false, reason: "Background Location access is denied." };
    }

    return { allow: true, reason: null };
  };

  const startLocationTracking = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );

    if (hasStarted) return;

    Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.BestForNavigation,
      deferredUpdatesInterval: 0,
      deferredUpdatesDistance: 0,
      foregroundService: {
        notificationTitle: "title",
        notificationBody: "body",
        notificationColor: "#0000FF",
      },
    });
    //  Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    //   accuracy: Location.Accuracy.BestForNavigation,
    //   deferredUpdatesDistance: 500,
    //   foregroundService: {
    //     notificationTitle: "title",
    //     notificationBody: "body",
    //     notificationColor: "#0000FF",
    //   },
    // });
  };

  const stopLocationTracking = async () => {
    const taskRegistered = await TaskManager.isTaskRegisteredAsync(
      LOCATION_TRACKING
    );
    if (taskRegistered) {
      Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    }
  };

  const handleMessage = async (event) => {
    const message = JSON.parse(event?.nativeEvent?.data);
    const { type } = message;

    switch (type) {
      case "location-sharing": {
        const agreeToLocationSharing = message.agree;

        // Do something with agree to location sharing
        if (agreeToLocationSharing) {
          const permissions = await askLocationPerms();

          if (!permissions.allow) return;
          startLocationTracking();
        } else {
          stopLocationTracking();
        }
        break;
      }
      case "auth-token": {
        const token = message.token;

        if (token == null) {
          await AsyncStorage.removeItem("refreshToken");
        }

        await AsyncStorage.setItem("refreshToken", token);
      }
    }
  };

  const uri = `${process.env.EXPO_PUBLIC_APP_URL}${searchParam.link ?? ""}`;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        injectedJavaScript={debugging}
        source={{
          uri,
        }}
        geolocationEnabled
        onMessage={handleMessage}
        style={styles.webview}
      />
      <StatusBar style="auto" />
      <Link href={`/qrscanner`}>Test</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  webview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
