import { useState, useRef, useCallback, useEffect } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { View, StyleSheet, Dimensions } from 'react-native';
import { DateData } from 'react-native-calendars';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import { SafeAreaView } from 'react-native-safe-area-context';

import { nbrbRatesApi, Rate } from '@/entities';
import {
  theme,
  DateButton,
  DatePicker,
  CustomButton,
  toDateString,
  getTodayDateString,
  PageTitle,
  CurrencyPicker,
  useCurrenciesStore,
  CurrencyButton,
  ErrorComponent,
} from '@/shared';

export const History = () => {
  const [lineData, setLineData] = useState<lineDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const startBottomSheetRef = useRef<BottomSheet>(null);
  const endBottomSheetRef = useRef<BottomSheet>(null);
  const currencyBottomSheetRef = useRef<BottomSheet>(null);
  const [startDate, setStartDate] = useState<string>(
    toDateString(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
  );
  const [endDate, setEndDate] = useState<string>(getTodayDateString());
  const { currencies } = useCurrenciesStore();
  const [selectedCurrency, setSelectedCurrency] = useState<Rate>(currencies[0]);

  const handleOpenCurrencyBottomSheet = useCallback(() => {
    startBottomSheetRef.current?.close();
    endBottomSheetRef.current?.close();
    currencyBottomSheetRef.current?.expand();
  }, []);

  const handleOpenStartBottomSheet = useCallback(() => {
    endBottomSheetRef.current?.close();
    currencyBottomSheetRef.current?.close();
    startBottomSheetRef.current?.expand();
  }, []);

  const handleOpenEndBottomSheet = useCallback(() => {
    startBottomSheetRef.current?.close();
    currencyBottomSheetRef.current?.close();
    endBottomSheetRef.current?.expand();
  }, []);

  const handleCurrencyPick = useCallback((currency: Rate) => {
    setSelectedCurrency(currency);
    currencyBottomSheetRef.current?.close();
  }, []);

  const handleStartDayPick = useCallback((date: DateData) => {
    setStartDate(date.dateString);
    startBottomSheetRef.current?.close();
  }, []);

  const handleEndDayPick = useCallback(
    (date: DateData) => {
      if (date.dateString < startDate) {
        setStartDate(date.dateString);
      }
      setEndDate(date.dateString);
      endBottomSheetRef.current?.close();
    },
    [startDate],
  );

  const handleGetHistory = useCallback(async () => {
    setError('');
    try {
      setIsLoading(true);
      const history = await nbrbRatesApi.getRateHistory(
        selectedCurrency.Cur_ID,
        startDate,
        endDate,
      );
      const rateHistory: lineDataItem[] = history.map((item) => {
        const date = new Date(item.Date);

        const day = date.getDate();
        const month = date
          .toLocaleDateString('ru-RU', { month: 'short' })
          .replace('.', '');
        return {
          value: item.Cur_OfficialRate,
          label: `${day}\n${month}`,
        };
      });
      setLineData(rateHistory);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка сети');
      setLineData([]);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, selectedCurrency]);

  useEffect(() => {
    handleGetHistory();
    // Намеренно только при монтировании компонента
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PageTitle title="Начальная дата" />
      <DateButton date={startDate} onPress={handleOpenStartBottomSheet} />
      <PageTitle title="Конечная дата" />
      <DateButton date={endDate} onPress={handleOpenEndBottomSheet} />
      <PageTitle title="Валюта" />
      <CurrencyButton
        currency={selectedCurrency}
        onPress={handleOpenCurrencyBottomSheet}
      />
      <CustomButton
        onPress={handleGetHistory}
        text="Получить историю"
        isLoading={isLoading}
      />
      {error && <ErrorComponent text={error} />}
      {!isLoading && !error && (
        <View style={styles.chartContainer}>
          <LineChart
            data={lineData}
            color={theme.colors.primary}
            dataPointsColor={theme.colors.primary}
            textColor1={theme.colors.text}
            xAxisColor={theme.colors.textMuted}
            yAxisColor={theme.colors.textMuted}
            yAxisTextStyle={{ color: theme.colors.textMuted }}
            xAxisLabelTextStyle={{ color: theme.colors.textMuted }}
            width={Dimensions.get('window').width - 100}
            xAxisTextNumberOfLines={2}
          />
        </View>
      )}
      <DatePicker
        onDayPick={handleStartDayPick}
        bottomSheetRef={startBottomSheetRef}
        maxDate={endDate}
      />
      <DatePicker
        onDayPick={handleEndDayPick}
        bottomSheetRef={endBottomSheetRef}
      />
      <CurrencyPicker
        onCurrencyPick={handleCurrencyPick}
        bottomSheetRef={currencyBottomSheetRef}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  chartContainer: {
    marginTop: 16,
    flex: 1,
  },
});
