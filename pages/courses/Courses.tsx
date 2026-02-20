import { useState, useRef, useCallback, useEffect } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet, FlatList } from 'react-native';
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
  DateButton,
  getTodayDateString,
  useCurrenciesStore,
} from '@/shared';

import { Course } from './ui';

export const Courses = () => {
  const [courses, setCourses] = useState<Rate[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDate, setSelectedDate] =
    useState<string>(getTodayDateString());
  const { setCurrencies } = useCurrenciesStore();

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
      if (selectedDate === getTodayDateString()) {
        setCurrencies(courses);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка сети');
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, setCurrencies]);

  const renderEmptyComponent = useCallback(() => {
    return <EmptyComponent text="Курсы не найдены" />;
  }, []);

  useEffect(() => {
    handleGetCourses();
    // Намеренно только при монтировании компонента
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PageTitle
        title="Выберите дату"
        containerStyle={styles.datePickerTitle}
      />
      <DateButton date={selectedDate} onPress={handleOpenBottomSheet} />
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
          ListEmptyComponent={renderEmptyComponent}
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
  coursesTitle: {
    alignItems: 'flex-start',
  },
});
