import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FullPost } from '../post-screen/FullPost';
import { COLORS } from '../colors.ts';

interface Post {
  author: string;
  timeAgo: string;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  comments: number;
}

interface ProfilePostsProps {
  posts: Post[];
}

export const ProfilePosts = ({ posts }: ProfilePostsProps) => (
  <View style={styles.postsSection}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Δημοσιεύσεις</Text>
    </View>
    {posts.map((post, i) => (
      <FullPost
        key={i}
        username={post.author}
        datePosted={post.timeAgo}
        title={post.title}
        content={{ text: post.body, tags: post.tags }}
        metas={{ likes: post.votes, comments: post.comments }}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  postsSection: {
    marginTop: 8,
  },
  header: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.foreground,
  },
});
