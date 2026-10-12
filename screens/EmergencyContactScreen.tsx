import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { API_URL } from "../services/api";
import { getToken } from "../services/authSession";
import { styles } from "../styles/EmergencyContactStyles";

type EmergencyContact = {
  emergencyContactId: string;
  contactName: string;
  phoneNumber: string;
};

export default function EmergencyContactScreen() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getContacts();
  }, []);

  async function getContacts() {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/emergency-contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not load emergency contact.");

        return;
      }

      setContacts(data);
    } catch (error) {
      console.log(error);

      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  async function addContact() {
    setError("");

    if (contacts.length > 0) {
      setError("You can only have one emergency contact.");

      return;
    }

    if (!contactName.trim() || !phoneNumber.trim()) {
      setError("Please enter contact name and phone number.");

      return;
    }

    try {
      setAdding(true);

      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(`${API_URL}/Rides/emergency-contacts`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          contactName: contactName.trim(),
          phoneNumber: phoneNumber.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not add emergency contact.");

        return;
      }

      setContacts([data]);

      setContactName("");
      setPhoneNumber("");
    } catch (error) {
      console.log(error);

      setError("Could not connect to the server.");
    } finally {
      setAdding(false);
    }
  }

  async function deleteContact(contactId: string) {
    try {
      const token = await getToken();

      if (!token) {
        return;
      }

      const response = await fetch(
        `${API_URL}/Rides/emergency-contacts/${contactId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        return;
      }

      setContacts([]);
      setError("");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.title}>Emergency Contact</Text>
        </View>

        <Text style={styles.sectionTitle}>Your Emergency Contact</Text>

        {contacts.length === 0 ? (
          <Text style={styles.emptyText}>No emergency contact added yet.</Text>
        ) : (
          <View style={styles.contactCard}>
            <View>
              <Text style={styles.contactName}>{contacts[0].contactName}</Text>

              <Text style={styles.contactPhone}>{contacts[0].phoneNumber}</Text>
            </View>

            <TouchableOpacity
              onPress={() => deleteContact(contacts[0].emergencyContactId)}
            >
              <Ionicons name="trash-outline" size={21} color="#FF5C5C" />
            </TouchableOpacity>
          </View>
        )}

        {contacts.length === 0 && (
          <>
            <Text style={styles.sectionTitle}>Add Emergency Contact</Text>

            <Text style={styles.label}>Contact Name</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter contact name"
              placeholderTextColor="#737373"
              value={contactName}
              onChangeText={setContactName}
            />

            <Text style={styles.label}>Phone Number</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#737373"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={styles.addButton}
              onPress={addContact}
              disabled={adding}
            >
              {adding ? (
                <ActivityIndicator color="#050505" />
              ) : (
                <Text style={styles.addButtonText}>Add Emergency Contact</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}
