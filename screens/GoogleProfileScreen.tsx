import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { API_URL } from '../services/api';
import { saveToken } from '../services/authSession';
import { clearGoogleSession, getGoogleKeepLoggedIn, getGoogleToken } from '../services/googleSession';
import { styles } from '../styles/GoogleProfileStyles';

export default function GoogleProfileScreen() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [hasBike, setHasBike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function completeProfile() {
    setError('');

    if (!username.trim() || !age.trim()) {
      setError('Please fill all fields.');
      return;
    }

    const ageNumber = Number(age);

    if (ageNumber < 18) {
      setError('You must be at least 18 years old.');
      return;
    }

    const idToken = getGoogleToken();

    if (!idToken) {
      setError('Google login expired. Please try again.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          username: username.trim(),
          age: ageNumber,
          hasBike,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Could not create account.');
        return;
      }

      const token = data.token || data.Token;

      if (!token) {
        setError('Token was not returned.');
        return;
      }

      await saveToken(token, getGoogleKeepLoggedIn());

      clearGoogleSession();
      router.replace('/home');
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
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>Just a few more details</Text>

      <Text style={styles.label}>Username</Text>

      <TextInput
        style={styles.input}
        placeholder="Choose a username"
        placeholderTextColor="#737373"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Age</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        placeholderTextColor="#737373"
        value={age}
        onChangeText={setAge}
        keyboardType="number-pad"
      />

      <Text style={styles.label}>Do you own a bike?</Text>

      <View style={styles.bikeOptions}>
        <TouchableOpacity
          style={[
            styles.bikeButton,
            hasBike && styles.selectedBikeButton,
          ]}
          onPress={() => setHasBike(true)}
        >
          <Text style={styles.bikeText}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bikeButton,
            !hasBike && styles.selectedBikeButton,
          ]}
          onPress={() => setHasBike(false)}
        >
          <Text style={styles.bikeText}>No</Text>
        </TouchableOpacity>
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={completeProfile}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#050505" />
        ) : (
          <Text style={styles.continueText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}