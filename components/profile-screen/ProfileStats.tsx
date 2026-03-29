import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../colors.ts';

interface Stat {
  label: string;
  value: string;
}

interface ProfileStatsProps {
  stats: Stat[];
}

export const ProfileStats = ({ stats }: ProfileStatsProps) => (
  <View style={styles.statsRow}>
    {stats.map(stat => (
      <View key={stat.label} style={styles.statBox}>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.foreground,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.mutedForeground,
  },
});
