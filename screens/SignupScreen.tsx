import { useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin';

import { API_URL } from '../services/api';
import { saveToken } from '../services/authSession';
import { saveGoogleSession } from '../services/googleSession';
import { styles } from '../styles/SignupStyles';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
});

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [hasBike, setHasBike] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function signup() {
    setError('');

    if ( !fullName.trim() ||!username.trim() || !age.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill all fields.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          username: username.trim(),
          age: Number(age),
          email: email.trim(),
          hasBike,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === 'string') {
          setError(data);
        } else {
          setError(data.message || 'Signup failed.');
        }

        return;
      }

      router.push({
        pathname: '/verify-email',
        params: {
          email: email.trim(),
          type: 'signup',
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

  async function googleSignup() {
    setError('');

    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();

      const result = await GoogleSignin.signIn();

      if (!isSuccessResponse(result)) return;

      const idToken = result.data.idToken;

      if (!idToken) {
        setError('Google sign up failed.');
        return;
      }

      const response = await fetch(`${API_URL}/Auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data === 'string'
            ? data
            : data.message;

        if (message === 'PROFILE_REQUIRED') {
          saveGoogleSession(idToken, true);
          router.push('/google-profile');
          return;
        }

        setError(message || 'Google sign up failed.');
        return;
      }

      const token = data.token || data.Token;

      if (!token) {
        setError('Token was not returned.');
        return;
      }

      await saveToken(token, true);
      router.replace('/home');
    }
    catch (error) {
      console.log(error);
      setError('Google sign up failed.');
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.logo}>
        Biker<Text style={styles.logoGreen}>X</Text>
      </Text>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the BikerX community</Text>

      <Text style={styles.label}>Full Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#737373"
        value={fullName}
        onChangeText={setFullName}
      />

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

      <Text style={styles.label}>Do you own a bike?</Text>

      <View style={styles.bikeContainer}>
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

      <Text style={styles.label}>Password</Text>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#737373"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#737373"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
      />

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.signupButton}
        onPress={signup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#050505" />
        ) : (
          <Text style={styles.signupButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={googleSignup}
        disabled={loading}
      >
        <View style={styles.googleIcon}>
          <Text style={styles.googleIconText}>G</Text>
        </View>

        <Text style={styles.googleButtonText}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>

        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}