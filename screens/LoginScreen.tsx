import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";

import { API_URL } from "../services/api";
import { saveToken } from "../services/authSession";
import { saveGoogleSession } from "../services/googleSession";
import { styles } from "../styles/LoginStyles";
import { savePushToken } from '../services/pushNotifications';


console.log(
  'GOOGLE CLIENT LOADED:',
  !!process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
);

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  offlineAccess: false,
});
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      const token = data.token || data.Token;

      if (!token) {
        setError("Token was not returned from the server.");
        return;
      }

      await saveToken(token, keepLoggedIn);
      console.log('BEFORE SAVE PUSH TOKEN');
      await savePushToken();
      router.replace("/home");
    } catch (error) {
      console.log(error);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function googleLogin() {
    setError("");

    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();

      const result = await GoogleSignin.signIn();

      if (!isSuccessResponse(result)) return;

      const idToken = result.data.idToken;

      if (!idToken) {
        setError("Google login failed.");
        return;
      }

      const response = await fetch(`${API_URL}/Auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === "PROFILE_REQUIRED") {
          saveGoogleSession(idToken, keepLoggedIn);
          router.push("/google-profile");
          return;
        }

        setError(data.message || "Google login failed.");
        return;
      }

      const token = data.token || data.Token;

      if (!token) {
        setError("Token was not returned.");
        return;
      }

      await saveToken(token, keepLoggedIn);
      await savePushToken();
      router.replace("/home");
    } catch (error) {
      console.log(error);
      setError("Google login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>
            Biker<Text style={styles.logoGreen}>X</Text>
          </Text>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue your ride</Text>
        </View>

        <View style={styles.form}>
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
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.options}>
            <TouchableOpacity
              style={styles.keepContainer}
              onPress={() => setKeepLoggedIn(!keepLoggedIn)}
            >
              <Text style={styles.checkbox}>{keepLoggedIn ? "☑" : "☐"}</Text>

              <Text style={styles.keepText}>Keep me logged in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {error !== "" && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={login}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#050505" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={googleLogin}
            disabled={loading}
          >
            <View style={styles.googleIcon}>
              <Text style={styles.googleIconText}>G</Text>
            </View>

            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
