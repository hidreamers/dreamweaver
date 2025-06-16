import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, Alert, StyleSheet, useColorScheme, Text, Modal, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import RealityCheckCard from '../../components/RealityCheckCard';
import ScreenSaver from '../../components/ScreenSaver';
import { RealityCheck } from '../../types';
import Colors from '../../constants/Colors';
import { useKeepAwake } from 'expo-keep-awake';

// Example data
const initialChecks: RealityCheck[] = [
  { id: '1', name: 'Finger Through Palm', description: 'Try to push your finger through your palm.', completed: false },
  { id: '2', name: 'Nose Pinch', description: 'Pinch your nose and try to breathe.', completed: false },
];

const realityCheckTypes = [
  {
    id: '1',
    name: 'Hand Check',
    description: 'Look at your hands. In dreams, hands often appear distorted or have the wrong number of fingers.',
    icon: 'hand-left',
  },
  // ...other reality checks...
];

export default function RealityChecksScreen() {
  const [checks, setChecks] = useState<RealityCheck[]>(initialChecks);
  const [screenSaverVisible, setScreenSaverVisible] = useState(false);
  const [reminderOn, setReminderOn] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const colorScheme = useColorScheme() ?? 'light';

  useKeepAwake();

  // Notification permission request
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable notifications in settings.');
      }
    })();
  }, []);

  // Schedule a local notification for Reality Check
  const scheduleRealityCheckNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reality Check',
        body: 'Ask yourself: Am I dreaming?',
      },
      trigger: { seconds: 2 },
    });
  };

  // Start reminders when screensaver is active
  useEffect(() => {
    if (screenSaverVisible && reminderOn) {
      scheduleRealityCheckNotification();
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          scheduleRealityCheckNotification();
          setCountdown(2 * 60 * 60);
        }, 2 * 60 * 60 * 1000);
      }
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          setCountdown(prev => (prev > 0 ? prev - 1 : 2 * 60 * 60));
        }, 1000);
      }
    } else if (!screenSaverVisible && (!reminderOn || !screenSaverVisible)) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      intervalRef.current = null;
      timerRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screenSaverVisible, reminderOn]);

  // In-app popup reminder every 2 hours (and notification)
  useEffect(() => {
    if (reminderOn) {
      scheduleRealityCheckNotification();
      setCountdown(2 * 60 * 60); // 2 hours in seconds
      intervalRef.current = setInterval(() => {
        scheduleRealityCheckNotification();
        setCountdown(2 * 60 * 60);
      }, 2 * 60 * 60 * 1000); // 2 hours
      timerRef.current = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 2 * 60 * 60));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      intervalRef.current = null;
      timerRef.current = null;
      setCountdown(null);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reminderOn]);

  // Handler for toggling a reality check
  const handleToggle = async (id: string) => {
    setChecks(prev =>
      prev.map(check =>
        check.id === id ? { ...check, completed: !check.completed } : check
      )
    );

    // Trigger a local notification when toggled
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reality Check',
        body: 'You just completed a reality check!',
      },
      trigger: { seconds: 2 },
    });
  };

  // Format seconds as hh:mm:ss or mm:ss
  const formatCountdown = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Perform a reality check (show alert and notification)
  const performRealityCheck = (check: RealityCheck) => {
    Alert.alert(
      check.name,
      check.description + '\n\nAsk yourself: "Am I dreaming?"',
      [{ text: 'OK' }]
    );
    scheduleRealityCheckNotification();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1646' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.title}>Reality Checks</Text>
        <Text style={styles.body}>
          Set reminders and learn techniques to help you perform reality checks throughout your day.
        </Text>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <Ionicons name="eye" size={44} color="#d76d77" style={{ marginBottom: 10 }} />
            <Text style={styles.cardTitle}>Automated Reality Check Reminders</Text>
            <Text style={styles.cardText}>
              You will receive a reality check notification every 2 hours while reminders are enabled.
            </Text>
            <View style={styles.row}>
              <Text style={styles.label}>Reminders</Text>
              <Switch
                value={reminderOn}
                onValueChange={setReminderOn}
                trackColor={{ false: '#d1c4e9', true: '#d76d77' }}
                thumbColor={reminderOn ? '#fff' : '#3a1c71'}
              />
            </View>
            <Text style={styles.countdown}>
              Next Reality Check in: {formatCountdown(countdown)}
            </Text>
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => {
                Alert.alert('Reality Check', 'Ask yourself: Am I dreaming?');
                scheduleRealityCheckNotification();
              }}
            >
              <Ionicons name="flask" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.testButtonText}>Test Reality Check</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Reality Check Cards</Text>
          {realityCheckTypes.map((check) => (
            <TouchableOpacity
              key={check.id}
              style={styles.checkItem}
              onPress={() => performRealityCheck(check)}
            >
              <View style={styles.checkIconContainer}>
                <Ionicons name={check.icon} size={28} color="#3a1c71" />
              </View>
              <View style={styles.checkContent}>
                <Text style={styles.checkName}>{check.name}</Text>
                <Text style={styles.checkDescription}>{check.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#ccc" />
            </TouchableOpacity>
          ))}

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Keep Your App Awake</Text>
            <Text style={styles.infoText}>
              To keep reminders working, activate the screensaver below. This will keep your phone awake and notifications will continue.
            </Text>
            <TouchableOpacity
              style={styles.screensaverButton}
              onPress={() => setScreenSaverVisible(true)}
            >
              <Ionicons name="planet" size={22} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.screensaverButtonText}>Activate Screensaver</Text>
            </TouchableOpacity>
          </View>
          <Modal visible={screenSaverVisible} animationType="fade" transparent={false}>
            <ScreenSaver onExit={() => setScreenSaverVisible(false)} />
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: '#3a1c71',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d1c4e9',
    marginBottom: 18,
    textAlign: 'center',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#3a1c71',
    fontWeight: 'bold',
    marginRight: 10,
  },
  countdown: {
    color: '#d76d77',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  checkItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkContent: {
    flex: 1,
  },
  checkName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  checkDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#f0e6ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 18,
    marginBottom: 30,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  screensaverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a1c71',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 8,
  },
  screensaverButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d76d77',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 18,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  body: { fontSize: 16, color: '#555', textAlign: 'center' },
});
