import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ProfileHeader } from '../components/profile-screen/ProfileHeader';
import PostCard from '../components/PostCard';
import { Comment as CommentView } from '../components/post-screen/Comment';
import { COLORS } from '../components/colors';
import { useAuthStore } from '../stores/authStore';
import {
  fetchProfile,
  fetchPostsByUser,
  fetchCommentsByUser,
  Profile,
  Post,
  Comment,
} from '../lib/supabase';

const formatTimeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'now';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
};

export const ProfileScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const me = useAuthStore((s) => s.user);
  const myProfile = useAuthStore((s) => s.profile);
  const signOut = useAuthStore((s) => s.signOut);

  const targetUserId: string | undefined = route.params?.userId ?? me?.id;
  const isOwn = !!me && targetUserId === me.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [tab, setTab] = useState<'posts' | 'comments'>('posts');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!targetUserId) {
      setError('No user');
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const [p, ps, cs] = await Promise.all([
        fetchProfile(targetUserId),
        fetchPostsByUser(targetUserId),
        fetchCommentsByUser(targetUserId),
      ]);
      setProfile(p);
      setPosts(ps);
      setComments(cs);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleLogout = async () => {
    await signOut();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const handlePostDeleted = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: '#ff8080' }}>{error ?? 'Profile not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.cover} />
      <View style={styles.profileSection}>
        <ProfileHeader
          avatarUri={
            profile.avatar_url ??
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face'
          }
          displayName={profile.display_name ?? profile.username ?? 'user'}
          username={`@${profile.username ?? 'user'}`}
          bio={profile.bio ?? ''}
          meta={{
            department: '',
            location: '',
            joinedLabel: `Joined ${new Date(profile.created_at).toLocaleDateString()}`,
          }}
        />

        {isOwn && (
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}

        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tab, tab === 'posts' && styles.tabActive]}
            onPress={() => setTab('posts')}
          >
            <Text style={styles.tabText}>Posts ({posts.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'comments' && styles.tabActive]}
            onPress={() => setTab('comments')}
          >
            <Text style={styles.tabText}>Comments ({comments.length})</Text>
          </TouchableOpacity>
        </View>

        {tab === 'posts' ? (
          posts.length === 0 ? (
            <Text style={styles.emptyText}>No posts yet.</Text>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                userId={post.user_id}
                authorId={post.user_id}
                channel={post.channel}
                author={profile.display_name ?? profile.username ?? 'user'}
                timeAgo={formatTimeAgo(post.created_at)}
                title={post.title}
                body={post.body}
                imageUrl={post.image_url}
                tags={post.tags ?? []}
                onDeleted={handlePostDeleted}
              />
            ))
          )
        ) : comments.length === 0 ? (
          <Text style={styles.emptyText}>No comments yet.</Text>
        ) : (
          comments.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() =>
                c.post?.id &&
                navigation.navigate('Post', { postId: c.post.id })
              }
            >
              {!!c.post?.title && (
                <Text style={styles.commentPostTitle}>
                  on "{c.post.title}"
                </Text>
              )}
              <CommentView
                user={{
                  username: profile.display_name ?? profile.username ?? 'user',
                  avatar: {
                    uri:
                      profile.avatar_url ??
                      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
                  },
                }}
                content={{ textContent: c.body }}
                commentMeta={{
                  datePosted: new Date(c.created_at).toLocaleString(),
                  likes: 0,
                  replies: 0,
                }}
              />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  contentContainer: { paddingBottom: 32 },
  center: { justifyContent: 'center', alignItems: 'center' },
  cover: { height: 112, backgroundColor: COLORS.primary, opacity: 0.4 },
  profileSection: { paddingHorizontal: 16, marginTop: -45 },
  logoutBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(239,68,68,0.15)',
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutText: { color: '#ef4444', fontWeight: '600' },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: COLORS.active },
  tabText: { color: COLORS.foreground, fontWeight: '600' },
  emptyText: { color: COLORS.mutedForeground, paddingVertical: 16 },
  commentPostTitle: {
    color: COLORS.mutedForeground,
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
});
