import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { API_URL } from '../services/api';
import { styles } from '../styles/CreateNewPasswordStyles';

export default function CreateNewPasswordScreen() {
  const params = useLocalSearchParams();

  const email = String(params.email || '');
  const code = String(params.code || '');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function resetPassword() {
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === 'string') {
          setError(data);
        } else {
          setError(data.message || 'Could not reset password.');
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

      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.subtitle}>Enter your new password below</Text>

      <Text style={styles.label}>New Password</Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter new password"
          placeholderTextColor="#737373"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showText}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        placeholderTextColor="#737373"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
      />

      <Text style={styles.passwordHint}>
        At least 8 characters with uppercase, lowercase, number and special character
      </Text>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={resetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#050505" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}