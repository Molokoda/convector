import { View, Text, StyleSheet } from 'react-native';

export const Courses = () => {
  return (
    <View style={styles.container}>
      <Text>Courses</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
