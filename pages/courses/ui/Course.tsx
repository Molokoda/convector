import { FC, memo } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { theme } from '@/shared';

interface CourseProps {
  scale: number;
  abbreviation: string;
  name: string;
  officialRate: number;
}

const CourseBase: FC<CourseProps> = (props) => {
  const { scale, abbreviation, name, officialRate } = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{`${scale} ${abbreviation}`}</Text>
        <Text style={styles.littleTitle}>{name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{`${officialRate} BYN`}</Text>
        <Text style={styles.littleTitle}>{`Белорусский рубль`}</Text>
      </View>
    </View>
  );
};

export const Course = memo(CourseBase);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  littleTitle: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
});
