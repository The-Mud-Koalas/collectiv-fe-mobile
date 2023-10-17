import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  const token = await AsyncStorage.getItem("refreshToken");
  // console.log({token})

  const idTokenResponse = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.EXPO_PUBLIC_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: token,
      }),
    }
  );
  
  const response = await idTokenResponse.json();
  const idTokenContent = response.id_token;

  if (!idTokenResponse.ok) {
    throw new Error(`Response with status code ${idTokenResponse.status}`, {
      cause: idTokenContent,
    });
  }

  return idTokenContent;
};
