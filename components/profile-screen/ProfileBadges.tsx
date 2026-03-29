import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './colors';

interface Badge {
  label: string;
  icon: string;
}

interface ProfileBadgesProps {
  badges: Badge[];
}

export const ProfileBadges = ({ badges }: ProfileBadgesProps) => (
  <View style={styles.badgeRow}>
    {badges.map(badge => (
      <View key={badge.label} style={styles.badge}>
        <Text style={styles.badgeText}>{badge.icon} {badge.label}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    color: COLORS.foreground,
  },
});
