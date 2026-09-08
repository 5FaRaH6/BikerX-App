import { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { API_URL } from '../services/api';
import { getToken } from '../services/authSession';
import { styles } from '../styles/CreatePostStyles';

export default function CreatePostScreen() {
  const [about, setAbout] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [allowComments, setAllowComments] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // choose image
  async function chooseImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission', 'Gallery permission is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  // create post
  async function createPost() {
    setError('');

    if (!about.trim()) {
      setError('Please enter something about your post.');
      return;
    }

    try {
      setLoading(true);

      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const formData = new FormData();

      formData.append('About', about.trim());
      formData.append('Description', description.trim());
      formData.append('Address', address.trim());
      formData.append('AllowComments', String(allowComments));

      if (image) {
        const fileName = image.split('/').pop() || 'photo.jpg';

        formData.append('Photo', {
          uri: image,
          name: fileName,
          type: 'image/jpeg',
        } as any);
      }

      const response = await fetch(`${API_URL}/Posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Could not create post.');
        return;
      }

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

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="close"
            size={27}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Create Post</Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.label}>About</Text>

        <TextInput
          style={styles.input}
          placeholder="What is your post about?"
          placeholderTextColor="#737373"
          value={about}
          onChangeText={setAbout}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Write something..."
          placeholderTextColor="#737373"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Photo</Text>

        <TouchableOpacity
          style={styles.imageButton}
          onPress={chooseImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          ) : (
            <>
              <Ionicons
                name="image-outline"
                size={35}
                color="#39FF14"
              />

              <Text style={styles.imageButtonText}>
                Choose Photo
              </Text>
            </>
          )}
        </TouchableOpacity>

        {image && (
          <TouchableOpacity
            style={styles.removeImage}
            onPress={() => setImage(null)}
          >
            <Text style={styles.removeImageText}>
              Remove Photo
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.label}>Location</Text>

        <View style={styles.locationInput}>
          <Ionicons
            name="location-outline"
            size={20}
            color="#39FF14"
          />

          <TextInput
            style={styles.locationTextInput}
            placeholder="Add location"
            placeholderTextColor="#737373"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <TouchableOpacity
          style={styles.commentsRow}
          onPress={() => setAllowComments(!allowComments)}
        >
          <View>
            <Text style={styles.commentsTitle}>
              Allow Comments
            </Text>

            <Text style={styles.commentsText}>
              Let people comment on this post
            </Text>
          </View>

          <Ionicons
            name={allowComments ? 'toggle' : 'toggle-outline'}
            size={38}
            color={allowComments ? '#39FF14' : '#777777'}
          />
        </TouchableOpacity>

        {error !== '' && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        <TouchableOpacity
          style={styles.postButton}
          onPress={createPost}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#050505" />
          ) : (
            <Text style={styles.postButtonText}>
              Post
            </Text>
          )}
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
}