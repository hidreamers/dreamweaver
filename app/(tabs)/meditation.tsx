import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Linking from 'expo-linking';
// If using Expo, install expo-file-system and expo-web-browser for PDF viewing
import * as WebBrowser from 'expo-web-browser';
import { Audio } from 'expo-av';

// Meditation tracks data
const meditationCategories = [
  {
    category: 'Didgeridoo',
    tracks: [
      {
        id: '1',
        title: 'How to Play the Didgeridoo Part 1: Find the Sweet Spot',
        videoUrl: 'https://youtu.be/_renfJmANio',
        image: 'https://img.youtube.com/vi/_renfJmANio/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Find-the-Sweet-Spot-with-the-Didgeridoo.pdf',
      },
      {
        id: '2',
        title: 'How to Play the Didgeridoo Part 2: Circular Breathing',
        videoUrl: 'https://youtu.be/lWj16EFByCM',
        image: 'https://img.youtube.com/vi/lWj16EFByCM/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Do-Circular-Breathing.pdf',
      },
      {
        id: '3',
        title: 'How to Play the Didgeridoo Part 3: Healing and Sounds',
        videoUrl: 'https://youtu.be/dTM83JE1rkc',
        image: 'https://img.youtube.com/vi/dTM83JE1rkc/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Play-Overtones-on-the-Didgeridoo.pdf',
      },
      {
        id: '4',
        title: 'How to Play the Didgeridoo Part 4: Build Energy for Healing (Part 1)',
        videoUrl: 'https://youtu.be/zXc0i0UOqaU',
        image: 'https://img.youtube.com/vi/zXc0i0UOqaU/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Play-the-Didgeridoo-Building-and-Directing-Energy-for-Healing.pdf',
      },
      {
        id: '5',
        title: 'Didgeridoo Lessons Part 4: Build Energy for Healing (Part 2)',
        videoUrl: 'https://youtu.be/3-btEDAdEtM',
        image: 'https://img.youtube.com/vi/3-btEDAdEtM/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Play-the-Didgeridoo-Building-and-Directing-Energy-for-Healing.pdf',
      },
    ],
  },
  {
    category: 'Lucid Dreaming and Dream Yoga',
    tracks: [
      {
        id: '6',
        title: 'Relaxation and Dream Yoga',
        videoUrl: 'https://youtu.be/jSHXax5LDIE',
        image: 'https://img.youtube.com/vi/jSHXax5LDIE/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Relaxation-Exercises-for-Lucid-Dreaming-and-Meditation.pdf',
      },
      {
        id: '7',
        title: 'What Is Dream Yoga?',
        videoUrl: 'https://youtu.be/yhVgYI1Er_4',
        image: 'https://img.youtube.com/vi/yhVgYI1Er_4/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/what-is-Dream-yoga.pdf',
      },
      {
        id: '8',
        title: 'Dream Signs',
        videoUrl: 'https://youtu.be/yhVgYI1Er_4t',
        image: 'https://www.hidreamers.com/wp-content/uploads/2025/06/dream-journal.png',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-signs-1.pdf',
      },
      {
        id: '9',
        title: 'The Weirdness of WILDs | Wake-Induced Lucid Dreaming Class',
        videoUrl: 'https://youtu.be/jnLVh1PgGmw',
        image: 'https://img.youtube.com/vi/jnLVh1PgGmw/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Weirdness-of-Wake-Induced-Lucid-Dreaming.pdf',
      },
      {
        id: '10',
        title: 'The Dream Lotus Technique Tibetan Dream Yoga',
        videoUrl: 'https://youtu.be/a0I9f8k-Yz4',
        image: 'https://img.youtube.com/vi/a0I9f8k-Yz4/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-Lotus-and-Flame-Technique.pdf',
      },
      {
        id: '11',
        title: 'Dream Signs: Doorways to Lucidity',
        videoUrl: 'https://youtu.be/z_eTrZssaJQ',
        image: 'https://img.youtube.com/vi/z_eTrZssaJQ/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-signs-1.pdf',
      },
      {
        id: '12',
        title: 'What is Lucid dreaming and Dream Yoga',
        videoUrl: 'https://youtu.be/z33AMyp7sXc',
        image: 'https://img.youtube.com/vi/z33AMyp7sXc/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/introduction-to-lucid-dreaming.pdf',
      },
      {
        id: '13',
        title: '5 Different Relaxation Exercises Dream Yoga step 3',
        videoUrl: 'https://youtu.be/JmYiKGjqIoo',
        image: 'https://img.youtube.com/vi/JmYiKGjqIoo/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Relaxation-Exercises-for-Lucid-Dreaming-and-Meditation.pdf',
      },
      {
        id: '14',
        title: 'The Weirdness of WILDs Dream Yoga Step 2',
        videoUrl: 'https://youtu.be/xEe4OyFcoc4',
        image: 'https://img.youtube.com/vi/xEe4OyFcoc4/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Weirdness-of-Wake-Induced-Lucid-Dreaming.pdf',
      },
      {
        id: '15',
        title: 'Staying Lucid and Applications/Conclusion step 7',
        videoUrl: 'https://youtu.be/Le9a9-oxTCQ',
        image: 'https://img.youtube.com/vi/Le9a9-oxTCQ/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Staying-lucid-1.pdf',
      },
      {
        id: '16',
        title: 'Lucid Dreaming Reflection Intention Technique Step 5',
        videoUrl: 'https://youtu.be/X1GyUQRhTLI',
        image: 'https://img.youtube.com/vi/X1GyUQRhTLI/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Reflection-Intention-Exercise.pdf',
      },
      {
        id: '17',
        title: 'Lucid Dreaming Autosuggestion Technique Step 3',
        videoUrl: 'https://youtu.be/aoRKFasR7qY',
        image: 'https://img.youtube.com/vi/aoRKFasR7qY/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Autosuggestion-Technique-1.pdf',
      },
    ],
  },
  {
    category: 'Guided Meditations',
    tracks: [
      {
        id: '18',
        title: 'Deep Healing Meditation: Didgeridoo, Theta Waves & 61 Points of Relaxation',
        videoUrl: 'https://youtu.be/U-OoFVeq16I?si=rAQQjaIKhhTH3P7v',
        image: 'https://img.youtube.com/vi/U-OoFVeq16I/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/path/to/your/pdf.pdf',
      },
      {
        id: '19',
        title: '61 Point Relaxation',
        videoUrl: 'https://youtu.be/4-yWJrL1Wyc?si=8wemevCjfWowUVdf',
        image: 'https://img.youtube.com/vi/4-yWJrL1Wyc/hqdefault.jpg',
      },
      {
        id: '20',
        title: 'Open Your Heart',
        videoUrl: 'https://youtu.be/q8xrwOck07Q?si=mXBkqjvKta83JCIG',
        image: 'https://img.youtube.com/vi/q8xrwOck07Q/hqdefault.jpg',
      },
      {
        id: '21',
        title: 'I Am Connected Meditation',
        description: `“I Am Connected” is a powerful guided meditation designed to help you realign with your higher self and awaken your inner knowing. This practice blends deeply relaxing theta wave binaural beats with soul-activating affirmations to create a sacred space for spiritual connection, healing, and inner clarity.

As the binaural tones gently shift your brain into the theta state—the gateway to deep meditation, intuition, and spiritual insight—you’ll be guided to release resistance and tune in to the frequency of your higher power. The affirmations woven throughout the session act as energetic keys, opening channels to divine intelligence and reminding you that you are never alone.

Whether you're seeking guidance, inner peace, or a deeper connection to your purpose, this meditation will help you feel grounded, aligned, and supported.`,
        videoUrl: 'https://youtu.be/9JLsmoTqUSQ',
        image: 'https://img.youtube.com/vi/9JLsmoTqUSQ/hqdefault.jpg',
      },
      {
        id: '22',
        title: 'Lucid Dreaming Audio Meditation',
        audioFile: 'https://www.hidreamers.com/wp-content/uploads/2025/06/lucid_Dreaming.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2025/05/ChatGPT-Image-May-10-2025-11_13_39-AM.png',
        duration: 30, // <-- add the duration in minutes
      },
      {
        id: '23',
        title: 'Healing Spirit Guide with Lucid Dreaming',
        audioFile: 'https://www.jerimiahmolfese.com/Healing%20Spirit%20Guid%20with%20Lucid%20Dreaming.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/mnucpb0w.png',
        description: 'A soothing meditation to connect with your spirit guide and enhance your lucid dreaming journey. Let healing energy guide you through your dreams for deeper insight and peace.',
        duration: 30,
      },
      {
        id: '24',
        title: 'Theta with I Am Light Affirmations',
        audioFile: 'https://www.jerimiahmolfese.com/Theta%20with%20I%20am%20Light%20Affermations.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/ypf109d9.png',
        description: "Immerse yourself in theta waves and uplifting 'I Am Light' affirmations. This meditation helps you relax deeply, raise your vibration, and prepare your mind for lucid dreaming.",
        duration: 30,
      },
    ],
  },
  {
    category: 'PDF Lessons',
    tracks: [
      {
        id: 'pdf1',
        title: 'Introduction to Lucid Dreaming',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/introduction-to-lucid-dreaming.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf2',
        title: 'Dream Signs',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-signs-1.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf3',
        title: 'The Autosuggestion Technique',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Autosuggestion-Technique-1.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf4',
        title: 'Prospective Memory Development',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Prospective-Memory-Development-1.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf5',
        title: 'Reflection Intention Exercise',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Reflection-Intention-Exercise.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf6',
        title: 'Mnemonic Induction of Lucid Dreams (MILD)',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Mnemonic-Induction-of-Lucid-Dreams-MILD.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf7',
        title: 'Staying Lucid',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Staying-lucid-1.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf8',
        title: 'What is Dream Yoga?',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/what-is-Dream-yoga.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf9',
        title: 'The Weirdness of Wake-Induced Lucid Dreaming',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Weirdness-of-Wake-Induced-Lucid-Dreaming.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf10',
        title: 'Relaxation Exercises for Lucid Dreaming and Meditation',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Relaxation-Exercises-for-Lucid-Dreaming-and-Meditation.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf11',
        title: 'Dream Lotus and Flame Technique',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-Lotus-and-Flame-Technique.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
      {
        id: 'pdf12',
        title: 'Flip Your Hands and Fly',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Flip-Your-Hands-and-Fly.pdf',
        image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
        duration: 0,
      },
    ],
  },
];

const { width } = Dimensions.get('window');

export default function Meditation() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [audioModalVisible, setAudioModalVisible] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [sound, setSound] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Animation for spinning image
  const spinValue = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible && selectedTrack?.videoUrl) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
      spinValue.setValue(0);
    }
  }, [modalVisible, selectedTrack]);

  useEffect(() => {
    if (modalVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breatheAnim, {
            toValue: 1,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(breatheAnim, {
            toValue: 0,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      breatheAnim.stopAnimation();
      breatheAnim.setValue(0);
    }
  }, [modalVisible]);

  // Cleanup audio when modal closes or component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const breatheScale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const handlePress = (med: any) => {
    if (med.videoUrl) {
      setSelectedTrack(med);
      setModalVisible(true);
    } else if (med.pdf) {
      setPdfUrl(med.pdf);
      setPdfModalVisible(true);
    } else if (med.audioFile) {
      setAudioTrack(med);
      setAudioModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTrack(null);
    setIsPlaying(false);
  };

  const handleClosePdfModal = () => {
    setPdfModalVisible(false);
    setPdfUrl(null);
  };

  const handleCloseAudioModal = async () => {
    setAudioModalVisible(false);
    setAudioTrack(null);
    setIsAudioPlaying(false);
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  const playPauseAudio = async () => {
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioTrack.audioFile },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsAudioPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsAudioPlaying(false);
          setSound(null);
        }
      });
    } else if (isAudioPlaying) {
      await sound.pauseAsync();
      setIsAudioPlaying(false);
    } else {
      await sound.playAsync();
      setIsAudioPlaying(true);
    }
  };

  // Helper to extract YouTube video ID
  function getYoutubeId(url: string) {
    if (!url) return '';
    // Try to match all common YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  // Open PDF in browser (Expo WebBrowser)
  const openPdfInBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#3a1c71', '#d76d77', '#ffaf7b']} style={styles.header}>
        <Text style={styles.headerTitle}>Meditations</Text>
        <Text style={styles.headerSubtitle}>
          Enhance your lucid dreaming journey with these guided meditations.
        </Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {meditationCategories.map((category, catIdx) => (
          <View key={category.category}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            {category.tracks.map((med) => (
              <TouchableOpacity
                key={med.id}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() => handlePress(med)}
              >
                {med.image ? (
                  <Image source={{ uri: med.image }} style={styles.image} />
                ) : null}
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{med.title}</Text>
                  {med.description ? (
                    <Text style={styles.description}>{med.description}</Text>
                  ) : null}
                  <View style={styles.row}>
                    {med.duration ? (
                      <>
                        <Ionicons name="time-outline" size={16} color="#b06ab3" />
                        <Text style={styles.duration}>{med.duration} min</Text>
                      </>
                    ) : null}
                    {med.pdf ? (
                      <>
                        <Ionicons name="document-text-outline" size={16} color="#3a1c71" style={{ marginLeft: 10 }} />
                        <Text style={styles.pdfText}>PDF</Text>
                      </>
                    ) : null}
                    {med.videoUrl ? (
                      <>
                        <Ionicons name="logo-youtube" size={16} color="#d76d77" style={{ marginLeft: 10 }} />
                        <Text style={styles.pdfText}>Video</Text>
                      </>
                    ) : null}
                  </View>
                  {/* --- Add this block for a visible PDF button --- */}
                  {med.pdf && (
                    <TouchableOpacity
                      style={{
                        marginTop: 8,
                        backgroundColor: '#d76d77',
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        alignSelf: 'flex-start',
                      }}
                      onPress={() => openPdfInBrowser(med.pdf)}
                    >
                      <Text style={{ color: '#fff', fontWeight: 'bold' }}>View PDF Lesson</Text>
                    </TouchableOpacity>
                  )}
                  {/* --- End PDF button block */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Video Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentFixed}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            {selectedTrack && selectedTrack.videoUrl ? (
              <>
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                  <Animated.View
                    style={[
                      styles.breatheCircle,
                      { transform: [{ scale: breatheScale }] },
                    ]}
                  />
                  <Animated.Image
                    source={{ uri: selectedTrack.image }}
                    style={[
                      styles.playerImage,
                      { transform: [{ rotate: spin }] },
                    ]}
                  />
                </View>
                <Text style={styles.playerTitle}>{selectedTrack.title}</Text>
                <View style={{ width: width - 40, aspectRatio: 16 / 9, marginBottom: 20, alignSelf: 'center' }}>
                  <YoutubePlayer
                    height={220}
                    play={isPlaying}
                    videoId={getYoutubeId(selectedTrack.videoUrl)}
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
              </>
            ) : (
              <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3a1c71" />
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* PDF Modal (opens in browser for best compatibility) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={pdfModalVisible}
        onRequestClose={handleClosePdfModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContentFixed, { alignItems: 'center', justifyContent: 'center', height: 200 }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePdfModal}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
              Opening PDF in your browser...
            </Text>
            <ActivityIndicator size="large" color="#3a1c71" />
            {pdfUrl && openPdfInBrowser(pdfUrl) && setTimeout(handleClosePdfModal, 1000)}
          </View>
        </View>
      </Modal>

      {/* Audio Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={audioModalVisible}
        onRequestClose={handleCloseAudioModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContentFixed, { alignItems: 'center', justifyContent: 'center' }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseAudioModal}
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            {audioTrack ? (
              <>
                <Image
                  source={{ uri: audioTrack.image }}
                  style={styles.playerImage}
                />
                <Text style={styles.playerTitle}>{audioTrack.title}</Text>
                {audioTrack.description ? (
                  <Text style={[styles.description, { color: '#fff', marginBottom: 16, textAlign: 'center' }]}>
                    {audioTrack.description}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#3a1c71',
                    borderRadius: 30,
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    marginTop: 20,
                  }}
                  onPress={playPauseAudio}
                >
                  <Text style={{ color: '#fff', fontSize: 18 }}>
                    {isAudioPlaying ? 'Pause' : 'Play'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <ActivityIndicator size="large" color="#3a1c71" />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 8,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 10,
    marginTop: 18,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 18,
    backgroundColor: '#eee',
  },
  textContainer: { flex: 1 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  duration: {
    fontSize: 13,
    color: '#b06ab3',
    marginLeft: 5,
  },
  pdfText: {
    fontSize: 13,
    color: '#3a1c71',
    marginLeft: 3,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentFixed: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 50,
    padding: 20,
    alignSelf: 'center',
    width: width - 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  playerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  breatheCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: '50%',
    left: '50%',
    marginTop: -70,
    marginLeft: -70,
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  meditationTips: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffaf7b',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
});
