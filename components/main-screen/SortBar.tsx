import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../colors.ts';

const sorts = [
  { label: 'Trending' },
  { label: 'Academic' },
  { label: 'Recent' },
  { label: 'Popular' },
];

const SortBar = () => {
  const [active, setActive] = useState('Trending');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {sorts.map(sort => {
        const isActive = active === sort.label;
        return (
          <TouchableOpacity
            key={sort.label}
            onPress={() => setActive(sort.label)}
            style={[styles.pill, isActive ? styles.pillActive : styles.pillInactive]}
          >
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {sort.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillActive: {
    backgroundColor: COLORS.active,
  },
  pillInactive: {
    backgroundColor: COLORS.inactive,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelActive: {
    color: COLORS.foreground,
  },
  labelInactive: {
    color: COLORS.mutedForeground,
  },
});

export default SortBar;
