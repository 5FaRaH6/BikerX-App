import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { API_URL } from '../services/api';
import { styles } from '../styles/VerifyEmailStyles';

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams();

  const email = String(params.email || '');
  const type = String(params.type || 'signup');

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function verifyCode() {
    setError('');

    if (!code.trim()) {
      setError('Please enter the verification code.');
      return;
    }

    if (type === 'reset') {
      router.push({
        pathname: '/create-new-password',
        params: {
          email,
          code: code.trim(),
        },
      });

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: code.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === 'string') {
          setError(data);
        } else {
          setError(data.message || 'Invalid verification code.');
        }

        return;
      }

      router.replace('/login');
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

      <Text style={styles.title}>Verify Email</Text>

      <Text style={styles.subtitle}>
        Enter the verification code sent to
      </Text>

      <Text style={styles.email}>{email}</Text>

      <Text style={styles.label}>Verification Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter code"
        placeholderTextColor="#737373"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        maxLength={6}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={verifyCode}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#050505" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}