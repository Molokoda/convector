import { memo } from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Calendar, DateData } from 'react-native-calendars';

interface DatePickerProps {
  onDayPick: (date: DateData) => void;
  bottomSheetRef: React.RefObject<BottomSheet | null>;
}

const DatePickerBase: React.FC<DatePickerProps> = (props) => {
  const { onDayPick, bottomSheetRef } = props;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['25%', '50%']}
      index={-1}
      enablePanDownToClose
    >
      <BottomSheetView>
        <Calendar
          maxDate={new Date().toISOString().split('T')[0]}
          onDayPress={onDayPick}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

export const DatePicker = memo(DatePickerBase);
