import { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native';
import { router } from 'expo-router';

import { API_URL } from '../services/api';
import { styles } from '../styles/ForgotPasswordStyles';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendCode() {
    setError('');

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === 'string') {
          setError(data);
        } else {
          setError(data.message || 'Could not send code.');
        }

        return;
      }

      router.push({
        pathname: '/verify-email',
        params: {
          email: email.trim(),
          type: 'reset',
        },
      });
    }
    catch (error) {
      console.log(error);
      setError('Could not connect to the server.');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Biker<Text style={styles.logoGreen}>X</Text>
      </Text>

      <Text style={styles.title}>Forgot Password?</Text>

      <Text style={styles.subtitle}>
        Enter your email and we will send you a verification code
      </Text>

      <Text style={styles.label}>Email</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#737373"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {error !== '' && (
        <Text style={styles.error}>{error}</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={sendCode}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#050505" />
        ) : (
          <Text style={styles.buttonText}>Send Code</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}