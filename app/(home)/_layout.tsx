import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { theme } from '@/shared';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
      initialRouteName="courses"
    >
      <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />
      <Tabs.Screen
        name="courses"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
          tabBarLabel: 'Курсы',
        }}
      />
      <Tabs.Screen
        name="convector"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" color={color} size={size} />
          ),
          tabBarLabel: 'Конвертер',
        }}
      />
    </Tabs>
  );
}
