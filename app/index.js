import { useLocalSearchParams, Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from "../utils/getToken";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const LOCATION_TRACKING = "location-tracking";

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error("Location tracking is broken");
    return;
  }

  const idToken = await getToken();
  
  const coords = data.locations[0].coords;
  const { latitude, longitude } = coords;

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
  
  const stringifiedListOfEvents = JSON.stringify(listOfEventsJSON);
  const listOfEventsPrevious = await AsyncStorage.getItem("listOfEvents");
  
  if (stringifiedListOfEvents === listOfEventsPrevious) return;
  const noOfEvents = listOfEventsJSON.length;

  if (noOfEvents === 0) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Let's have fun! 🎊`,
      body: `Get ready! There ${noOfEvents === 1 ? "is" : "are"} ${noOfEvents} events near you related to your interests.`,
      data: { data: `${noOfEvents} near you` },
    },
    trigger: { seconds: 1 },
  });

  await AsyncStorage.setItem("listOfEvents", stringifiedListOfEvents);
  

});

export default function App() {
  const searchParam = useLocalSearchParams();
  const router = useRouter();

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
          const notificationPerms = await Notifications.requestPermissionsAsync();
          if (!(notificationPerms.granted || notificationPerms.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL)) return;
          
          startLocationTracking();
          // stopLocationTracking();
        } else {
          stopLocationTracking();
        }
        break;
      }
      case "auth-token": {
        const token = message.token;

        if (token == null) {
          await AsyncStorage.removeItem("refreshToken");
          stopLocationTracking();
        }

        await AsyncStorage.setItem("refreshToken", token);
      }
      case "open-qr-scanner" : {
        const {event_id, participation_type} = message.checkInData;

        router.push(`/qrscanner?eventId=${event_id}&participationType=${participation_type}`);
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
        pullToRefreshEnabled
      />
      <StatusBar style="auto" />
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
