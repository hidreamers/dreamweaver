import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DreamJournal from '../(tabs)/dream-journal';
import Books from '../(tabs)/books';
import RealityChecks from '../(tabs)/reality-checks';
import Meditation from '../(tabs)/meditation';
import JoeDispenza from '../(tabs)/joe-dispenza';
import About from '../(tabs)/about';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarActiveTintColor: '#3a1c71',
          tabBarInactiveTintColor: '#aaa',
        }}
      >
        <Tab.Screen
          name="Dream Journal"
          component={DreamJournal}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Books"
          component={Books}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Reality Checks"
          component={RealityChecks}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="eye-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Meditation"
          component={Meditation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="musical-notes-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Joe Dispenza"
          component={JoeDispenza}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="play-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sunny-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}