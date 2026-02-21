import { FC, memo, useCallback } from 'react';

import { Text, StyleSheet, Pressable } from 'react-native';

import { Rate } from '@/entities';

import { theme } from '../config/theme';

interface CurrencyItemProps {
  currency: Rate;
  onPress: (currency: Rate) => void;
}

const CurrencyItemBase: FC<CurrencyItemProps> = (props) => {
  const { currency, onPress } = props;
  const handlePress = useCallback(() => {
    onPress(currency);
  }, [currency, onPress]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{currency.Cur_Name}</Text>
    </Pressable>
  );
};

export const CurrencyItem = memo(CurrencyItemBase);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
