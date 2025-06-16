# Code Citations

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


## License: unknown
https://github.com/Appgregator-projects/alEdrusAppNew/tree/088f1928d2499178b2e35f1fa3c839ab40739ca2/src/Utils/notification.js

```
Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX
```

