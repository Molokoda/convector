import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { theme } from '@/shared';

export default function HomeIndex() {
  return (
    <View style={styles.container}>
      <Redirect href="/(home)/courses" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
