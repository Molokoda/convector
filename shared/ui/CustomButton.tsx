import { FC, memo } from 'react';

import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';

import { theme } from '@/shared';

interface CustomButtonProps extends PressableProps {
  text: string;
  isLoading?: boolean;
}

const CustomButtonBase: FC<CustomButtonProps> = (props) => {
  const { text, isLoading = false, ...restProps } = props;

  return (
    <Pressable disabled={isLoading} {...restProps} style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color={theme.colors.text} />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </Pressable>
  );
};

export const CustomButton = memo(CustomButtonBase);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: '100%',
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 55,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
