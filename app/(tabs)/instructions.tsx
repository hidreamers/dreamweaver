import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const dreamEntries = [
  "I was flying over a city and saw a giant clock.",
  "I was late for school and couldn't find my shoes.",
  "I saw a clock melting on the wall.",
  "I was flying again, this time with my dog.",
  "I couldn't find my classroom and felt lost.",
];

const STOP_WORDS = [
  "the", "and", "a", "to", "of", "in", "was", "for", "on", "with", "my", "i", "it", "at", "is", "again", "this", "time", "couldn't", "find", "felt", "lost", "over", "saw", "giant", "clock", "school", "shoes", "classroom", "dog", "wall", "melting", "city", "dream", "dreaming", "dreamt"
];

function extractDreamSigns(entries) {
  const wordDreams = {};
  entries.forEach((entry, dreamIdx) => {
    const words = entry
      .replace(/[^\w\s]/g, '')
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word && !STOP_WORDS.includes(word));
    const uniqueWords = new Set(words);
    uniqueWords.forEach(word => {
      if (!wordDreams[word]) wordDreams[word] = new Set();
      wordDreams[word].add(dreamIdx);
    });
  });
  return Object.entries(wordDreams)
    .filter(([word, dreamSet]) => dreamSet.size >= 2)
    .map(([word]) => word);
}

export default function InstructionsScreen() {
  const [dreamSigns, setDreamSigns] = useState([]);

  useEffect(() => {
    // Request notification permissions automatically on mount
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Enable Notifications',
          'Please enable notifications in your device settings to receive reminders.'
        );
      }
    })();
  }, []);

  const handleAnalyzeDreams = () => {
    const signs = extractDreamSigns(dreamEntries);
    setDreamSigns(signs);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>How to Use the Lucid Dreaming App</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Home Page</Text>
        <Text style={styles.text}>
          The Home page is your main control center. Here you can:
        </Text>
        <Text style={styles.bullet}>• Enable or disable Night Dream Practice reminders (with audio prompt every 75 minutes at night).</Text>
        <Text style={styles.bullet}>• Enable or disable Day Practice reminders ("IS THIS A DREAM?" popup every 2 hours).</Text>
        <Text style={styles.bullet}>• Enable or disable Meditation reminders (popup every 2 hours).</Text>
        <Text style={styles.bullet}>• Enable or disable Journal reminders (popup every 2 hours to encourage dream journaling).</Text>
        <Text style={styles.bullet}>• Test any reminder instantly using the "Test" buttons.</Text>
        <Text style={styles.text}>
          All reminder settings are now managed directly from the Home page—there is no separate Settings page.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dream Journal</Text>
        <Text style={styles.text}>
          Use the Dream Journal tab to record your dreams. Regular journaling helps improve dream recall and increases your chances of lucid dreaming.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meditation</Text>
        <Text style={styles.text}>
          Explore guided meditations and lessons to help you relax, prepare for sleep, and enhance your lucid dreaming practice. New meditations have been added, including:
        </Text>
        <Text style={styles.bullet}>• Healing Spirit Guide with Lucid Dreaming</Text>
        <Text style={styles.bullet}>• Theta with I Am Light Affirmations</Text>
        <Text style={styles.text}>
          Tap any meditation to listen or view the lesson.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reality Checks</Text>
        <Text style={styles.text}>
          Visit the Reality Checks tab to learn and practice different reality check techniques. These help you recognize when you are dreaming.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips</Text>
        <Text style={styles.text}>
          Check the Lucid Dreaming Tips section on the Home page for advice on building your lucid dreaming skills.
        </Text>
      </View>

      <View style={{ height: 30 }} /> {/* Extra space at the bottom */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 18,
    textAlign: 'center',
  },
  section: {
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    marginBottom: 4,
  },
});