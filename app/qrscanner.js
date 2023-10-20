import { BarCodeScanner } from "expo-barcode-scanner";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";
import { getToken } from "../utils/getToken";
import { postRequest } from "../utils/fetch";
import * as Location from "expo-location";

const QrScannerPage = () => {
  const searchParam = useLocalSearchParams();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  const eventId = searchParam.eventId;
  const participationType = searchParam.participationType;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const idToken = await getToken();

    const endpoint = `/participation/${participationType.toLowerCase()}/check-in/assisted`;
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    const checkInData = {
      event_id: eventId,
    };

    try {
      const body = {
        event_id: eventId,
        latitude,
        longitude,
        [participationType === "Participant"
          ? "participant_email_phone"
          : "volunteer_email_phone"]: data,
      };

      const checkIn = await postRequest({
        endpoint,
        body,
        token: idToken,
      });

      const pushedUrl = encodeURIComponent(
        `/event/${eventId}?checkInParticipantOrVolunteer=true&userIdentifier=${data}`
      );

      router.push(`/?link=${pushedUrl}`);
    } catch (error) {
      setScanned(false);
      ToastAndroid.show(error.cause.message, ToastAndroid.SHORT)
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.qr}
      />
      <View style={styles.rowView}>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}><Text style={styles.text}>Back</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}><Text style={styles.text}>Clear</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFCEF",
    alignItems: "center",
    justifyContent: "center"
  },

  button: {
    borderWidth: 2,
    borderColor: "#163300",
    
    borderRadius: 99999,
    paddingHorizontal: 25,
    paddingVertical: 10,
    
  },

  text: {
    color: "#163300",
    fontSize: 17
  },

  rowView: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
    alignItems: "center"
  },

  qr: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
});

export default QrScannerPage;
