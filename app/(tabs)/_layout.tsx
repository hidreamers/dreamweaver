import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#3a1c71',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse-outline';
          if (route.name === 'index') iconName = 'home-outline';
          else if (route.name === 'meditation') iconName = 'musical-notes-outline';
          else if (route.name === 'reality-checks') iconName = 'eye-outline';
          else if (route.name === 'about') iconName = 'person-circle-outline';
          else if (route.name === 'books') iconName = 'book-outline';
          else if (route.name === 'dream-journal') iconName = 'journal-outline';
          else if (route.name === 'joe-dispenza') iconName = 'star-outline';
          // Add more as needed
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}
