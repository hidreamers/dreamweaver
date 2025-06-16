import { Ionicons } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Animated, Appearance, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// Generate random stars and planets
const generateStars = (count = 60) =>
  Array.from({ length: count }).map((_, i) => ({
    key: i,
    left: Math.random() * width,
    top: Math.random() * height,
    size: Math.random() * 2.5 + 1,
    opacity: Math.random() * 0.7 + 0.3,
    color: Math.random() > 0.97 ? '#ffaf7b' : '#fff',
  }));

const planets = [
  { size: 36, left: width * 0.15, top: height * 0.18, color: '#d76d77' },
  { size: 22, left: width * 0.7, top: height * 0.25, color: '#3a1c71' },
  { size: 28, left: width * 0.8, top: height * 0.7, color: '#ffaf7b' },
];

export default function ScreenSaver({ onExit }: { onExit: () => void }) {
  const [time, setTime] = useState(new Date());
  const [stars, setStars] = useState(generateStars());
  const [fadeAnim] = useState(new Animated.Value(0.7));
  const colorScheme = Appearance.getColorScheme();

  useKeepAwake();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.7, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
    return () => clearInterval(timer);
  }, []);

  // Animate stars (twinkle)
  useEffect(() => {
    const twinkle = setInterval(() => setStars(generateStars()), 3500);
    return () => clearInterval(twinkle);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Choose gradient based on mode
  const gradientColors =
    colorScheme === 'dark'
      ? ['#0a043c', '#1a1646', '#3a1c71', '#22223b']
      : ['#3a1c71', '#d76d77', '#ffaf7b', '#fff'];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.8, y: 1 }}
      />
      {/* Planets */}
      {planets.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: p.size / 2,
            backgroundColor: p.color,
            opacity: 0.18,
            zIndex: 1,
          }}
        />
      ))}
      {/* Floating stars */}
      {stars.map(star => (
        <Animated.View
          key={star.key}
          style={{
            position: 'absolute',
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            borderRadius: star.size / 2,
            backgroundColor: star.color,
            opacity: star.opacity,
            zIndex: 2,
          }}
        />
      ))}
      {/* Glowing, smaller clock */}
      <View style={styles.centered}>
        <Animated.Text
          style={[
            styles.clock,
            {
              textShadowColor: '#fff',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 18,
              opacity: fadeAnim,
            },
          ]}
        >
          {timeString}
        </Animated.Text>
        <Text style={styles.slogan}>Dream Beyond the Stars</Text>
        <Ionicons name="planet" size={64} color="#ffaf7b" style={styles.planetIcon} />
        <Text style={styles.subtext}>
          {colorScheme === 'dark'
            ? 'Night Mode: Your cosmic journey awaits...'
            : 'Day Mode: Explore the universe of your mind.'}
        </Text>
      </View>
      {/* Exit button */}
      <TouchableOpacity style={styles.exitButton} onPress={onExit} activeOpacity={0.8}>
        <Ionicons name="close-circle" size={44} color="#fff" style={{ textShadowColor: '#3a1c71', textShadowRadius: 10 }} />
        <Text style={styles.exitText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  clock: {
    fontSize: 38,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
    marginTop: 10,
  },
  slogan: {
    fontSize: 26,
    color: '#fff',
    fontStyle: 'italic',
    textShadowColor: '#3a1c71',
    textShadowRadius: 10,
    marginTop: 8,
    marginBottom: 10,
  },
  planetIcon: {
    marginTop: 10,
    marginBottom: 10,
    textShadowColor: '#ffaf7b',
    textShadowRadius: 12,
  },
  subtext: {
    color: '#d1c4e9',
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  exitButton: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(58,28,113,0.7)',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: 'row',
    zIndex: 20,
  },
  exitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    textShadowColor: '#3a1c71',
    textShadowRadius: 8,
  },
});