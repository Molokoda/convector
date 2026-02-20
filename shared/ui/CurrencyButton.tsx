import { FC, memo } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, StyleSheet, View } from 'react-native';

import { Rate } from '@/entities';

import { theme } from '../config/theme';

interface CurrencyButtonProps {
  currency: Rate;
  onPress: () => void;
}

const CurrencyButtonBase: FC<CurrencyButtonProps> = (props) => {
  const { currency, onPress } = props;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name="cash" size={24} color={theme.colors.text} />
      <View style={styles.textContainer}>
        <Text
          style={styles.text}
        >{`${currency.Cur_Scale} ${currency.Cur_Abbreviation}`}</Text>
        <Text style={styles.subText}>{currency.Cur_Name}</Text>
      </View>
    </Pressable>
  );
};

export const CurrencyButton = memo(CurrencyButtonBase);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    borderColor: theme.colors.textMuted,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  subText: {
    color: theme.colors.textMuted,
    fontSize: 14,
  },
});
