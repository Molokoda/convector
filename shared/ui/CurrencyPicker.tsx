import { memo } from 'react';

import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';

import { Rate } from '@/entities';

import { theme } from '../config/theme';
import { useCurrenciesStore } from '../store';

import { CurrencyItem } from './CurrencyItem';
import { Separator } from './Separator';

interface CurrencyPickerProps {
  onCurrencyPick: (currency: Rate) => void;
  bottomSheetRef: React.RefObject<BottomSheet | null>;
}

const CurrencyPickerBase: React.FC<CurrencyPickerProps> = (props) => {
  const { onCurrencyPick, bottomSheetRef } = props;
  const { currencies } = useCurrenciesStore();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      backgroundStyle={styles.background}
    >
      <BottomSheetFlatList
        data={currencies}
        renderItem={({ item }: { item: Rate }) => (
          <CurrencyItem currency={item} onPress={onCurrencyPick} />
        )}
        keyExtractor={(item: Rate) => item.Cur_ID.toString()}
        ItemSeparatorComponent={Separator}
      />
    </BottomSheet>
  );
};

export const CurrencyPicker = memo(CurrencyPickerBase);

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.surface,
  },
});
