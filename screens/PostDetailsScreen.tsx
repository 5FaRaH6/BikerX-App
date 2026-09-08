import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { API_URL } from '../services/api';
import { getToken, logout } from '../services/authSession';
import { styles } from '../styles/PostDetailsStyles';

type Post = {
  postId: string;
  userId: string;
  username: string;
  userPhoto?: string;
  createdAt: string;
  imageUrl?: string;
  about: string;
  description?: string;
  address?: string;
  allowComments: boolean;
  postLikes: number;
  postComments: number;
  isLiked: boolean;
  canReport: boolean;
};

type Comment = {
  commentId: string;
  userId: string;
  username: string;
  userPhoto?: string;
  text: string;
  createdAt: string;
};

export default function PostDetailsScreen() {
  const params = useLocalSearchParams();
  const postId = String(params.postId || '');

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [reportOpen, setReportOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  // get post details
  async function getPost() {
    try {
      const token = await getToken();

      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await fetch(`${API_URL}/Posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await logout();
        router.replace('/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Could not load post.');
        return;
      }

      setPost(data);
    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
    finally {
      setLoading(false);
    }
  }

  // change like
  async function changeLike() {
    if (!post) return;

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/Posts/${post.postId}/like`, {
        method: post.isLiked ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      setPost({
        ...post,
        isLiked: !post.isLiked,
        postLikes: post.isLiked
          ? post.postLikes - 1
          : post.postLikes + 1,
      });
    }
    catch (error) {
      console.log(error);
    }
  }

  // get comments
async function getComments() {
  try {
    setCommentsLoading(true);

    const token = await getToken();

    if (!token) return;

    const response = await fetch(
      `${API_URL}/Posts/${postId}/comments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) return;

    setComments(data);
  }
  catch (error) {
    console.log(error);
  }
  finally {
    setCommentsLoading(false);
  }
}

  // report post
  async function reportPost() {
    if (!reason.trim()) {
      Alert.alert('Report', 'Please enter a reason.');
      return;
    }

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/Posts/${postId}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reason: reason.trim(),
          description: description.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Report', data.message || 'Could not report post.');
        return;
      }

      setReportOpen(false);
      setReason('');
      setDescription('');

      Alert.alert('Report', 'Post reported successfully.');
    }
    catch (error) {
      console.log(error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#39FF14" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loading}>
        <Text style={styles.errorText}>Post not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Post</Text>

        {post.canReport ? (
          <TouchableOpacity onPress={() => setReportOpen(true)}>
            <Ionicons name="ellipsis-horizontal" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerSpace} />
        )}
      </View>

      <TouchableOpacity
            style={styles.userRow}
            activeOpacity={0.7}
            onPress={() =>
            router.push(
      `/user-profile?userId=${post.userId}` as any
    )
  }
>
        {post.userPhoto ? (
          <Image
            source={{ uri: post.userPhoto }}
            style={styles.userPhoto}
          />
        ) : (
          <View style={styles.defaultPhoto}>
            <Text style={styles.defaultPhotoText}>
              {post.username.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View>
          <Text style={styles.username}>@{post.username}</Text>

          <Text style={styles.date}>
            {new Date(post.createdAt).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.about}>{post.about}</Text>

      {post.description && (
        <Text style={styles.description}>
          {post.description}
        </Text>
      )}

      {post.imageUrl && (
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.postImage}
        />
      )}

      {post.address && (
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color="#39FF14" />
          <Text style={styles.location}>{post.address}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.action}
          onPress={changeLike}
        >
          <Ionicons
            name={post.isLiked ? 'heart' : 'heart-outline'}
            size={23}
            color={post.isLiked ? '#39FF14' : '#AAAAAA'}
          />

          <Text style={styles.actionText}>
            {post.postLikes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.action}
             onPress={() => {
             setCommentsOpen(true);
              getComments();
             }}
          >

          <Text style={styles.actionText}>
            {post.postComments}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={reportOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setReportOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Report Post</Text>

            <TextInput
              style={styles.input}
              placeholder="Reason"
              placeholderTextColor="#737373"
              value={reason}
              onChangeText={setReason}
            />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description (optional)"
              placeholderTextColor="#737373"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <TouchableOpacity
              style={styles.reportButton}
              onPress={reportPost}
            >
              <Text style={styles.reportButtonText}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setReportOpen(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}