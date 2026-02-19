import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="courses"
        options={{
          headerShown: false,
          title: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="convector"
        options={{
          headerShown: false,
          title: 'Convector',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
