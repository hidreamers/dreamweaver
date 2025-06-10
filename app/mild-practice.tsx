import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Animated,
  Dimensions,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDreamStore } from '../store/dreamStore';


const { width } = Dimensions.get('window');

export default function MILDPracticeScreen() {
  const { dreams } = useDreamStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [affirmation, setAffirmation] = useState('');
  const [dreamSigns, setDreamSigns] = useState<string[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Get dream signs from recent dreams
  useEffect(() => {
    const allDreamSigns = dreams
      .flatMap(dream => dream.dreamSigns || [])
      .filter(Boolean);
    
    // Get unique dream signs
    const uniqueDreamSigns = [...new Set(allDreamSigns)];
    
    // Take up to 5 most common dream signs
    setDreamSigns(uniqueDreamSigns.slice(0, 5));
  }, [dreams]);
  
  // Fade in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);
  
  // Steps for MILD practice
  const steps = [
    {
      title: 'Prepare for MILD Practice',
      description: 'The MILD (Mnemonic Induction of Lucid Dreams) technique was developed by Dr. Stephen LaBerge. It involves setting an intention to remember that you are dreaming while in a dream.',
      image: 'https://www.hidreamers.com/wp-content/uploads/2025/05/ChatGPT-Image-May-6-2025-12_39_55-PM.png',
      instruction: 'Find a quiet, comfortable place where you can relax. This technique works best when you\'re already sleepy and ready for bed.',
    },
    {
      title: 'Recall a Recent Dream',
      description: 'Think about a recent dream you had. Try to remember as many details as possible.',
      image: 'https://www.hidreamers.com/wp-content/uploads/2025/05/ChatGPT-Image-May-6-2025-12_36_43-PM.png',
      instruction: 'Close your eyes and visualize yourself back in that dream. What did you see? How did you feel? Were there any unusual elements that could have been dream signs?',
    },
    {
      title: 'Recognize Dream Signs',
      description: 'Dream signs are recurring elements, themes, or feelings that appear in your dreams. They can be used as triggers to become lucid.',
      image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/mpilo86k.png',
      instruction: 'Based on your dream journal, we\'ve identified these potential dream signs. Remember to look for them in future dreams:',
    },
    {
      title: 'Set Your Intention',
      description: 'Create a clear, positive affirmation that you will repeat to yourself.',
      image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/DALL·E-2024-01-25-14.25.49-The-image-captures-the-moment-when-Seths-dream-adventure-begins-as-he-lies-in-bed.-Seth-remembers-his-dads-lessons-about-dreaming-and-imagines-a-glo.png',
      instruction: 'Type your affirmation below, or use our suggestion: "The next time I\'m dreaming, I will remember I\'m dreaming."',
      inputPlaceholder: 'The next time I\'m dreaming, I will remember I\'m dreaming.',
    },
    {
      title: 'Visualize Becoming Lucid',
      description: 'Imagine yourself in a dream, recognizing a dream sign, and becoming lucid.',
      image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/DALL·E-2024-01-25-14.38.07-The-image-captures-the-moment-of-Seths-incredible-dream-journey-to-space.-Seth-lies-in-bed-eyes-closed-determined-to-experience-a-dream.-He-realize.png',
      instruction: 'Close your eyes and vividly imagine yourself in the dream you recalled earlier. This time, imagine yourself recognizing that you\'re dreaming. Feel the excitement and clarity of becoming lucid.',
    },
    {
      title: 'Repeat Your Affirmation',
      description: 'As you fall asleep, repeat your affirmation.',
      image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/DALL·E-2024-01-25-17.23.48-As-I-lay-in-my-cozy-room-bathed-in-the-silvery-light-of-the-full-moon-my-thoughts-couldnt-help-but-drift-to-my-dear-father.-How-I-missed-him-The-m.png',
      instruction: 'Repeat your affirmation mentally as you drift off to sleep. Focus on your intention to recognize when you\'re dreaming.',
    },
    {
      title: 'Practice Complete',
      description: 'You\'ve completed the MILD practice. Now it\'s time to sleep and let your intention work in your dreams.',
      image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/DALL·E-2024-01-24-17.27.40-The-image-captures-the-moment-of-Seth-entering-a-lucid-dream-state-in-an-isolation-flotation-tank.-Seth-steps-into-the-warm-saltwater-enveloped-by-si-Custom.png',
      instruction: 'Remember to record any dreams you have in your dream journal as soon as you wake up. Good luck and sweet dreams!',
    },
  ];
  
  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      fadeAnim.setValue(0);
      setCurrentStep(currentStep + 1);
    } else {
      router.back();
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      fadeAnim.setValue(0);
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };
  
  // Handle affirmation change
  const handleAffirmationChange = (text) => {
    setAffirmation(text);
  };
  
  // Current step data
  const currentStepData = steps[currentStep];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3a1c71', '#d76d77', '#ffaf7b']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MILD Technique</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive
              ]} 
            />
          ))}
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          
          <Image 
            source={{ uri: currentStepData.image }}
            style={styles.stepImage}
            resizeMode="contain"
          />
          
          <Text style={styles.stepDescription}>{currentStepData.description}</Text>
          
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionTitle}>Instructions:</Text>
            <Text style={styles.instructionText}>{currentStepData.instruction}</Text>
            
            {currentStep === 2 && dreamSigns.length > 0 && (
              <View style={styles.dreamSignsContainer}>
                {dreamSigns.map((sign, index) => (
                  <View key={index} style={styles.dreamSignBadge}>
                    <Text style={styles.dreamSignText}>{sign}</Text>
                  </View>
                ))}
                {dreamSigns.length === 0 && (
                  <Text style={styles.noDreamSignsText}>
                    No dream signs found. Start recording dreams in your journal to identify patterns.
                  </Text>
                )}
              </View>
            )}
            
            {currentStep === 3 && (
              <View style={styles.affirmationContainer}>
                <TextInput
                  style={styles.affirmationInput}
                  value={affirmation || currentStepData.inputPlaceholder}
                  onChangeText={handleAffirmationChange}
                  multiline
                  placeholder={currentStepData.inputPlaceholder}
                />
              </View>
            )}
            
            {currentStep === 5 && (
              <View style={styles.affirmationDisplay}>
                <Text style={styles.affirmationDisplayText}>
                  {affirmation || steps[3].inputPlaceholder}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>
      
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
            <Ionicons name="arrow-back" size={24} color="#3a1c71" />
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.navButton, styles.navButtonPrimary]} 
          onPress={handleNext}
        >
          <Text style={styles.navButtonTextPrimary}>
            {currentStep < steps.length - 1 ? 'Next' : 'Finish'}
          </Text>
          {currentStep < steps.length - 1 ? (
            <Ionicons name="arrow-forward" size={24} color="white" />
          ) : (
            <Ionicons name="checkmark" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
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
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: 'white',
    width: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  stepImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  stepDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  instructionContainer: {
    backgroundColor: '#f0e6ff',
    borderRadius: 12,
    padding: 15,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  dreamSignsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  dreamSignBadge: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderWidth: 1,
    borderColor: '#d76d77',
  },
  dreamSignText: {
    color: '#3a1c71',
    fontWeight: '500',
  },
  noDreamSignsText: {
    fontStyle: 'italic',
    color: '#666',
    marginTop: 10,
  },
  affirmationContainer: {
    marginTop: 15,
  },
  affirmationInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d76d77',
    fontSize: 16,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  affirmationDisplay: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#d76d77',
    alignItems: 'center',
  },
  affirmationDisplayText: {
    fontSize: 18,
    color: '#3a1c71',
    fontWeight: '500',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  navButtonPrimary: {
    backgroundColor: '#3a1c71',
    marginLeft: 'auto',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3a1c71',
    marginLeft: 8,
  },
  navButtonTextPrimary: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginRight: 8,
  },
});
