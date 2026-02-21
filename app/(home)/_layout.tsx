import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

import { theme } from '@/shared';
import { DeviceData } from '@/shared/ui';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <DeviceData />,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
      initialRouteName="courses"
    >
      <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />
      <Tabs.Screen
        name="courses"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
          tabBarLabel: 'Курсы',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" color={color} size={size} />
          ),
          tabBarLabel: 'История',
        }}
      />
      <Tabs.Screen
        name="convector"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" color={color} size={size} />
          ),
          tabBarLabel: 'Конвертер',
        }}
      />
    </Tabs>
  );
}
