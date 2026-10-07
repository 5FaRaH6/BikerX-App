import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { API_URL } from "../services/api";
import { getToken, logout } from "../services/authSession";
import { styles } from "../styles/PostDetailsStyles";

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
  commentLikes: number;
  isLiked: boolean;
};

export default function PostDetailsScreen() {
  const params = useLocalSearchParams();
  const postId = String(params.postId || "");

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [reportOpen, setReportOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);

  const [selectedCommentId, setSelectedCommentId] = useState("");
  const [commentReportOpen, setCommentReportOpen] = useState(false);
  const [commentReportReason, setCommentReportReason] = useState("");
  const [commentReportDescription, setCommentReportDescription] = useState("");

  useEffect(() => {
    getPost();
  }, []);

  // get post details
  async function getPost() {
    try {
      const token = await getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(`${API_URL}/Posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        await logout();
        router.replace("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Could not load post.");
        return;
      }

      setPost(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not connect to the server.");
    } finally {
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
        method: post.isLiked ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) return;

      setPost({
        ...post,
        isLiked: !post.isLiked,
        postLikes: post.isLiked ? post.postLikes - 1 : post.postLikes + 1,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // get comments
  async function getComments() {
    try {
      setCommentsLoading(true);

      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/Posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) return;

      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCommentsLoading(false);
    }
  }
  // add comment
  async function addComment() {
    if (!commentText.trim()) {
      return;
    }

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/Posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: commentText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Comment", data.message || "Could not add comment.");
        return;
      }

      setCommentText("");

      await getComments();

      setPost({
        ...post!,
        postComments: post!.postComments + 1,
      });
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Could not connect to the server.");
    }
  }

  // change comment like
  async function changeCommentLike(comment: Comment) {
    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/Posts/comments/${comment.commentId}/like`,
        {
          method: comment.isLiked ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) return;

      setComments(
        comments.map((item) =>
          item.commentId === comment.commentId
            ? {
                ...item,
                isLiked: !item.isLiked,
                commentLikes: item.isLiked
                  ? item.commentLikes - 1
                  : item.commentLikes + 1,
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }
  // report post
  async function reportPost() {
    if (!reason.trim()) {
      Alert.alert("Report", "Please enter a reason.");
      return;
    }

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(`${API_URL}/Posts/${postId}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reason: reason.trim(),
          description: description.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Report", data.message || "Could not report post.");
        return;
      }

      setReportOpen(false);
      setReason("");
      setDescription("");

      Alert.alert("Report", "Post reported successfully.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not connect to the server.");
    }
  }
  // report comment
  async function reportComment() {
    if (!commentReportReason.trim()) {
      Alert.alert("Report", "Please enter a reason.");
      return;
    }

    try {
      const token = await getToken();

      if (!token) return;

      const response = await fetch(
        `${API_URL}/Posts/comments/${selectedCommentId}/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason: commentReportReason.trim(),
            description: commentReportDescription.trim() || null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Report", data.message || "Could not report comment.");
        return;
      }

      setCommentReportOpen(false);
      setCommentReportReason("");
      setCommentReportDescription("");
      setSelectedCommentId("");

      Alert.alert("Report", "Comment reported successfully.");
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "Could not connect to the server.");
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
          router.push(`/user-profile?userId=${post.userId}` as any)
        }
      >
        {post.userPhoto ? (
          <Image source={{ uri: post.userPhoto }} style={styles.userPhoto} />
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
        <Text style={styles.description}>{post.description}</Text>
      )}

      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      )}

      {post.address && (
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color="#39FF14" />
          <Text style={styles.location}>{post.address}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={changeLike}>
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={23}
            color={post.isLiked ? "#39FF14" : "#AAAAAA"}
          />

          <Text style={styles.actionText}>{post.postLikes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            setCommentsOpen(true);
            getComments();
          }}
        >
          <Ionicons name="chatbubble-outline" size={21} color="#AAAAAA" />

          <Text style={styles.actionText}>{post.postComments}</Text>
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

            <TouchableOpacity style={styles.reportButton} onPress={reportPost}>
              <Text style={styles.reportButtonText}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setReportOpen(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={commentsOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setCommentsOpen(false)}
      >
        <View style={styles.commentsBackground}>
          <View style={styles.commentsBox}>
            <Text style={styles.commentsTitle}>Comments</Text>

            {commentsLoading ? (
              <ActivityIndicator size="small" color="#39FF14" />
            ) : comments.length === 0 ? (
              <Text style={styles.noComments}>No comments yet.</Text>
            ) : (
              comments.map((comment) => (
                <View key={comment.commentId} style={styles.commentRow}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        `/user-profile?userId=${comment.userId}` as any,
                      )
                    }
                  >
                    {comment.userPhoto ? (
                      <Image
                        source={{ uri: comment.userPhoto }}
                        style={styles.commentPhoto}
                      />
                    ) : (
                      <View style={styles.commentDefaultPhoto}>
                        <Text style={styles.commentDefaultText}>
                          {comment.username.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <View style={styles.commentContent}>
                    <TouchableOpacity
                      onPress={() =>
                        router.push(
                          `/user-profile?userId=${comment.userId}` as any,
                        )
                      }
                    >
                      <Text style={styles.commentUsername}>
                        @{comment.username}
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.commentLike}
                    onPress={() => changeCommentLike(comment)}
                  >
                    <Ionicons
                      name={comment.isLiked ? "heart" : "heart-outline"}
                      size={18}
                      color={comment.isLiked ? "#39FF14" : "#AAAAAA"}
                    />

                    <Text style={styles.commentLikeText}>
                      {comment.commentLikes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCommentId(comment.commentId);
                      setCommentReportOpen(true);
                    }}
                  >
                    <Ionicons
                      name="ellipsis-horizontal"
                      size={20}
                      color="#AAAAAA"
                    />
                  </TouchableOpacity>
                </View>
              ))
            )}

            <View style={styles.addCommentRow}>
              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment..."
                placeholderTextColor="#777777"
                value={commentText}
                onChangeText={setCommentText}
              />

              <TouchableOpacity
                style={styles.sendCommentButton}
                onPress={addComment}
              >
                <Ionicons name="send" size={20} color="#050505" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={commentReportOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setCommentReportOpen(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Report Comment</Text>

            <TextInput
              style={styles.input}
              placeholder="Reason"
              placeholderTextColor="#737373"
              value={commentReportReason}
              onChangeText={setCommentReportReason}
            />

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Description (optional)"
              placeholderTextColor="#737373"
              value={commentReportDescription}
              onChangeText={setCommentReportDescription}
              multiline
            />

            <TouchableOpacity
              style={styles.reportButton}
              onPress={reportComment}
            >
              <Text style={styles.reportButtonText}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCommentReportOpen(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
