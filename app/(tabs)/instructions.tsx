import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

  const handleAnalyzeDreams = () => {
    const signs = extractDreamSigns(dreamEntries);
    setDreamSigns(signs);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Instructions</Text>

      <Text style={styles.sectionTitle}>Welcome!</Text>
      <Text style={styles.text}>
        This app helps you build habits for lucid dreaming. If you’re new to technology, don’t worry—just follow these simple steps!
      </Text>

      <Text style={styles.sectionTitle}>1. Home Screen Overview</Text>
      <Text style={styles.text}>
        When you open the app, you’ll see several cards: Night Dream Practice, Day Practice, Meditation, and Dream Journal. Each card has a switch (toggle) you can turn ON or OFF.
      </Text>
      <Text style={styles.text}>
        - Turning ON a switch means you’ll get a reminder every two hours for that activity.
        {"\n"}- For example, if you turn on Night Dream Practice, you’ll get a reminder every two hours to do your night practice.
      </Text>

      <Text style={styles.sectionTitle}>2. How Reminders Work</Text>
      <Text style={styles.text}>
        - Reminders are automatic and repeat every two hours as long as the switch is ON.
        {"\n"}- When a reminder appears, your phone will show a message telling you what to do.
        {"\n"}- You don’t need to set anything else—just turn the switch ON or OFF as you like.
      </Text>

      <Text style={styles.sectionTitle}>3. What Each Card Means</Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>Night Dream Practice:</Text> Reminds you to do a night-time lucid dreaming exercise.
        {"\n"}<Text style={styles.bold}>Day Practice:</Text> Reminds you to check if you’re dreaming during the day.
        {"\n"}<Text style={styles.bold}>Meditation:</Text> Reminds you to take a moment to meditate and relax.
        {"\n"}<Text style={styles.bold}>Dream Journal:</Text> Reminds you to write down your dreams or thoughts.
      </Text>

      <Text style={styles.sectionTitle}>4. Using the Navigation Dropdown</Text>
      <Text style={styles.text}>
        At the top of the home screen, there’s a button that says “Show Tab Navigation.” Tap it to see more sections of the app, like Reality Checks, Meditations, Books, Instructions, and Dream Journal. Tap any button to go to that section.
      </Text>

      <Text style={styles.sectionTitle}>5. The Screensaver Feature</Text>
      <Text style={styles.text}>
        There’s a button labeled “Activate Screensaver.” When you tap it:
        {"\n"}- The app will show calming visuals and animations.
        {"\n"}- While the screensaver is active, your device’s screen will stay ON and will NOT automatically turn off or lock.
        {"\n"}- This is helpful if you want to keep the screen on while relaxing, meditating, or preparing for sleep.
        {"\n"}- To exit the screensaver, just tap the screen or use the exit button.
      </Text>

      <Text style={styles.sectionTitle}>6. Dream Journal</Text>
      <Text style={styles.text}>
        In the Dream Journal section, you can write down your dreams or anything you remember from your sleep. This helps you remember your dreams better and track your progress.
      </Text>

      <Text style={styles.sectionTitle}>7. Tips for Beginners</Text>
      <Text style={styles.text}>
        - You don’t need to change any settings—just use the switches to turn reminders on or off.
        {"\n"}- If you get stuck, try tapping around the app—nothing will break!
        {"\n"}- If you want to stop reminders, just turn the switch OFF.
        {"\n"}- You can always come back to these instructions from the navigation dropdown.
      </Text>

      <Text style={styles.sectionTitle}>8. How Dream Sign Analysis Works</Text>
      <Text style={styles.text}>
        When you write in your Dream Journal, the app looks for patterns and keywords in your entries. These patterns are called “dream signs”—things that often appear in your dreams, like certain people, places, feelings, or events. Over time, the app helps you notice what shows up most often in your dreams. This makes it easier to recognize when you’re dreaming, which can help you become lucid (aware that you’re dreaming) while you sleep.
      </Text>

      <Text style={styles.sectionTitle}>Need More Help?</Text>
      <Text style={styles.text}>
        If you’re confused or something isn’t working, try closing and reopening the app. If you still need help, ask a friend or family member to help you read these instructions.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d76d77',
    marginTop: 18,
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
    color: '#3a1c71',
  },
  italic: {
    fontStyle: 'italic',
    color: '#d76d77',
  },
  footer: {
    fontSize: 16,
    color: '#3a1c71',
    marginTop: 32,
    alignSelf: 'center',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 30,
  },
});