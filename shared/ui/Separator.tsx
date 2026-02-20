import { memo } from 'react';

import { View, StyleSheet } from 'react-native';

import { theme } from '@/shared';

const SeparatorBase = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: theme.colors.textMuted,
    opacity: 0.4,
  },
});

export const Separator = memo(SeparatorBase);
