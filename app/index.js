import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
    const searchParam = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: `${process.env.EXPO_PUBLIC_APP_URL}${searchParam.link}` }} style={styles.webview} />
      <StatusBar style="auto" />
      <Link href={`?link=${encodeURIComponent("/accounts/login")}`}>Test</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  webview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  }
});
