import { useState, useRef, useCallback } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, StyleSheet, Pressable } from 'react-native';
import { DateData } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DatePicker, theme } from '@/shared';

export const Courses = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  const handleDayPick = useCallback((date: DateData) => {
    setSelectedDate(date.dateString);
    bottomSheetRef.current?.close();
  }, []);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.datePickerContainer}
        onPress={handleOpenBottomSheet}
      >
        <Ionicons name="calendar" size={24} color={theme.colors.text} />
        <Text style={styles.datePickerText}>{selectedDate}</Text>
      </Pressable>
      <DatePicker onDayPick={handleDayPick} bottomSheetRef={bottomSheetRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    borderColor: theme.colors.textMuted,
  },
  datePickerText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
