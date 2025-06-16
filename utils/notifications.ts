import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }
  return token;
}

export async function scheduleNightPracticeNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Night Dream Practice',
      body: 'I AM DREAMING',
    },
    trigger: { seconds: 2 }, // Change to your desired interval
  });
}

export async function scheduleDayPracticeNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Day Practice',
      body: 'IS THIS A DREAM?',
    },
    trigger: { seconds: 2 },
  });
}

export async function scheduleMeditationNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Meditation Reminder',
      body: 'Take a moment to meditate and reflect.',
    },
    trigger: { seconds: 2 },
  });
}

export async function scheduleJournalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Journal Reminder',
      body: 'Write a quick journal entry about your day or dreams.',
    },
    trigger: { seconds: 2 },
  });
}

export async function scheduleRealityCheckNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Reality Check',
      body: 'Are you dreaming?',
    },
    trigger: { seconds: 2 },
  });
}
