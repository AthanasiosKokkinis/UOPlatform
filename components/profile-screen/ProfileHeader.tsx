import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../colors.ts';

interface ProfileHeaderProps {
  avatarUri: string;
  displayName: string;
  username: string;
  bio: string;
  meta: { department: string; location: string; joinedLabel: string };
}

export const ProfileHeader = ({ avatarUri, displayName, username, bio, meta }: ProfileHeaderProps) => (
  <View>
    <View style={styles.avatarRow}>
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      <View style={styles.nameBlock}>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
    </View>

    <Text style={styles.bio}>{bio}</Text>

    <View style={styles.metaRow}>
      <Text style={styles.metaItem}>📖 {meta.department}</Text>
      <Text style={styles.metaItem}>📍 {meta.location}</Text>
      <Text style={styles.metaItem}>📅 {meta.joinedLabel}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  nameBlock: {
    paddingBottom: 4,
  },
  displayName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.foreground,
  },
  username: {
    fontSize: 12,
    color: COLORS.mutedForeground,
  },
  bio: {
    fontSize: 13,
    color: COLORS.foreground,
    lineHeight: 20,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    fontSize: 12,
    color: COLORS.mutedForeground,
  },
});
