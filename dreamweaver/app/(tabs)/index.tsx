import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';
import { LinearGradient } from 'expo-linear-gradient';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, Modal, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import ScreenSaver from '../../components/ScreenSaver';

// Remote audio files
const nightAudio = { uri: 'https://www.hidreamers.com/wp-content/uploads/2025/06/notification.mp3' };
const dayAudio = { uri: 'https://www.jerimiahmolfese.com/dream.wav' };

const TABS = [
  { name: 'Home', route: '/', description: 'Main dashboard and entry point for the app.' },
  { name: 'Reality Checks', route: '/reality-checks', description: 'Perform and track your daily reality checks.' },
  { name: 'Meditations', route: '/meditation', description: 'Guided meditations to help with lucid dreaming.' },
  { name: 'Joe Dispenza Meditations', route: '/joe-dispenza', description: 'Special meditations by Dr. Joe Dispenza.' },
  { name: 'About', route: '/about', description: 'Learn about the app and lucid dreaming.' },
  { name: 'Books', route: '/books', description: 'Recommended reading and resources for lucid dreaming.' },
  { name: 'Instructions', route: '/instructions', description: 'Step-by-step instructions for using the app and lucid dreaming techniques.' },
  { name: 'Dream Journal', route: '/dream-journal', description: 'Write, view, and analyze your dreams.' },
];

const INITIAL_TIMER = 2 * 60 * 60; // 2 hours in seconds

