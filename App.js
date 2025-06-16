import React, { useEffect, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import AppNavigator from './app/navigation/AppNavigator';
import { registerForPushNotificationsAsync } from './app/utils/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      if (token) {
        Alert.alert('Expo Push Token', token);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {expoPushToken ? (
        <View style={{ padding: 16, backgroundColor: '#fff' }}>
          <Text style={{ fontWeight: 'bold' }}>Your Expo Push Token:</Text>
          <Text selectable style={{ color: '#3a1c71' }}>{expoPushToken}</Text>
        </View>
      ) : null}
      <AppNavigator />
    </View>
  );
}