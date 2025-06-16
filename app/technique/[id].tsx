import React, { useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function TechniqueDetailScreen() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Sample technique data
  const techniques = [
    {
      id: '1',
      name: 'MILD Technique',
      description: 'The Mnemonic Induction of Lucid Dreams (MILD) technique was developed by Dr. Stephen LaBerge. It involves setting an intention to remember that you are dreaming when you are in a dream state.',
      steps: [
        {
          title: 'Reality Testing',
          description: 'Throughout the day, perform reality checks to build the habit of questioning your reality. Ask yourself "Am I dreaming?" and perform a test like trying to push your finger through your palm or checking text twice to see if it changes.',
        },
        {
          title: 'Dream Recall',
          description: 'Keep a dream journal and write down your dreams immediately upon waking. This improves your dream recall and helps you recognize dream patterns.',
        },
        {
          title: 'Set Intention',
          description: 'As you\'re falling asleep, repeat a mantra like "The next time I\'m dreaming, I\'ll remember I\'m dreaming." Visualize yourself becoming lucid in a recent dream.',
        },
        {
          title: 'Visualization',
          description: 'Imagine yourself in a dream and becoming aware that you are dreaming.',
        },
        {
          title: 'Maintain Awareness',
          description: 'Try to maintain awareness as you fall asleep. This creates a smooth transition from waking consciousness to dream consciousness.',
        }
      ]
    },
    {
      id: '2',
      name: 'Reality Testing',
      description: 'Reality testing is a technique that helps you distinguish between the dream state and waking reality. By regularly questioning your reality during the day, you build a habit that carries over into your dreams.',
      steps: [
        {
          title: 'Choose Your Tests',
          description: 'Select 2-3 reality tests that work well for you. Common tests include: pushing your finger through your palm, checking text or numbers twice to see if they change, looking at your hands to see if they look normal, and trying to breathe while pinching your nose.',
        },
        {
          title: 'Set Reminders',
          description: 'Set up regular reminders throughout the day to perform your reality checks. You can use this app\'s notification system or place visual cues in your environment.',
        },
        {
          title: 'Question Reality',
          description: 'When performing a reality check, genuinely question whether you might be dreaming. Don\'t just go through the motions—really consider the possibility.',
        },
        {
          title: 'Be Consistent',
          description: 'Perform at least 10 reality checks every day. Consistency is key to building the habit.',
        },
        {
          title: 'Check During Oddities',
          description: 'Make it a habit to perform reality checks whenever something unusual or dreamlike happens in your waking life.',
        }
      ]
    },
    {
      id: '3',
      name: 'Wake Back to Bed',
      description: 'Wake Back to Bed (WBTB) is a powerful technique that takes advantage of your natural sleep cycles to increase your chances of having a lucid dream. It involves waking up after 5-6 hours of sleep, staying awake briefly, then returning to sleep.',
      steps: [
        {
          title: 'Set an Alarm',
          description: 'Set an alarm to wake you up after 5-6 hours of sleep. This timing is important as it coincides with longer REM periods.',
        },
        {
          title: 'Wake Up',
          description: 'When your alarm goes off, get out of bed and stay awake for 20-60 minutes. The optimal duration varies by person.',
        },
        {
          title: 'Engage Your Mind',
          description: 'During your wake time, do something that engages your mind but isn\'t too stimulating. Reading about lucid dreaming or practicing visualization works well.',
        },
        {
          title: 'Set Intention',
          description: 'As you prepare to go back to sleep, set a strong intention to become lucid in your dreams. Repeat a mantra like "I will realize I\'m dreaming."',
        },
        {
          title: 'Return to Sleep',
          description: 'Go back to sleep while maintaining awareness. You can combine this with other techniques like MILD for even better results.',
        }
      ]
    }
  ];
  
  const technique = techniques.find(t => t.id === id);
  
  if (!technique) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Technique not found</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.primary}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const handleNextStep = () => {
    if (currentStep < technique.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colorScheme === 'dark' ? 
          [Colors.dark.gradientStart, Colors.dark.gradientEnd] : 
          [Colors.light.gradientStart, Colors.light.gradientEnd]
        }
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backIcon} 
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        
        {/* <Image source={technique.image} style={styles.headerImage} /> */}
        <Text style={styles.title}>{technique.name}</Text>
      </LinearGradient>
      
      <ScrollView style={styles.content}>
        <View style={styles.section} lightColor={Colors.light.card} darkColor={Colors.dark.card}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.description}>{technique.description}</Text>
        </View>
        
        <View style={styles.section} lightColor={Colors.light.card} darkColor={Colors.dark.card}>
          <View style={styles.stepHeader} lightColor="transparent" darkColor="transparent">
            <Text style={styles.sectionTitle}>Step {currentStep + 1}: {technique.steps[currentStep].title}</Text>
            <Text style={styles.stepCounter}>{currentStep + 1}/{technique.steps.length}</Text>
          </View>
          
          <Text style={styles.stepDescription}>
            {technique.steps[currentStep].description}
          </Text>
          
          <View style={styles.stepNavigation} lightColor="transparent" darkColor="transparent">
            <TouchableOpacity 
              style={[
                styles.navButton,
                currentStep === 0 && styles.disabledButton
              ]}
              onPress={handlePrevStep}
              disabled={currentStep === 0}
              lightColor={currentStep === 0 ? '#e0e0e0' : Colors.light.primary}
              darkColor={currentStep === 0 ? '#333' : Colors.dark.primary}
            >
              <FontAwesome name="arrow-left" size={16} color="#fff" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.navButton,
                currentStep === technique.steps.length - 1 && styles.disabledButton
              ]}
              onPress={handleNextStep}
              disabled={currentStep === technique.steps.length - 1}
              lightColor={currentStep === technique.steps.length - 1 ? '#e0e0e0' : Colors.light.primary}
              darkColor={currentStep === technique.steps.length - 1 ? '#333' : Colors.dark.primary}
            >
              <Text style={styles.navButtonText}>Next</Text>
              <FontAwesome name="arrow-right" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.progressContainer} lightColor="transparent" darkColor="transparent">
          {technique.steps.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.progressDot,
                { 
                  backgroundColor: index === currentStep 
                    ? Colors[colorScheme ?? 'light'].primary 
                    : '#e0e0e0' 
                }
              ]}
              onPress={() => setCurrentStep(index)}
            />
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={() => {
            // In a real app, this would start a guided practice session
            router.push('/');
          }}
          lightColor={Colors.light.primary}
          darkColor={Colors.dark.primary}
        >
          <Text style={styles.startButtonText}>Start Practice</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepCounter: {
    fontSize: 14,
    opacity: 0.7,
  },
  stepDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  stepNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 24,
  },
  backButton: {
    paddingVertical: 16,
    borderRadius: 12,
    margin: 16,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
