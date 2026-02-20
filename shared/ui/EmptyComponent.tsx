import { memo } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

import { theme } from '../config';

const EmptyComponentBase = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="folder-open" size={64} color={theme.colors.text} />
      <Text style={styles.text}>Нет данных</Text>
    </View>
  );
};

export const EmptyComponent = memo(EmptyComponentBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  text: {
    color: theme.colors.text,
    fontSize: 24,
  },
});
