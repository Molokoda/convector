import { FC, memo } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

import { theme } from '../config';

interface ErrorComponentProps {
  text: string;
}

const ErrorComponentBase: FC<ErrorComponentProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle" size={124} color={theme.colors.danger} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export const ErrorComponent = memo(ErrorComponentBase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.danger,
    fontSize: 24,
  },
});
