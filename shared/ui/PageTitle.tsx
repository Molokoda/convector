import { FC, memo } from 'react';

import { Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import { theme } from '../config/theme';

interface PageTitleProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const PageTitleBase: FC<PageTitleProps> = (props) => {
  const { title, containerStyle } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export const PageTitle = memo(PageTitleBase);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
  },
  text: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
