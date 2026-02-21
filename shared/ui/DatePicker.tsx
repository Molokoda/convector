import { memo } from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

import { theme } from '../config/theme';

interface DatePickerProps {
  onDayPick: (date: DateData) => void;
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  maxDate?: string;
}

const DatePickerBase: React.FC<DatePickerProps> = (props) => {
  const { onDayPick, bottomSheetRef, maxDate } = props;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['25%', '50%']}
      index={-1}
      enablePanDownToClose
      backgroundStyle={styles.background}
    >
      <BottomSheetView>
        <Calendar
          maxDate={maxDate || new Date().toISOString().split('T')[0]}
          onDayPress={onDayPick}
          theme={{
            calendarBackground: theme.colors.surface,
            dayTextColor: theme.colors.text,
            monthTextColor: theme.colors.text,
            todayTextColor: theme.colors.text,
            textDisabledColor: theme.colors.textMuted,
            arrowColor: theme.colors.text,
          }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export const DatePicker = memo(DatePickerBase);

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.surface,
  },
});
