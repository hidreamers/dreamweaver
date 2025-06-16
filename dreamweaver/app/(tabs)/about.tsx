import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { LinearGradient } from 'expo-linear-gradient';

const aboutVideo = {
  id: 'about1',
  title: 'The Power of Dreams',
  videoUrl: 'https://youtu.be/X0-chVDW2Q4',
  image: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Jerimiah-Molfese-cover-image.jpg',
};

const { width } = Dimensions.get('window');

export default function AboutScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Animation values
  const spinValue = useRef(new Animated.Value(0)).current;
  const breatheValue = useRef(new Animated.Value(0)).current;

  // Start spinning animation
  const startSpinAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        easing: Animated.Easing ? Animated.Easing.linear : undefined,
        useNativeDriver: true,
      })
    ).start();
  };

  // Start breathing animation
  const startBreatheAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheValue, {
          toValue: 1,
          duration: 4000,
          easing: Animated.Easing ? Animated.Easing.inOut(Animated.Easing.ease) : undefined,
          useNativeDriver: true,
        }),
        Animated.timing(breatheValue, {
          toValue: 0,
          duration: 4000,
          easing: Animated.Easing ? Animated.Easing.inOut(Animated.Easing.ease) : undefined,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Create interpolated values for animations
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const breatheScale = breatheValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const handleOpenModal = () => {
    setModalVisible(true);
    setIsPlaying(true);
    startSpinAnimation();
    startBreatheAnimation();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1646' }}>
      <LinearGradient
        colors={['#3a1c71', '#d76d77', '#ffaf7b']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>About Jerimiah Molfese</Text>
        <Text style={styles.headerSubtitle}>Author • Wellness Innovator • Leadership Coach</Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Ionicons name="person-circle-outline" size={64} color="#3a1c71" />
            <Text style={styles.header}>About Jerimiah Molfese</Text>
          </View>
          <Text style={styles.bio}>
            Jerimiah Molfese is a transformational speaker, author, and visionary educator with over two decades of experience guiding individuals into the power of conscious dreaming, meditation, and inner healing. After overcoming a traumatic brain injury through lucid dreaming, visualization, and brain–heart coherence practices, Jerimiah dedicated his life to unlocking human potential through altered states of consciousness.
          </Text>
          <Text style={styles.bio}>
            His talks blend ancient spiritual wisdom, Egyptian alchemical principles, and cutting-edge insights into quantum manifestation. Jerimiah empowers audiences to awaken within their dreams—and within their lives—teaching practical methods to harness lucid dreaming, dream yoga, and intention-based healing to access the quantum realm of infinite possibilities.
          </Text>
          <Text style={styles.bio}>
            As the author of <Text style={styles.bookTitle}>Manifestation: Unlock the Secrets of Lucid Dreaming and Alchemy</Text>, <Text style={styles.bookTitle}>The Great Journey: Dying and What Lies Beyond</Text>, <Text style={styles.bookTitle}>My Adventures in Lucid Dreaming</Text>, and the <Text style={styles.bookTitle}>Guardians</Text> series, Jerimiah weaves profound personal experience with practical tools for transformation. His sessions are dynamic, deeply inspiring, and offer actionable techniques for personal growth, healing, and spiritual evolution.
          </Text>
        </View>

        <TouchableOpacity style={styles.trackCard} onPress={handleOpenModal}>
          <Image source={{ uri: aboutVideo.image }} style={styles.trackImage} />
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{aboutVideo.title}</Text>
          </View>
          <Ionicons name="play-circle" size={36} color="#3a1c71" style={styles.playIcon} />
        </TouchableOpacity>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsHeader}>Lucid Dreaming Tips</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Keep a dream journal and write down your dreams every morning.</Text>
            <Text style={styles.tipText}>• Perform reality checks throughout the day to increase awareness.</Text>
            <Text style={styles.tipText}>• Meditate regularly to improve focus and dream recall.</Text>
            <Text style={styles.tipText}>• Try the app's screensaver feature! When your device is idle, the screensaver gently fades in and displays inspirational quotes and calming visuals. This helps remind you to stay mindful and can even act as a cue for lucid dreaming. You can enable or customize the screensaver in the app settings.</Text>
          </View>
        </View>

        {/* Video Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setIsPlaying(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setIsPlaying(false);
                }}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <View style={styles.playerContainer}>
                <View style={styles.visualizerContainer}>
                  <Animated.View
                    style={[
                      styles.breatheCircle,
                      {
                        transform: [{ scale: breatheScale }],
                      },
                    ]}
                  />
                  <Animated.Image
                    source={{ uri: aboutVideo.image }}
                    style={[
                      styles.playerImage,
                      {
                        transform: [{ rotate: spin }],
                      },
                    ]}
                  />
                </View>
                <Text style={styles.playerTitle}>{aboutVideo.title}</Text>
                <View style={{ width: width - 40, aspectRatio: 16 / 9, marginBottom: 20 }}>
                  <YoutubePlayer
                    height={220}
                    play={isPlaying}
                    videoId={
                      aboutVideo.videoUrl.includes('v=')
                        ? aboutVideo.videoUrl.split('v=')[1].split('&')[0]
                        : aboutVideo.videoUrl.split('/').pop()
                    }
                    onChangeState={event => {
                      if (event === 'ended') setIsPlaying(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
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
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 18,
    backgroundColor: '#eee',
  },
  bio: {
    fontSize: 16,
    color: '#3a1c71',
    marginBottom: 18,
    textAlign: 'left', // changed from 'center'
    lineHeight: 22,
  },
  bookTitle: {
    color: '#d76d77',
    fontWeight: 'bold',
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22223b',
    borderRadius: 12,
    marginBottom: 18,
    padding: 10,
    elevation: 2,
  },
  trackImage: {
    width: 80,
    height: 45,
    borderRadius: 8,
    marginRight: 14,
  },
  trackInfo: {
    flex: 1,
    flexWrap: 'wrap',
  },
  trackTitle: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
  playIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  tipsCard: {
    backgroundColor: '#fffde7',
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
    elevation: 2,
  },
  tipsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 10,
    textAlign: 'center',
  },
  tipsList: {},
  tipText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
    lineHeight: 22,
    textAlign: 'left', // add this line
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  playerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visualizerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  breatheCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(215, 109, 119, 0.3)',
    position: 'absolute',
  },
  playerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  playerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
});