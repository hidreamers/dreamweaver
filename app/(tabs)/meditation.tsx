import React, { useState, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Modal,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Linking from 'expo-linking';

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
        image: 'https://img.youtube.com/vi/yhVgYI1Er_4t/hqdefault.jpg',
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
        image: 'https://www.hidreamers.com/wp-content/uploads/2025/06/lucid_dreaming_audio_cover.jpg',
        duration: 30, // <-- add the duration in minutes
      },
      {
        id: '23',
        title: 'Healing Spirit Guide with Lucid Dreaming',
        audioFile: 'https://www.jerimiahmolfese.com/Healing%20Spirit%20Guid%20with%20Lucid%20Dreaming.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2025/06/lucid_dreaming_audio_cover.jpg',
        description: 'A soothing meditation to connect with your spirit guide and enhance your lucid dreaming journey. Let healing energy guide you through your dreams for deeper insight and peace.',
        duration: 30,
      },
      {
        id: '24',
        title: 'Theta with I Am Light Affirmations',
        audioFile: 'https://www.jerimiahmolfese.com/Theta%20with%20I%20am%20Light%20Affermations.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2025/06/lucid_dreaming_audio_cover.jpg',
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

export default function MeditationScreen() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Animation values
  const spinValue = useRef(new Animated.Value(0)).current;
  const breatheValue = useRef(new Animated.Value(0)).current;
  
  // Start spinning animation
  const startSpinAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
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
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(breatheValue, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
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

  // Load and play sound
  const loadSound = async (track) => {
    if (sound) {
      await sound.unloadAsync();
    }
    try {
      if (track.audioFile) {
        const { sound: newSound, status } = await Audio.Sound.createAsync(
          { uri: track.audioFile },
          { shouldPlay: false }
        );
        setSound(newSound);
        setDuration(Math.floor(status.durationMillis / 1000 / 60)); // duration in minutes
        setPosition(0);
        return newSound;
      }
      // ...dummy fallback for video tracks...
    } catch (error) {
      console.error('Error loading sound', error);
    }
  };

  const playPauseSound = async () => {
    if (!sound) return;
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      startSpinAnimation();
      startBreatheAnimation();
      await sound.playAsync();
      
      // Simulate progress updates
      if (!progressInterval.current) {
        progressInterval.current = setInterval(() => {
          setPosition((prev) => {
            if (prev >= duration * 1000) {
              clearInterval(progressInterval.current);
              setIsPlaying(false);
              return 0;
            }
            return prev + 1000;
          });
        }, 1000);
      }
    }
    
    setIsPlaying(!isPlaying);
  };

  // Progress interval ref
  const progressInterval = useRef(null);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  // Format time for display
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle track selection
  const handleSelectTrack = async (track) => {
    setSelectedTrack(track);
    setModalVisible(true);

    if (track.audioFile) {
      await loadSound(track);
      setIsPlaying(false);
    } else if (track.videoUrl) {
      setIsPlaying(true); // Start video in playing state
    }
  };

  // Handle seeking
  const handleSeek = async (value) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value * 1000);
    }
  };

  // Render meditation track item
  const renderTrackItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.trackCard}
      onPress={() => handleSelectTrack(item)}
    >
      <Image source={{ uri: item.image }} style={styles.trackImage} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <View style={styles.trackMeta}>
          {item.duration ? (
            <>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.trackDuration}>{item.duration} min</Text>
            </>
          ) : null}
        </View>
      </View>
      {item.pdf && !item.audioFile && !item.videoUrl ? (
        <Ionicons name="document-text-outline" size={36} color="#d76d77" style={styles.playIcon} />
      ) : (
        <Ionicons name="play-circle" size={36} color="#3a1c71" style={styles.playIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3a1c71', '#d76d77', '#ffaf7b']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Meditation</Text>
        <Text style={styles.headerSubtitle}>Enhance your lucid dreaming practice</Text>
      </LinearGradient>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Why Meditation Helps</Text>
        <Text style={styles.infoText}>
          Regular meditation increases mindfulness and awareness, which are essential skills for lucid dreaming. 
          It also improves sleep quality and dream recall.
        </Text>
      </View>

      <FlatList
        data={meditationCategories}
        keyExtractor={item => item.category}
        renderItem={({ item: category }) => (
          <View style={{ marginBottom: 32 }}>
            <Text style={styles.sectionTitle}>{category.category}</Text>
            {category.tracks.map(track => (
              <View key={track.id} style={{ marginBottom: 12 }}>
                {renderTrackItem({ item: track })}
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
      />

      {/* Meditation Player Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsPlaying(false);
          if (sound) {
            sound.pauseAsync();
          }
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
          }
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                setIsPlaying(false);
                if (sound) {
                  sound.pauseAsync();
                }
                if (progressInterval.current) {
                  clearInterval(progressInterval.current);
                  progressInterval.current = null;
                }
              }}
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
                        transform: [
                          { scale: breatheScale }
                        ]
                      }
                    ]}
                  />
                  <Animated.Image 
                    source={{ uri: selectedTrack.image }}
                    style={[
                      styles.playerImage,
                      {
                        transform: [
                          { rotate: spin }
                        ]
                      }
                    ]}
                  />
                </View>
                <Text style={styles.playerTitle}>{selectedTrack.title}</Text>
                {selectedTrack.videoUrl ? (
                  <View style={{ width: width - 40, aspectRatio: 16 / 9, marginBottom: 20 }}>
                    <YoutubePlayer
                      height={220}
                      play={isPlaying}
                      videoId={
                        selectedTrack.videoUrl.includes("v=")
                          ? selectedTrack.videoUrl.split("v=")[1].split("&")[0]
                          : selectedTrack.videoUrl.split("/").pop()
                      }
                      onChangeState={event => {
                        if (event === "ended") setIsPlaying(false);
                      }}
                    />
                  </View>
                ) : (
                  <>
                    <View style={styles.progressContainer}>
                      <Text style={styles.timeText}>{formatTime(position)}</Text>
                      <Slider
                        style={styles.progressBar}
                        minimumValue={0}
                        maximumValue={duration}
                        value={position / 1000}
                        onValueChange={handleSeek}
                        minimumTrackTintColor="#d76d77"
                        maximumTrackTintColor="#d1d1d1"
                        thumbTintColor="#3a1c71"
                      />
                      <Text style={styles.timeText}>{formatTime(duration * 1000)}</Text>
                    </View>
                    <View style={styles.controlsContainer}>
                      <TouchableOpacity style={styles.controlButton}>
                        <Ionicons name="play-skip-back" size={24} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.playPauseButton}
                        onPress={playPauseSound}
                      >
                        <Ionicons 
                          name={isPlaying ? "pause" : "play"} 
                          size={32} 
                          color="#fff" 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.controlButton}>
                        <Ionicons name="play-skip-forward" size={24} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {selectedTrack?.pdf && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#3a1c71',
                      borderRadius: 8,
                      padding: 10,
                      marginVertical: 12,
                      alignSelf: 'center'
                    }}
                    onPress={() => Linking.openURL(selectedTrack.pdf)}
                  >
                    <Ionicons name="document-text-outline" size={24} color="#fff" />
                    <Text style={{ color: '#fff', marginLeft: 8, fontWeight: 'bold' }}>View Lesson PDF</Text>
                  </TouchableOpacity>
                )}
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
    </View>
  );
}

const { width } = Dimensions.get('window');

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
  infoCard: {
    backgroundColor: '#f0e6ff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
    color: '#333',
  },
  trackList: {
    padding: 16,
  },
  trackCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trackImage: {
    width: 100,
    height: 100,
  },
  trackInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  trackDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  trackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackDuration: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  playIcon: {
    alignSelf: 'center',
    marginRight: 12,
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
  playerDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 40,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    width: 40,
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d76d77',
    justifyContent: 'center',
    alignItems: 'center',
  },
  meditationTips: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
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
