import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FullPost } from "../components/post-screen/FullPost";
import { Comment as CommentView } from "../components/post-screen/Comment";
import { Send } from "../assets/svgs/ctas/Send";
import {
  fetchPost,
  fetchComments,
  createComment,
  deleteComment,
  deletePost,
  Post,
  Comment as CommentRow,
} from "../lib/supabase";
import { useAuthStore } from "../stores/authStore";
import { ConfirmModal } from "../components/modals/ConfirmModal";

export const PostScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const me = useAuthStore((s) => s.user);
  const postId: string | undefined = route.params?.postId;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [confirmDeletePost, setConfirmDeletePost] = useState(false);
  const [pendingDeleteComment, setPendingDeleteComment] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!postId) {
      setError("No post specified");
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const [p, c] = await Promise.all([fetchPost(postId), fetchComments(postId)]);
      setPost(p);
      setComments(c);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load post");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    load();
  }, [load]);

  const registerNewComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed || !postId) return;
    setSubmitting(true);
    try {
      const c = await createComment(postId, trimmed);
      setComments((prev) => [...prev, c]);
      setNewComment("");
    } catch (e: any) {
      Alert.alert("Failed to comment", e?.message ?? "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    if (!postId) return;
    try {
      await deletePost(postId);
      setConfirmDeletePost(false);
      navigation.goBack();
    } catch (e: any) {
      setConfirmDeletePost(false);
      Alert.alert("Failed to delete", e?.message ?? "Unknown error");
    }
  };

  const handleDeleteComment = async () => {
    if (!pendingDeleteComment) return;
    const id = pendingDeleteComment;
    setPendingDeleteComment(null);
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (e: any) {
      Alert.alert("Failed to delete", e?.message ?? "Unknown error");
    }
  };

  if (loading) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Text style={styles.errorText}>{error ?? "Post not found"}</Text>
      </View>
    );
  }

  const isPostOwner = !!me && me.id === post.user_id;
  const authorName =
    post.author?.display_name ?? post.author?.username ?? "user";

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isOwner = !!me && me.id === item.user_id;
            return (
              <View>
                <CommentView
                  user={{
                    username:
                      item.author?.display_name ??
                      item.author?.username ??
                      "user",
                    avatar: {
                      uri:
                        item.author?.avatar_url ??
                        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
                    },
                  }}
                  content={{ textContent: item.body }}
                  commentMeta={{
                    datePosted: new Date(item.created_at).toLocaleString(),
                    likes: 0,
                    replies: 0,
                  }}
                />
                {isOwner && (
                  <TouchableOpacity
                    style={styles.commentDelete}
                    onPress={() => setPendingDeleteComment(item.id)}
                  >
                    <Text style={styles.commentDeleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          ListHeaderComponent={
            <View>
              <View style={styles.postHeaderRow}>
                <FullPost
                  username={authorName}
                  datePosted={new Date(post.created_at).toLocaleDateString()}
                  title={post.title}
                  content={{
                    text: post.body ?? undefined,
                    images: post.image_url
                      ? [{ uri: post.image_url }]
                      : undefined,
                    tags: post.tags ?? undefined,
                  }}
                  metas={{ likes: 0, comments: comments.length }}
                />
                {isPostOwner && (
                  <TouchableOpacity
                    style={styles.deletePostBtn}
                    onPress={() => setConfirmDeletePost(true)}
                  >
                    <Text style={styles.deletePostText}>Delete post</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.stickyInputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              value={newComment}
              placeholder="Write your comment here"
              placeholderTextColor="#cfcfcf"
              onChangeText={setNewComment}
              style={styles.input}
              editable={!submitting}
            />
          </View>

          <TouchableOpacity
            onPress={registerNewComment}
            style={styles.sendButton}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Send color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ConfirmModal
        visible={confirmDeletePost}
        title="Delete post?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDeletePost}
        onCancel={() => setConfirmDeletePost(false)}
      />

      <ConfirmModal
        visible={!!pendingDeleteComment}
        title="Delete comment?"
        confirmLabel="Delete"
        destructive
        onConfirm={handleDeleteComment}
        onCancel={() => setPendingDeleteComment(null)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1c1c1c" },
  container: { flex: 1, backgroundColor: "#1c1c1c" },
  center: { justifyContent: "center", alignItems: "center" },
  errorText: { color: "#ff8080" },
  list: { flex: 1 },
  contentContainer: { padding: 16, paddingBottom: 96 },
  separator: { height: 10 },
  postHeaderRow: { marginBottom: 12 },
  deletePostBtn: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(239,68,68,0.15)",
    borderRadius: 8,
  },
  deletePostText: { color: "#ef4444", fontSize: 12, fontWeight: "600" },
  commentDelete: {
    alignSelf: "flex-end",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  commentDeleteText: { color: "#ef4444", fontSize: 12 },
  stickyInputContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1c1c1c",
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  input: { color: "white", minHeight: 42 },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#9e2e41",
    justifyContent: "center",
    alignItems: "center",
  },
});
