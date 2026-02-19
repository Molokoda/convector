import { FC, memo } from 'react';

import { Text, StyleSheet, View } from 'react-native';

import { theme } from '@/shared';

interface PageTitleProps {
  title: string;
}

const PageTitleBase: FC<PageTitleProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export const PageTitle = memo(PageTitleBase);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
