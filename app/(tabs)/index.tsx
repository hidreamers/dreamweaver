import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [showTips, setShowTips] = useState(false);
  const [nightPracticeOn, setNightPracticeOn] = useState(false);
  const [dayPracticeOn, setDayPracticeOn] = useState(false);
  const [meditationOn, setMeditationOn] = useState(false);
  const [journalOn, setJournalOn] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const meditationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const journalIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Path to your custom audio file in assets
  const audioFile = require('../../assets/notification_Night.mp3');

  // Play audio and show prompt
  const triggerNightPractice = async () => {
    Alert.alert('Night Dream Practice', 'I AM DREAMING');
    const { sound } = await Audio.Sound.createAsync(audioFile);
    await sound.playAsync();
  };

  // Day Practice: popup every 2 hours
  const triggerDayPractice = () => {
    Alert.alert('Day Practice', 'IS THIS A DREAM?');
  };

  // Meditation Reminder: popup every 2 hours
  const triggerMeditation = () => {
    Alert.alert('Meditation Reminder', 'Take a moment to meditate and reflect.');
  };

  // Journal Reminder: popup every 2 hours
  const triggerJournal = () => {
    Alert.alert('Journal Reminder', 'Write a quick journal entry about your day or dreams.');
  };

  // Toggle Night Practice
  const toggleNightPractice = (value: boolean) => {
    setNightPracticeOn(value);
    if (value) {
      triggerNightPractice(); // Immediate first prompt
      intervalRef.current = setInterval(triggerNightPractice, 4500000); // 75 min
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    if (dayPracticeOn) {
      triggerDayPractice(); // Immediate first popup
      dayIntervalRef.current = setInterval(triggerDayPractice, 7200000); // 2 hours
    } else if (dayIntervalRef.current) {
      clearInterval(dayIntervalRef.current);
      dayIntervalRef.current = null;
    }
    return () => {
      if (dayIntervalRef.current) clearInterval(dayIntervalRef.current);
    };
  }, [dayPracticeOn]);

  useEffect(() => {
    if (meditationOn) {
      triggerMeditation();
      meditationIntervalRef.current = setInterval(triggerMeditation, 7200000); // 2 hours
    } else if (meditationIntervalRef.current) {
      clearInterval(meditationIntervalRef.current);
      meditationIntervalRef.current = null;
    }
    return () => {
      if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
    };
  }, [meditationOn]);

  useEffect(() => {
    if (journalOn) {
      triggerJournal();
      journalIntervalRef.current = setInterval(triggerJournal, 7200000); // 2 hours
    } else if (journalIntervalRef.current) {
      clearInterval(journalIntervalRef.current);
      journalIntervalRef.current = null;
    }
    return () => {
      if (journalIntervalRef.current) clearInterval(journalIntervalRef.current);
    };
  }, [journalOn]);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (dayIntervalRef.current) clearInterval(dayIntervalRef.current);
      if (meditationIntervalRef.current) clearInterval(meditationIntervalRef.current);
      if (journalIntervalRef.current) clearInterval(journalIntervalRef.current);
    };
  }, []);

  const startMILDPractice = () => {
    // Navigate to MILD practice screen
    router.push('/mild-practice');
  };

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3a1c71', '#d76d77', '#ffaf7b']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Lucid Dream Assistant</Text>
        <Text style={styles.headerSubtitle}>Your guide to conscious dreaming</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome to Your Lucid Dreaming Journey</Text>
          <Text style={styles.cardText}>
            Track your dreams, practice reality checks, and use guided meditations to enhance your lucid dreaming abilities.
          </Text>
          <TouchableOpacity style={styles.button} onPress={startMILDPractice}>
            <Text style={styles.buttonText}>Start MILD Practice</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.nightPracticeCard]}>
          <View style={styles.nightPracticeHeader}>
            <Ionicons name="moon" size={32} color="#3a1c71" style={{ marginRight: 12 }} />
            <Text style={styles.nightPracticeTitle}>Night Dream Practice</Text>
          </View>
          <Text style={styles.nightPracticeDescription}>
            When enabled, you'll get a prompt "I AM DREAMING" and your custom audio every 75 minutes at night.
          </Text>
          <View style={styles.nightPracticeRow}>
            <Text style={styles.nightPracticeLabel}>Enable Night Practice</Text>
            <Switch value={nightPracticeOn} onValueChange={toggleNightPractice} />
          </View>
          <TouchableOpacity style={styles.nightPracticeTestButton} onPress={triggerNightPractice}>
            <Ionicons name="flask" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.nightPracticeTestButtonText}>Test Night Practice</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.dayPracticeCard]}>
          <View style={styles.nightPracticeHeader}>
            <Ionicons name="sunny" size={32} color="#d76d77" style={{ marginRight: 12 }} />
            <Text style={styles.nightPracticeTitle}>Day Practice</Text>
          </View>
          <Text style={styles.nightPracticeDescription}>
            When enabled, you'll get a popup "IS THIS A DREAM?" every 2 hours during the day.
          </Text>
          <View style={styles.nightPracticeRow}>
            <Text style={styles.nightPracticeLabel}>Enable Day Practice</Text>
            <Switch value={dayPracticeOn} onValueChange={setDayPracticeOn} />
          </View>
          <TouchableOpacity style={styles.nightPracticeTestButton} onPress={triggerDayPractice}>
            <Ionicons name="flask" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.nightPracticeTestButtonText}>Test Day Practice</Text>
          </TouchableOpacity>
        </View>

        {/* Meditation Reminder Card */}
        <View style={[styles.card, styles.meditationCard]}>
          <View style={styles.practiceHeader}>
            <Ionicons name="leaf" size={32} color="#43a047" style={{ marginRight: 12 }} />
            <Text style={styles.practiceTitle}>Meditation Reminder</Text>
          </View>
          <Text style={styles.practiceDescription}>
            When enabled, you'll get a popup reminder to meditate every 2 hours.
          </Text>
          <View style={styles.practiceRow}>
            <Text style={styles.practiceLabel}>Enable Meditation</Text>
            <Switch value={meditationOn} onValueChange={setMeditationOn} />
          </View>
          <TouchableOpacity style={styles.practiceTestButton} onPress={triggerMeditation}>
            <Ionicons name="flask" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.practiceTestButtonText}>Test Meditation Reminder</Text>
          </TouchableOpacity>
        </View>

        {/* Journal Reminder Card */}
        <View style={[styles.card, styles.journalCard]}>
          <View style={styles.practiceHeader}>
            <Ionicons name="book" size={32} color="#ffb300" style={{ marginRight: 12 }} />
            <Text style={styles.practiceTitle}>Journal Reminder</Text>
          </View>
          <Text style={styles.practiceDescription}>
            When enabled, you'll get a popup reminder to write a journal entry every 2 hours.
          </Text>
          <View style={styles.practiceRow}>
            <Text style={styles.practiceLabel}>Enable Journal</Text>
            <Switch value={journalOn} onValueChange={setJournalOn} />
          </View>
          <TouchableOpacity style={styles.practiceTestButton} onPress={triggerJournal}>
            <Ionicons name="flask" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.practiceTestButtonText}>Test Journal Reminder</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.tipsCard} onPress={toggleTips}>
          <View style={styles.tipsHeader}>
            <Text style={styles.tipsTitle}>Lucid Dreaming Tips</Text>
            <Ionicons 
              name={showTips ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#3a1c71" 
            />
          </View>
          
          {showTips && (
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Ionicons name="moon" size={20} color="#3a1c71" />
                <Text style={styles.tipText}>
                  Use <Text style={{fontWeight: 'bold'}}>Night Dream Practice</Text> to reinforce lucidity cues while you sleep. When the prompt appears, remind yourself "I AM DREAMING" and listen to your custom audio.
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="sunny" size={20} color="#d76d77" />
                <Text style={styles.tipText}>
                  Enable <Text style={{fontWeight: 'bold'}}>Day Practice</Text> for regular "IS THIS A DREAM?" popups. Each time, pause and truly question your reality.
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="leaf" size={20} color="#43a047" />
                <Text style={styles.tipText}>
                  Use <Text style={{fontWeight: 'bold'}}>Meditation Reminders</Text> to take mindful breaks and increase dream awareness.
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="book" size={20} color="#ffb300" />
                <Text style={styles.tipText}>
                  Use <Text style={{fontWeight: 'bold'}}>Journal Reminders</Text> to record your dreams and thoughts regularly.
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="repeat" size={20} color="#3a1c71" />
                <Text style={styles.tipText}>
                  Stay consistent! The more you use these practices, the more likely you are to recognize when you’re dreaming.
                </Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="alarm" size={20} color="#3a1c71" />
                <Text style={styles.tipText}>
                  Try the Wake Back to Bed technique: wake up after 5–6 hours of sleep, stay awake briefly, then return to bed with the intention to lucid dream.
                </Text>
              </View>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.imageCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2908175/pexels-photo-2908175.jpeg' }}
            style={styles.dreamImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.imageText}>
              "All that we see or seem is but a dream within a dream." - Edgar Allan Poe
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
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
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nightPracticeCard: {
    backgroundColor: '#e8f0fe',
    borderColor: '#3a1c71',
    borderWidth: 1,
  },
  dayPracticeCard: {
    backgroundColor: '#fffde7',
    borderWidth: 1,
    borderColor: '#ffe082',
    marginBottom: 20,
    paddingBottom: 24,
  },
  meditationCard: {
    backgroundColor: '#e8f5e9',
    borderColor: '#43a047',
    borderWidth: 1,
    marginBottom: 20,
    paddingBottom: 24,
  },
  journalCard: {
    backgroundColor: '#fff8e1',
    borderColor: '#ffb300',
    borderWidth: 1,
    marginBottom: 20,
    paddingBottom: 24,
  },
  nightPracticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nightPracticeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a1c71',
  },
  nightPracticeDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  nightPracticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  nightPracticeLabel: {
    fontSize: 18,
    marginRight: 12,
    color: '#333',
  },
  nightPracticeTestButton: {
    backgroundColor: '#3a1c71',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nightPracticeTestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3a1c71',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tipsList: {
    marginTop: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  imageCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    height: 200,
    position: 'relative',
  },
  dreamImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 15,
  },
  imageText: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  practiceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3a1c71',
  },
  practiceDescription: {
    fontSize: 15,
    color: '#555',
    marginBottom: 18,
    textAlign: 'center',
  },
  practiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  practiceLabel: {
    fontSize: 16,
    color: '#3a1c71',
    fontWeight: 'bold',
  },
  practiceTestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a1c71',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignSelf: 'center',
  },
  practiceTestButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
