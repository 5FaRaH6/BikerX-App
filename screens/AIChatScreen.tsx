import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";

import {
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/AIChatStyles";

type AIMessage = {
  role: string;
  text: string;
  createdAt?: string;
};

export default function AIChatScreen() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const listRef = useRef<FlatList<AIMessage>>(null);

  useEffect(() => {
    loadConversation();
  }, []);

  async function loadConversation() {
    try {
      setLoading(true);
      setError("");

      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`${API_URL}/AI`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.message ?? "Could not load the conversation.");

        return;
      }

      setMessages(data?.messages ?? []);
    } catch (error) {
      console.log("AI CHAT LOAD ERROR:", error);

      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    const question = message.trim();

    if (question === "" || sending) {
      return;
    }

    try {
      setSending(true);
      setError("");
      setMessage("");

      const userMessage: AIMessage = {
        role: "user",
        text: question,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, userMessage]);

      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`${API_URL}/AI/ask`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.message ?? "Could not get an AI response.");

        return;
      }

      const aiMessage: AIMessage = {
        role: "assistant",
        text: data.answer,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [...current, aiMessage]);
    } catch (error) {
      console.log("AI CHAT ERROR:", error);

      setError("Could not connect to the server.");
    } finally {
      setSending(false);
    }
  }

  function restartConversation() {
    Alert.alert(
      "Restart Conversation",
      "Delete the current conversation and start again?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Restart",
          style: "destructive",
          onPress: restartAIConversation,
        },
      ],
    );
  }

  async function restartAIConversation() {
    try {
      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`${API_URL}/AI/restart`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.message ?? "Could not restart the conversation.");

        return;
      }

      setMessages([]);
      setError("");
    } catch (error) {
      console.log("RESTART AI CHAT ERROR:", error);

      setError("Could not connect to the server.");
    }
  }

  function renderMessage({ item }: { item: AIMessage }) {
    const isUser = item.role === "user";

    return (
      <View
        style={[
          styles.messageRow,
          isUser ? styles.userMessageRow : styles.aiMessageRow,
        ]}
      >
        {!isUser && (
          <View style={styles.aiAvatar}>
            <Ionicons name="sparkles" size={17} color="#050505" />
          </View>
        )}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#39FF14" />

        <Text style={styles.loadingText}>Loading BikerX AI...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={25} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerIcon}>
            <Ionicons name="sparkles" size={17} color="#050505" />
          </View>

          <View>
            <Text style={styles.title}>BikerX AI</Text>

            <Text style={styles.subtitle}>Motorcycle Assistant</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={restartConversation}
        >
          <Ionicons name="refresh-outline" size={23} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.bigAIIcon}>
            <Ionicons name="sparkles" size={34} color="#050505" />
          </View>

          <Text style={styles.emptyTitle}>Ask BikerX AI</Text>

          <Text style={styles.emptyText}>
            Ask about motorcycles, riding, safety, gear, maintenance and
            beginner riding tips.
          </Text>

          <View style={styles.topicRow}>
            <View style={styles.topic}>
              <Ionicons name="construct-outline" size={17} color="#39FF14" />

              <Text style={styles.topicText}>Maintenance</Text>
            </View>

            <View style={styles.topic}>
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color="#39FF14"
              />

              <Text style={styles.topicText}>Safety</Text>
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({
              animated: true,
            })
          }
        />
      )}

      {sending && (
        <View style={styles.typingRow}>
          <View style={styles.aiAvatar}>
            <Ionicons name="sparkles" size={17} color="#050505" />
          </View>

          <View style={styles.typingBubble}>
            <ActivityIndicator size="small" color="#39FF14" />

            <Text style={styles.typingText}>BikerX AI is thinking...</Text>
          </View>
        </View>
      )}

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Ask about motorcycles..."
          placeholderTextColor="#666666"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={700}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            (message.trim() === "" || sending) && styles.sendButtonDisabled,
          ]}
          disabled={message.trim() === "" || sending}
          onPress={sendMessage}
        >
          <Ionicons name="arrow-up" size={21} color="#050505" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
