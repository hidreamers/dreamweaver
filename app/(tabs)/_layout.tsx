import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#3a1c71',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#d1c4e9',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'dream-journal') iconName = 'book';
          else if (route.name === 'meditation') iconName = 'headset';
          else if (route.name === 'instructions') iconName = 'information-circle';
          else if (route.name === 'reality-checks') iconName = 'checkbox-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="dream-journal" options={{ title: 'Dream Journal' }} />
      <Tabs.Screen name="meditation" options={{ title: 'Meditation' }} />
      <Tabs.Screen name="instructions" options={{ title: 'Instructions' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="reality-checks" options={{ title: 'Reality Checks' }} />
    </Tabs>
  );
}
