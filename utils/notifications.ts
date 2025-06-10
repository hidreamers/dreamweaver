import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

export async function scheduleRealityCheckNotifications() {
  // Cancel any existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  // Schedule 10 reality check reminders throughout the day
  const wakeHour = 8; // Assuming wake up at 8 AM
  const sleepHour = 22; // Assuming sleep at 10 PM
  const activeHours = sleepHour - wakeHour;
  const interval = activeHours / 10;
  
  for (let i = 0; i < 10; i++) {
    const hour = Math.floor(wakeHour + (i * interval));
    const minute = Math.floor((wakeHour + (i * interval) - hour) * 60);
    
    const trigger = new Date();
    trigger.setHours(hour, minute, 0);
    
    // If the time is in the past, schedule for tomorrow
    if (trigger < new Date()) {
      trigger.setDate(trigger.getDate() + 1);
    }
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reality Check",
        body: "Am I dreaming? Perform a reality check now.",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger,
    });
  }
}
