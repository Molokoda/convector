import { View, Text, StyleSheet } from 'react-native';

export const Convector = () => {
  return (
    <View style={styles.container}>
      <Text>Convector</Text>
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
