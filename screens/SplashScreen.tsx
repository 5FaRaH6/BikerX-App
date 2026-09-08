import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { router } from 'expo-router';

import { getToken } from '../services/authSession';
import { styles } from '../styles/SplashStyles';

export default function SplashScreen() {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startSplash();
  }, []);

  async function startSplash() {
    Animated.timing(fade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const token = await getToken();

    setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (token) {
          router.replace('/home');
        } else {
          router.replace('/login');
        }
      });
    }, 1800);
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/bikerx-logo.png')}
        style={[styles.logo, { opacity: fade }]}
        resizeMode="contain"
      />
    </View>
  );
}