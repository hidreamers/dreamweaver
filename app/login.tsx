import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Text style={styles.clock}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </Text>
  );
}

export default function LoginScreen({ navigation }) {
  useKeepAwake();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Clock />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <Text style={styles.title}>Welcome to Dream Portal</Text>
      <Text style={styles.description}>
        Step into a world where your dreams become your playground.{"\n\n"}
        Dream Portal is your gateway to lucid dreaming, meditation, and inner exploration.{"\n\n"}
        🌙 Track your dreams and unlock hidden patterns.{"\n"}
        🧘‍♂️ Relax with guided meditations and sound journeys designed to calm your mind and open the door to conscious dreaming.{"\n"}
        📚 Learn ancient dream yoga techniques and discover practical lessons to awaken your nights and transform your days.{"\n"}
        🎵 Access exclusive audio and video content to deepen your practice, anytime, anywhere.{"\n\n"}
        Whether you’re a curious beginner or a seasoned oneironaut, Dream Portal gives you the tools to awaken within your dreams and bring more clarity, creativity, and peace into your waking life.{"\n\n"}
        Ready to begin your lucid journey? Tap below and let the adventure begin!
      </Text>
      <View style={styles.section}>
        <Image
          source={{ uri: 'https://www.hidreamers.com/wp-content/uploads/2025/05/ChatGPT-Image-May-6-2025-12_36_43-PM.png' }}
          style={styles.lessonImage}
        />
        <Text style={styles.sectionTitle}>Didgeridoo Lessons</Text>
        <Text style={styles.sectionText}>
          Discover the ancient art of the Didgeridoo! Our step-by-step video lessons will teach you how to play, breathe, and use the Didgeridoo for healing and meditation. Perfect for beginners and experienced players alike.
        </Text>
      </View>
      <View style={styles.section}>
        <Image
          source={{ uri: 'https://www.hidreamers.com/wp-content/uploads/2025/06/dream-journal.png' }}
          style={styles.lessonImage}
        />
        <Text style={styles.sectionTitle}>Start Your Lucid Journey</Text>
        <Text style={styles.sectionText}>
          Track your dreams, learn ancient dream yoga, and access exclusive meditations and audio content. Awaken within your dreams and transform your nights!
        </Text>
      </View>
      <Button
        title="Start Your Journey Now"
        onPress={() => navigation.navigate('Home')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  clock: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 16,
    letterSpacing: 2,
    textShadowColor: '#b4aee8',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  lessonImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 6,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
});