import { memo } from 'react';

import * as Device from 'expo-device';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '../config/theme';

const DeviceDataBase = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{`Model: ${Device.modelName}`}</Text>
      <Text style={styles.text}>
        {`OS: ${Device.osName} ${Device.osVersion}`}
      </Text>
      <Text style={styles.text}>{`Build ID: ${Device.osBuildId}`}</Text>
    </SafeAreaView>
  );
};

export const DeviceData = memo(DeviceDataBase);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
    height: 70,
  },
  text: {
    color: theme.colors.text,
    fontSize: 14,
  },
});
