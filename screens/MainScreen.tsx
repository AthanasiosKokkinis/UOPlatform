import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import SortBar from "../components/main-screen/SortBar";
import PostCard from "../components/PostCard";
import { COLORS } from "../components/colors";
import { Footer } from "../components/footer/Footer";
import { fetchPosts, Post } from "../lib/supabase";
import { NewPostModal } from "../components/modals/NewPostModal";

const formatTimeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
};

export const MainScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPostOpen, setNewPostOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchPosts();
      setPosts(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const handleDeleted = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <View style={styles.screen}>
      <SortBar />
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color="#fff" />
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={load} style={styles.retryBtn}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#fff"
            />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No posts yet. Be the first!</Text>
            </View>
          }
          renderItem={({ item }) => (
            <PostCard
              id={item.id}
              userId={item.user_id}
              authorId={item.user_id}
              channel={item.channel}
              author={item.author?.display_name ?? item.author?.username ?? "user"}
              timeAgo={formatTimeAgo(item.created_at)}
              title={item.title}
              body={item.body}
              imageUrl={item.image_url}
              tags={item.tags ?? []}
              votes={0}
              comments={0}
              onDeleted={handleDeleted}
            />
          )}
        />
      )}
      <Footer onNewPost={() => setNewPostOpen(true)} />
      <NewPostModal
        visible={newPostOpen}
        onClose={() => setNewPostOpen(false)}
        onCreated={load}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: { color: "#ff8080", marginBottom: 12 },
  emptyText: { color: "#aaa" },
  retryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },
  retryText: { color: "#fff" },
});
