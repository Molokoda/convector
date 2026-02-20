import { useState, useRef, useCallback, useEffect } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { DateData } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Rate, nbrbRatesApi } from '@/entities';
import {
  DatePicker,
  PageTitle,
  theme,
  CustomButton,
  Separator,
  ErrorComponent,
  EmptyComponent,
} from '@/shared';

import { Course } from './ui';

export const Courses = () => {
  const [courses, setCourses] = useState<Rate[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleGetCourses = useCallback(async () => {
    setError('');
    try {
      setIsLoading(true);
      const courses = await nbrbRatesApi.getRates(selectedDate);
      setCourses(courses);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка сети');
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    handleGetCourses();
    // Нужен только для первого рендера
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PageTitle
        title="Выберете Дату"
        containerStyle={styles.datePickerTitle}
      />
      <Pressable
        style={styles.datePickerContainer}
        onPress={handleOpenBottomSheet}
      >
        <Ionicons name="calendar" size={24} color={theme.colors.text} />
        <Text style={styles.datePickerText}>{selectedDate}</Text>
      </Pressable>
      <CustomButton
        onPress={handleGetCourses}
        text="Получить курсы"
        isLoading={isLoading}
      />
      <PageTitle title="Курсы НБРБ" containerStyle={styles.coursesTitle} />
      {error && <ErrorComponent text={error} />}
      {!isLoading && !error && (
        <FlatList
          data={courses}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={<EmptyComponent />}
          renderItem={({ item }) => (
            <Course
              scale={item.Cur_Scale}
              abbreviation={item.Cur_Abbreviation}
              name={item.Cur_Name}
              officialRate={item.Cur_OfficialRate}
            />
          )}
          keyExtractor={(item) => item.Cur_ID.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  datePickerTitle: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    borderColor: theme.colors.textMuted,
  },
  datePickerText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  coursesTitle: {
    alignItems: 'flex-start',
  },
});