export default function TabIndex() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [nightPracticeOn, setNightPracticeOn] = useState(false);
  const [dayPracticeOn, setDayPracticeOn] = useState(false);
  const [meditationOn, setMeditationOn] = useState(false);
  const [journalOn, setJournalOn] = useState(false);
  const [screenSaverVisible, setScreenSaverVisible] = useState(false);
  const [showGettingStarted, setShowGettingStarted] = useState(false);

  // NEW: Sound toggles
  const [nightSoundOn, setNightSoundOn] = useState(true);
  const [daySoundOn, setDaySoundOn] = useState(true);

  // Timers for each card
  const [nightCountdown, setNightCountdown] = useState(null);
  const [dayCountdown, setDayCountdown] = useState(null);
  const [meditationCountdown, setMeditationCountdown] = useState(null);
  const [journalCountdown, setJournalCountdown] = useState(null);

  const nightIntervalRef = useRef(null);
  const nightTimerRef = useRef(null);
  const dayIntervalRef = useRef(null);
  const dayTimerRef = useRef(null);
  const meditationIntervalRef = useRef(null);
  const meditationTimerRef = useRef(null);
  const journalIntervalRef = useRef(null);
  const journalTimerRef = useRef(null);

  // Notification handler and Android channel
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable notifications in settings.');
      }
    })();

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }, []);

  useKeepAwake();

  // NIGHT PRACTICE
  const triggerNightPractice = async () => {
    Alert.alert('Night Dream Practice', 'I AM DREAMING');
    if (nightSoundOn) {
      try {
        const { sound } = await Audio.Sound.createAsync(nightAudio);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Audio error:', e);
      }
    }
  };
  const scheduleNightPracticeNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Night Dream Practice',
        body: 'I AM DREAMING',
        channelId: 'default',
      },
      trigger: { seconds: 2 },
    });
  };
  const toggleNightPractice = (value) => {
    setNightPracticeOn(value);
    if (value) {
      triggerNightPractice();
      scheduleNightPracticeNotification();
      setNightCountdown(INITIAL_TIMER);
      nightIntervalRef.current = setInterval(() => {
        triggerNightPractice();
        scheduleNightPracticeNotification();
        setNightCountdown(INITIAL_TIMER);
      }, INITIAL_TIMER * 1000);
      nightTimerRef.current = setInterval(() => {
        setNightCountdown(prev => (prev > 0 ? prev - 1 : INITIAL_TIMER));
      }, 1000);
    } else {
      if (nightIntervalRef.current) clearInterval(nightIntervalRef.current);
      if (nightTimerRef.current) clearInterval(nightTimerRef.current);
      nightIntervalRef.current = null;
      nightTimerRef.current = null;
      setNightCountdown(null);
    }
  };

  // DAY PRACTICE
  const triggerDayPractice = async () => {
    Alert.alert('Day Practice', 'IS THIS A DREAM?');
    if (daySoundOn) {
      try {
        const { sound } = await Audio.Sound.createAsync(dayAudio);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) {
            sound.unloadAsync();
          }
        });
      } catch (e) {
        console.log('Audio error:', e);
      }
    }
  };
  const scheduleDayPracticeNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Day Practice',
        body: 'IS THIS A DREAM?',
        channelId: 'default',
      },
      trigger: { seconds: 2 },
    });
  };
  useEffect(() => {
    if (dayPracticeOn) {
      triggerDayPractice();
      scheduleDayPracticeNotification();
      setDayCountdown(INITIAL_TIMER);
      dayIntervalRef.current = setInterval(() => {
        triggerDayPractice();
        scheduleDayPracticeNotification();
        setDayCountdown(INITIAL_TIMER);
      }, INITIAL_TIMER * 1000);
      dayTimerRef.current = setInterval(() => {
        setDayCountdown(prev => (prev > 0 ? prev - 1 : INITIAL_TIMER));
      }, 1000);
    } else {
      if (dayIntervalRef.current) clearInterval(dayIntervalRef.current);
      if (dayTimerRef.current) clearInterval(dayTimerRef.current);
      dayIntervalRef.current = null;
      dayTimerRef.current = null;
      setDayCountdown(null);
    }
    return () => {
      if (dayIntervalRef.current) clearInterval(dayIntervalRef.current);
      if (dayTimerRef.current) clearInterval(dayTimerRef.current);
    };
  }, [dayPracticeOn]);

  // MEDITATION
  const triggerMeditation = () => {
    Alert.alert('Meditation Reminder', 'Take a moment to meditate and reflect.');
  };
  const scheduleMeditationNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Meditation Reminder',
        body: 'Take a moment to meditate and reflect.',
        channelId: 'default',
      },
      trigger: { seconds: 2 },
    });
  };
  useEffect(() => {
    if (meditationOn) {
      triggerMeditation();
      scheduleMeditationNotification();
      setMeditationCountdown(INITIAL_TIMER);
      meditationIntervalRef.current = setInterval(() => {
        triggerMeditation();
        scheduleMeditationNotification();
        setMeditationCountdown(INITIAL_TIMER);
      }, INITIAL_TIMER * 1000);
      meditationTimerRef.current = setInterval(() => {
        setMeditationCountdown(prev => (prev > 0 ? prev - 1 : INITIAL_TIMER));
      }, 1000);
    } else {
      if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
      if (meditationTimerRef.current) clearInterval(meditationTimerRef.current);
      meditationIntervalRef.current = null;
      meditationTimerRef.current = null;
      setMeditationCountdown(null);
    }
    return () => {
      if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
      if (meditationTimerRef.current) clearInterval(meditationTimerRef.current);
    };
  }, [meditationOn]);

  // JOURNAL
  const triggerJournal = () => {
    Alert.alert('Journal Reminder', 'Write a quick journal entry about your day or dreams.');
  };
  const scheduleJournalNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Journal Reminder',
        body: 'Write a quick journal entry about your day or dreams.',
        channelId: 'default',
      },
      trigger: { seconds: 2 },
    });
  };
  useEffect(() => {
    if (journalOn) {
      triggerJournal();
      scheduleJournalNotification();
      setJournalCountdown(INITIAL_TIMER);
      journalIntervalRef.current = setInterval(() => {
        triggerJournal();
        scheduleJournalNotification();
        setJournalCountdown(INITIAL_TIMER);
      }, INITIAL_TIMER * 1000);
      journalTimerRef.current = setInterval(() => {
        setJournalCountdown(prev => (prev > 0 ? prev - 1 : INITIAL_TIMER));
      }, 1000);
    } else {
      if (journalIntervalRef.current) clearInterval(journalIntervalRef.current);
      if (journalTimerRef.current) clearInterval(journalTimerRef.current);
      journalIntervalRef.current = null;
      journalTimerRef.current = null;
      setJournalCountdown(null);
    }
    return () => {
      if (journalIntervalRef.current) clearInterval(journalIntervalRef.current);
      if (journalTimerRef.current) clearInterval(journalTimerRef.current);
    };
  }, [journalOn]);

  useEffect(() => {
    return () => {
      if (nightIntervalRef.current) clearInterval(nightIntervalRef.current);
      if (nightTimerRef.current) clearInterval(nightTimerRef.current);
      if (dayIntervalRef.current) clearInterval(dayIntervalRef.current);
      if (dayTimerRef.current) clearInterval(dayTimerRef.current);
      if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
      if (meditationTimerRef.current) clearInterval(meditationTimerRef.current);
      if (journalIntervalRef.current) clearInterval(journalIntervalRef.current);
      if (journalTimerRef.current) clearInterval(journalTimerRef.current);
    };
  }, []);

  const formatCountdown = (seconds) => {
    if (seconds === null) return '--:--';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return h > 0
      ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#f8f9fa' }}>
      {/* Gradient Header */}
      <LinearGradient
        colors={['#3a1c71', '#d76d77', '#ffaf7b']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Lucid Dreaming Assistant</Text>
        <Text style={styles.headerSubtitle}>Your guide to conscious dreaming</Text>
      </LinearGradient>

      {/* Getting Started Dropdown */}
      <View style={{ padding: 12 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#3a1c71',
            borderRadius: 8,
            padding: 10,
            alignItems: 'center',
            marginBottom: 8,
          }}
          onPress={() => setShowGettingStarted(!showGettingStarted)}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            {showGettingStarted ? 'Hide Getting Started' : 'Show Getting Started'}
          </Text>
        </TouchableOpacity>
        {showGettingStarted && (
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 14,
            marginBottom: 10,
            elevation: 2,
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#3a1c71' }}>
              Getting Started
            </Text>
            <Text style={{ fontSize: 15, color: '#333', marginBottom: 6 }}>
              Welcome to the Lucid Dreaming Assistant! Here’s how to use the app:
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
              1. Use the toggles on each card to set reminders for Night Practice, Day Practice, Meditation, and Dream Journal. These reminders help you build habits for lucid dreaming.
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
              2. When a reminder goes off, follow the prompt to perform a reality check, meditate, or journal your dreams.
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
              3. Use the navigation dropdown to explore reality checks, meditations, recommended books, instructions, and more.
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
              4. Write down your dreams in the Dream Journal to track your progress and increase dream recall.
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginBottom: 4 }}>
              5. <Text style={{ fontWeight: 'bold', color: '#3a1c71' }}>Screensaver:</Text> Tap "Activate Screensaver" for a relaxing visual break. While the screensaver is active, your device’s screen will stay on and will not automatically turn off or lock. This is helpful if you want to keep calming visuals on as you relax, meditate, or prepare for sleep, without worrying about your phone going to sleep or the display turning off. You can exit the screensaver at any time by tapping the screen or using the exit button.
            </Text>
            <Text style={{ fontSize: 14, color: '#555' }}>
              Enjoy your journey to more conscious and vivid dreaming!
            </Text>
          </View>
        )}
      </View>

      {/* Dropdown Navigation */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownToggle}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownToggleText}>
            {showDropdown ? 'Hide Tab Navigation' : 'Show Tab Navigation'}
          </Text>
        </TouchableOpacity>
        {showDropdown && (
          <View style={styles.dropdownContent}>
            {TABS.map(tab => (
              <View key={tab.route} style={styles.dropdownItem}>
                <Text style={styles.tabName}>{tab.name}</Text>
                <Text style={styles.tabDesc}>{tab.description}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push(tab.route)}
                >
                  <Text style={styles.buttonText}>Go to {tab.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Nicer Cards with Functionality */}
      <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.nicerCard}>
        <Ionicons name="moon" size={36} color="#3a1c71" style={{ marginBottom: 8 }} />
        <Text style={styles.cardTitle}>Night Dream Practice</Text>
        <Text style={styles.cardText}>Set reminders to do night dream practices.</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reminders</Text>
          <Switch value={nightPracticeOn} onValueChange={toggleNightPractice} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sound</Text>
          <Switch value={nightSoundOn} onValueChange={setNightSoundOn} />
        </View>
        <Text style={styles.countdown}>
          Next Reminder: {formatCountdown(nightCountdown)}
        </Text>
      </LinearGradient>

      <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={styles.nicerCard}>
        <Ionicons name="sunny" size={36} color="#d76d77" style={{ marginBottom: 8 }} />
        <Text style={styles.cardTitle}>Day Practice</Text>
        <Text style={styles.cardText}>Set reminders to do day reality checks.</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reminders</Text>
          <Switch value={dayPracticeOn} onValueChange={setDayPracticeOn} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sound</Text>
          <Switch value={daySoundOn} onValueChange={setDaySoundOn} />
        </View>
        <Text style={styles.countdown}>
          Next Reminder: {formatCountdown(dayCountdown)}
        </Text>
      </LinearGradient>

      <LinearGradient colors={['#f9d423', '#ff4e50']} style={styles.nicerCard}>
        <Ionicons name="leaf" size={36} color="#ffaf7b" style={{ marginBottom: 8 }} />
        <Text style={styles.cardTitle}>Meditation</Text>
        <Text style={styles.cardText}>Set reminders to meditate and reflect.</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reminders</Text>
          <Switch value={meditationOn} onValueChange={setMeditationOn} />
        </View>
        <Text style={styles.countdown}>
          Next Reminder: {formatCountdown(meditationCountdown)}
        </Text>
      </LinearGradient>

      <LinearGradient colors={['#fbc2eb', '#a6c1ee']} style={styles.nicerCard}>
        <Ionicons name="book" size={36} color="#b06ab3" style={{ marginBottom: 8 }} />
        <Text style={styles.cardTitle}>Dream Journal</Text>
        <Text style={styles.cardText}>Write, view, and analyze your dreams.</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Reminders</Text>
          <Switch value={journalOn} onValueChange={setJournalOn} />
        </View>
        <Text style={styles.countdown}>
          Next Reminder: {formatCountdown(journalCountdown)}
        </Text>
      </LinearGradient>

      {/* Screensaver Button */}
      <TouchableOpacity
        style={styles.screensaverButton}
        onPress={() => setScreenSaverVisible(true)}
      >
        <Ionicons name="planet" size={22} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.screensaverButtonText}>Activate Screensaver</Text>
      </TouchableOpacity>

      {/* Bottom image */}
      <Image
        source={{ uri: 'https://www.hidreamers.com/wp-content/uploads/2025/05/ChatGPT-Image-May-6-2025-12_36_43-PM.png' }}
        style={styles.largeImageBottom}
        resizeMode="contain"
      />

      {/* Screen Saver Modal */}
      <Modal visible={screenSaverVisible} animationType="fade" transparent={false}>
        <ScreenSaver onExit={() => setScreenSaverVisible(false)} />
      </Modal>

      {/* Splash Image */}
      <Image
        source={require('../../assets/images/splash-icon.png')}
        style={{ width: 100, height: 100 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 36,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 2,
  },
  largeImage: {
    width: '100%',
    height: 400,
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 14,
  },
  largeImageBottom: {
    width: '100%',
    height: 400,
    marginTop: 0,
    marginBottom: 4,
    alignSelf: 'center',
    borderRadius: 14,
  },
  dropdownContainer: { padding: 8 },
  dropdownToggle: {
    backgroundColor: '#3a1c71',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginBottom: 6,
  },
  dropdownToggleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  dropdownContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    elevation: 2,
  },
  dropdownItem: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 6,
  },
  tabName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d76d77',
  },
  tabDesc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#3a1c71',
    borderRadius: 8,
    padding: 6,
    alignItems: 'center',
    marginBottom: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nicerCard: {
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 6,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    marginTop: 4,
  },
  screensaverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a1c71',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 0,
  },
  screensaverButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
