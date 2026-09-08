import AsyncStorage from '@react-native-async-storage/async-storage';

let sessionToken: string | null = null;

export async function saveToken(token: string, keepLoggedIn: boolean) {
  sessionToken = token;

  if (keepLoggedIn) {
    await AsyncStorage.setItem('token', token);
  } else {
    await AsyncStorage.removeItem('token');
  }
}

export async function getToken() {
  if (sessionToken) {
    return sessionToken;
  }

  const token = await AsyncStorage.getItem('token');

  if (token) {
    sessionToken = token;
  }

  return token;
}

export async function logout() {
  sessionToken = null;
  await AsyncStorage.removeItem('token');
}