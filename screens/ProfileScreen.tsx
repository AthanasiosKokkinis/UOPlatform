import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ProfileHeader } from '../components/profile-screen/ProfileHeader';
import { ProfileBadges } from '../components/profile-screen/ProfileBadges';
import { ProfileStats } from '../components/profile-screen/ProfileStats';
import { ProfilePosts } from '../components/profile-screen/ProfilePosts';
import { COLORS } from '../components/colors';

const userPosts = [
  {
    channel: 'σημειώσεις',
    author: 'Μαρία Κ.',
    authorYear: '22',
    timeAgo: '2ω',
    title: 'Σημειώσεις Ψηφιακά Κυκλώματα — περιλαμβάνει λυμένες ασκήσεις',
    body: 'Ανέβασα τις σημειώσεις μου από φέτος. Καλύπτουν combinational & sequential logic, FSMs, κτλ.',
    votes: 128,
    comments: 42,
    tags: ['ΗΜΤΥ', 'Σημειώσεις'],
  },
  {
    channel: 'εξεταστική',
    author: 'Μαρία Κ.',
    authorYear: '22',
    timeAgo: '1μ',
    title: 'Ξέρει κανείς πότε βγαίνουν τα αποτελέσματα Σήματα & Συστήματα;',
    body: 'Γράψαμε πριν 10 μέρες και ακόμα τίποτα στο eclass.',
    votes: 42,
    comments: 18,
    tags: ['ΗΜΤΥ', 'Εξεταστική'],
  },
];

const stats = [
  { label: 'Posts', value: '34' },
  { label: 'Karma', value: '1.2k' },
  { label: 'Helped', value: '89' },
];

const badges = [
  { label: 'Top Contributor', icon: '🏆' },
  { label: 'Helpful', icon: '💬' },
  { label: 'Note Sharer', icon: '🔗' },
];

export const ProfileScreen = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <View style={styles.cover} />
    <View style={styles.profileSection}>
      <ProfileHeader
        avatarUri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
        displayName="Μαρία Καραγιάννη"
        username="@maria.k"
        bio="ΗΜΤΥ '22 · Αγαπώ τα κυκλώματα και τον καλό freddo ☕ · Ψάχνω πάντα για study buddies"
        meta={{
          department: 'ΗΜΤΥ — Ηλεκτρολόγων Μηχ.',
          location: 'Ρίο, Πάτρα',
          joinedLabel: 'Εγγραφή Σεπ 2022',
        }}
      />
      <ProfileBadges badges={badges} />
      <ProfileStats stats={stats} />
      <ProfilePosts posts={userPosts} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  cover: {
    height: 112,
    backgroundColor: COLORS.primary,
    opacity: 0.4,
  },
  profileSection: {
    paddingHorizontal: 16,
    marginTop: -45,
  },
});
