import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

const joeTracks = [
  {
    id: 'joe1',
    title: 'Sleep Meditation | Rewire Your Brain in 7 Nights',
    videoUrl: 'https://youtu.be/DW1T7kD8h2M',
    image: 'https://img.youtube.com/vi/DW1T7kD8h2M/hqdefault.jpg',
  },
  {
    id: 'joe2',
    title: 'Most Powerful Morning Prayer Meditation For Abundance & Gratitude',
    videoUrl: 'https://www.youtube.com/watch?v=v1-hLYJF0k4',
    image: 'https://img.youtube.com/vi/v1-hLYJF0k4/hqdefault.jpg',
  },
  {
    id: 'joe3',
    title: 'Sleep Hypnosis For Cord Cutting, Clearing Blocks',
    videoUrl: 'https://youtu.be/0Z4oXOIsUOY',
    image: 'https://img.youtube.com/vi/0Z4oXOIsUOY/hqdefault.jpg',
  },
  {
    id: 'joe4',
    title: 'Sleep Hypnosis For Trusting The Universe and The Flow Of Life',
    videoUrl: 'https://www.youtube.com/watch?v=f0UPj_VWEIg',
    image: 'https://img.youtube.com/vi/f0UPj_VWEIg/hqdefault.jpg',
  },
  {
    id: 'joe5',
    title: 'Sleep Hypnosis For Receiving Divine Guidance and Answers Within In A Lucid Dream (Guided Meditation)',
    videoUrl: 'https://www.youtube.com/watch?v=-Pl0WHLQf64',
    image: 'https://img.youtube.com/vi/-Pl0WHLQf64/hqdefault.jpg',
  },
  {
    id: 'joe6',
    title: 'Sleep Hypnosis For Unlocking Spiritual, Intuitive and Psychic Abilities (Floating Island Metaphor)',
    videoUrl: 'https://www.youtube.com/watch?v=tVQxxi3Pa6s',
    image: 'https://img.youtube.com/vi/tVQxxi3Pa6s/hqdefault.jpg',
  },
  {
    id: 'joe7',
    title: 'Sleep Hypnosis For Communicating With The Dream Characters In A Lucid Dream (Desert Oasis Metaphor)',
    videoUrl: 'https://www.youtube.com/watch?v=Wy9CWtGY_IM',
    image: 'https://img.youtube.com/vi/Wy9CWtGY_IM/hqdefault.jpg',
  },
  {
    id: 'joe8',
    title: 'Sleep Hypnosis For Meeting Your Future Self In A Lucid Dream (Time Capsule, Zen Garden Metaphor)',
    videoUrl: 'https://youtu.be/-mtF7t71Uq0',
    image: 'https://img.youtube.com/vi/-mtF7t71Uq0/hqdefault.jpg',
  },
  {
    id: 'joe9',
    title: 'Sleep Hypnosis For Connecting To Your Spirit Guide In A Lucid Dream (Cave and Hammock Imagery)',
    videoUrl: 'https://youtu.be/uApJexQXjNw',
    image: 'https://img.youtube.com/vi/uApJexQXjNw/hqdefault.jpg',
  },
  {
    id: 'joe10',
    title: 'Sleep Hypnosis For Astral Projection and Lucid Dreaming (Guided Meditation, Meet The Mentor, O.B.E)',
    videoUrl: 'https://youtu.be/tS9wSRXOBu0',
    image: 'https://img.youtube.com/vi/tS9wSRXOBu0/hqdefault.jpg',
  },
  {
    id: 'joe11',
    title: 'Sleep Hypnosis For Lucid Dreaming- Space, Wormhole (Full-Audio Immersion, Intense 360 Sound Effects)',
    videoUrl: 'https://youtu.be/pNoe5nPBuzk',
    image: 'https://img.youtube.com/vi/pNoe5nPBuzk/hqdefault.jpg',
  },
  {
    id: 'joe12',
    title: 'Sleep Hypnosis For Healing - Hiking To "Chakra Gardens" (Chakra Balancing and Emotional Healing)',
    videoUrl: 'https://www.youtube.com/watch?v=9b3MWr4HSzg',
    image: 'https://img.youtube.com/vi/9b3MWr4HSzg/hqdefault.jpg',
  },
  {
    id: 'joe13',
    title: 'Guided Meditation For Manifesting Your Dream Life (Sleep Hypnosis)',
    videoUrl: 'https://youtu.be/wj3Eq_jbVNM',
    image: 'https://img.youtube.com/vi/wj3Eq_jbVNM/hqdefault.jpg',
  },
  {
    id: 'joe14',
    title: 'Sleep Hypnosis For Lucid Dreaming - The Ocean Between Two Worlds (Includes Shamanic Drumming)',
    videoUrl: 'https://youtu.be/psI_cv4dIDg',
    image: 'https://img.youtube.com/vi/psI_cv4dIDg/hqdefault.jpg',
  },
  {
    id: 'joe15',
    title: 'Sleep Hypnosis For Opening the Heart Chakra (Gratitude, Compassion)',
    videoUrl: 'https://youtu.be/VTYc8eLNJ-g',
    image: 'https://img.youtube.com/vi/VTYc8eLNJ-g/hqdefault.jpg',
  },
  {
    id: 'joe16',
    title: 'Sleep Hypnosis For Lucid Dreaming (Remixed w/effects)',
    videoUrl: 'https://youtu.be/tz6t1t2z2hg',
    image: 'https://img.youtube.com/vi/tz6t1t2z2hg/hqdefault.jpg',
  },
  {
    id: 'joe17',
    title: 'Sleep Hypnosis for Lucid Dreaming (With Buffalo Drumming)',
    videoUrl: 'https://www.youtube.com/watch?v=Vu0XXQ1Tkjs',
    image: 'https://img.youtube.com/vi/Vu0XXQ1Tkjs/hqdefault.jpg',
  },
  {
    id: 'joe18',
    title: 'Sleep Hypnosis For Self Love (Shamanic Drumming)',
    videoUrl: 'https://youtu.be/iawekwFNk84',
    image: 'https://img.youtube.com/vi/iawekwFNk84/hqdefault.jpg',
  },
  {
    id: 'joe19',
    title: 'Hypnosis for Past Life Regression In a Lucid Dream',
    videoUrl: 'https://www.youtube.com/watch?v=8b7c_qCTHQg',
    image: 'https://img.youtube.com/vi/8b7c_qCTHQg/hqdefault.jpg',
  },
  {
    id: 'joe20',
    title: 'Hypnosis for Meeting Your Spirit Guide In a Lucid Dream (Guided Meditation, Inner Adviser)',
    videoUrl: 'https://youtu.be/ZxH0UEcMaFE',
    image: 'https://img.youtube.com/vi/ZxH0UEcMaFE/hqdefault.jpg',
  },
  {
    id: 'joe21',
    title: 'Guided Meditation - Meet Your Spirit Guide By Unlocking Your Third Eye!',
    videoUrl: 'https://youtu.be/VQ9SKnTmX-k',
    image: 'https://img.youtube.com/vi/VQ9SKnTmX-k/hqdefault.jpg',
  },
];

