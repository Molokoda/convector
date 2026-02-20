import { FC, memo } from 'react';

import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

import { theme } from '../config';

interface CustomButtonProps extends PressableProps {
  text: string;
}

const CustomButtonBase: FC<CustomButtonProps> = (props) => {
  const { text, ...restProps } = props;

  return (
    <Pressable {...restProps} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
