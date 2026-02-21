import { useState, useRef, useCallback } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Rate } from '@/entities';
import {
  theme,
  CurrencyButton,
  useCurrenciesStore,
  CurrencyPicker,
  normalizeAmountInput,
} from '@/shared';
import { PageTitle } from '@/shared/ui';

const MAX_AMOUNT_DIGITS = 10;

export const Convector = () => {
  const { currencies } = useCurrenciesStore();
  const [firstAmount, setFirstAmount] = useState('');
  const [secondAmount, setSecondAmount] = useState('');
  const [firstCurrency, setFirstCurrency] = useState<Rate>(currencies[0]);
  const [secondCurrency, setSecondCurrency] = useState<Rate>(currencies[1]);
  const currencyBottomSheetRef = useRef<BottomSheet>(null);
  const secondCurrencyBottomSheetRef = useRef<BottomSheet>(null);

  const handleFirstAmountChange = useCallback(
    (amount: string) => {
      const normalized = normalizeAmountInput(amount, MAX_AMOUNT_DIGITS);
      setFirstAmount(normalized);
      const num = parseFloat(normalized) || 0;
      if (normalized !== '') {
        const result =
          (num * firstCurrency.Cur_OfficialRate) /
          secondCurrency.Cur_OfficialRate;
        setSecondAmount(result.toFixed(2));
      } else {
        setSecondAmount('');
      }
    },
    [firstCurrency, secondCurrency],
  );

  const handleSecondAmountChange = useCallback(
    (amount: string) => {
      const normalized = normalizeAmountInput(amount, MAX_AMOUNT_DIGITS);
      setSecondAmount(normalized);
      const num = parseFloat(normalized) || 0;
      if (normalized !== '') {
        const result =
          (num * secondCurrency.Cur_OfficialRate) /
          firstCurrency.Cur_OfficialRate;
        setFirstAmount(result.toFixed(2));
      } else {
        setFirstAmount('');
      }
    },
    [secondCurrency, firstCurrency],
  );

  const handleCurrencyPick = useCallback((currency: Rate) => {
    setFirstCurrency(currency);
    currencyBottomSheetRef.current?.close();
  }, []);

  const handleSecondCurrencyPick = useCallback((currency: Rate) => {
    setSecondCurrency(currency);
    secondCurrencyBottomSheetRef.current?.close();
  }, []);

  const handleOpenCurrencyBottomSheet = useCallback(() => {
    secondCurrencyBottomSheetRef.current?.close();
    currencyBottomSheetRef.current?.expand();
  }, []);

  const handleOpenSecondCurrencyBottomSheet = useCallback(() => {
    currencyBottomSheetRef.current?.close();
    secondCurrencyBottomSheetRef.current?.expand();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PageTitle title="Из" />
      <CurrencyButton
        currency={firstCurrency}
        onPress={handleOpenCurrencyBottomSheet}
      />
      <TextInput
        placeholder="Введите сумму"
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor={theme.colors.textMuted}
        value={firstAmount}
        onChangeText={handleFirstAmountChange}
      />
      <PageTitle title="В" />
      <CurrencyButton
        currency={secondCurrency}
        onPress={handleOpenSecondCurrencyBottomSheet}
      />
      <TextInput
        placeholder="Введите сумму"
        style={styles.input}
        keyboardType="numeric"
        placeholderTextColor={theme.colors.textMuted}
        value={secondAmount}
        onChangeText={handleSecondAmountChange}
      />
      <CurrencyPicker
        bottomSheetRef={currencyBottomSheetRef}
        onCurrencyPick={handleCurrencyPick}
      />
      <CurrencyPicker
        bottomSheetRef={secondCurrencyBottomSheetRef}
        onCurrencyPick={handleSecondCurrencyPick}
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
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: theme.colors.textMuted,
    color: theme.colors.text,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
});
