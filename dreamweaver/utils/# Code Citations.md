# Code Citations

## License: unknown
https://github.com/christianbueschi/fceda-app/tree/11effd8c46c21f8f9ddfbd7065c2e1b739c41692/navigation/index.tsx

```
if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if
```


## License: MIT
https://github.com/expo/expo/tree/48235c2fc7befd5f0e821e38be2e299d8302ebdf/docs/pages/versions/v45.0.0/sdk/notifications.mdx

```
token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#
```


## License: unknown
https://github.com/OdiousCode/GeoAPP/tree/1f8e23208c77ac6d96314adf2509ea333645a97b/helper/functions/Notification.tsx

```
android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.
```


## License: unknown
https://github.com/CarlosIvanSoto/logsViewer/tree/01c5d9eeac35866fef8f7f33f99ea5007b223834/src/hooks/getToken.js

```
) {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor
```


## License: unknown
https://github.com/noormesslmani/MeetALocal/tree/5a9f303bcb1dd2c3e54b23f9ae8afba1f839bdc7/MeetALocal-rn/Notifications/Notifications.js

```
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250
```

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
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
  const wakeHour = 8; // 8 AM
  const sleepHour = 22; // 10 PM
  const activeHours = sleepHour - wakeHour;
  const interval = activeHours / 10;

  for (let i = 0; i < 10; i++) {
    const hour = Math.floor(wakeHour + (i * interval));
    const minute = Math.floor((wakeHour + (i * interval) - hour) * 60);

    const trigger = new Date();
    trigger.setHours(hour, minute, 0, 0);

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

