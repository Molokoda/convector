import { FC, memo } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

import { theme } from '../config/theme';

interface EmptyComponentProps {
  text: string;
}

const EmptyComponentBase: FC<EmptyComponentProps> = (props) => {
  const { text } = props;

  return (
    <View style={styles.container}>
      <Ionicons name="folder-open" size={64} color={theme.colors.text} />
      <Text style={styles.text}>{text}</Text>
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