const { width } = Dimensions.get('window');

// Improved YouTube ID extraction (handles more cases)
function getYouTubeId(url: string) {
  // Try to match all common YouTube URL patterns
  const patterns = [
    /youtu\.be\/([^#\&\?]{11})/,
    /\?v=([^#\&\?]{11})/,
    /\/embed\/([^#\&\?]{11})/,
    /\/v\/([^#\&\?]{11})/,
    /\/watch\/([^#\&\?]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }
  // Fallback: try to find any 11-char string
  const fallback = url.match(/([a-zA-Z0-9_-]{11})/);
  return fallback ? fallback[1] : '';
}

export default function JoeDispenzaScreen() {
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
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

  // Handle track selection
  const handleSelectTrack = (track: any) => {
    setSelectedTrack(track);
    setModalVisible(true);
    setIsPlaying(true);
    startSpinAnimation();
    startBreatheAnimation();
  };

  // Handle modal close
  const handleCloseModal = () => {
    setModalVisible(false);
    setIsPlaying(false);
    setSelectedTrack(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Ionicons name="musical-notes-outline" size={64} color="#3a1c71" />
        <Text style={styles.header}>Joe Dispenza Meditations</Text>
      </View>
      <Text style={styles.text}>
        Explore a curated collection of Joe Dispenza meditations and resources to help you on your journey.
      </Text>
      {joeTracks.map(track => (
        <TouchableOpacity
          key={track.id}
          style={styles.trackCard}
          onPress={() => handleSelectTrack(track)}
        >
          <Image source={{ uri: track.image }} style={styles.trackImage} />
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{track.title}</Text>
          </View>
          <Ionicons name="play-circle" size={36} color="#3a1c71" style={styles.playIcon} />
        </TouchableOpacity>
      ))}

      {/* Video Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            {selectedTrack && (
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
                    source={{ uri: selectedTrack.image }}
                    style={[
                      styles.playerImage,
                      {
                        transform: [{ rotate: spin }],
                      },
                    ]}
                  />
                </View>
                <Text style={styles.playerTitle}>{selectedTrack.title}</Text>
                <View style={{ width: width - 40, aspectRatio: 16 / 9, marginBottom: 20 }}>
                  <YoutubePlayer
                    height={220}
                    play={isPlaying}
                    videoId={getYouTubeId(selectedTrack.videoUrl)}
                    onChangeState={event => {
                      if (event === 'ended') setIsPlaying(false);
                    }}
                  />
                </View>
                <View style={styles.meditationTips}>
                  <Text style={styles.tipsTitle}>Meditation Tips</Text>
                  <Text style={styles.tipText}>• Find a quiet, comfortable place</Text>
                  <Text style={styles.tipText}>• Focus on your breathing</Text>
                  <Text style={styles.tipText}>• Let thoughts come and go without judgment</Text>
                  <Text style={styles.tipText}>• If your mind wanders, gently bring it back</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ color: '#aaa', fontSize: 12, textAlign: 'center' }}>
          Disclaimer: All YouTube videos embedded in this app are publicly available and streamed directly from YouTube.
          We do not own or claim any rights to these videos. All content belongs to the original creators and is subject to YouTube’s Terms of Service.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#1a1646', flexGrow: 1 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 10, marginBottom: 10 },
  text: { color: '#fff', fontSize: 16, marginBottom: 10 },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22223b',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
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
    minWidth: 0,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 16,
    flexWrap: 'wrap',
    flexShrink: 1,
    width: '100%',
  },
  playIcon: {
    alignSelf: 'center',
    marginLeft: 10,
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
  meditationTips: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginTop: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 6,
  },
});