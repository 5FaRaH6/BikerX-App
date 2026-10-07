import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { API_URL } from './api';
import { getToken } from './authSession';

export async function savePushToken() {
  try {
    const permission = await Notifications.requestPermissionsAsync();

    console.log('permission:', permission.status);

    if (permission.status !== 'granted') {
      return;
    }

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId;

    console.log('projectId:', projectId);

    if (!projectId) {
      return;
    }

    const pushToken = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    console.log('push token:', pushToken.data);

    const token = await getToken();

    console.log('jwt exists:', !!token);

    if (!token) {
      return;
    }

    const response = await fetch(`${API_URL}/Users/me/push-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        expoPushToken: pushToken.data,
      }),
    });

    console.log('save push response:', response.status);
  }
  catch (error) {
    console.log('PUSH ERROR:', error);
  }
}