import { FC, memo } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text, StyleSheet } from 'react-native';

import { theme } from '../config/theme';

interface DateButtonProps {
  date: string;
  onPress: () => void;
}

const DateButtonBase: FC<DateButtonProps> = (props) => {
  const { date, onPress } = props;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name="calendar" size={24} color={theme.colors.text} />
      <Text style={styles.text}>{date}</Text>
    </Pressable>
  );
};

export const DateButton = memo(DateButtonBase);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    borderColor: theme.colors.textMuted,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
