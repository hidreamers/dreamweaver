import React, { useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme, Switch, Alert } from 'react-native';
import { Text, View, TextInput, TouchableOpacity } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDreamStore } from '../../store/dreamStore';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function NewDreamScreen() {
  const colorScheme = useColorScheme();
  const { addDream } = useDreamStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLucid, setIsLucid] = useState(false);
  const [clarity, setClarity] = useState(3);
  const [emotions, setEmotions] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  
  const commonEmotions = [
    'Happy', 'Scared', 'Anxious', 'Excited', 
    'Confused', 'Peaceful', 'Angry', 'Surprised'
  ];
  
  const commonTags = [
    'Flying', 'Falling', 'Chase', 'Water', 
    'Family', 'Friends', 'Work', 'School'
  ];
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  const handleToggleEmotion = (emotion: string) => {
    if (emotions.includes(emotion)) {
      setEmotions(emotions.filter(e => e !== emotion));
    } else {
      setEmotions([...emotions, emotion]);
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };
  
  const handleSaveDream = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your dream');
      return;
    }
    
    try {
      await addDream({
        title: title.trim(),
        description: description.trim(),
        date: new Date().toISOString(),
        isLucid,
        clarity,
        emotions,
        tags,
        dreamSigns: []
      });
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    } catch (error) {
      console.error('Error saving dream:', error);
      Alert.alert('Error', 'Failed to save dream');
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle}>New Dream Entry</Text>
      
      <View style={styles.formSection} lightColor={Colors.light.card} darkColor={Colors.dark.card}>
        <Text style={styles.label}>Dream Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter dream title"
          value={title}
          onChangeText={setTitle}
        />
        
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your dream in detail..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={6}
        />
        
        <View style={styles.switchRow} lightColor="transparent" darkColor="transparent">
          <Text style={styles.switchLabel}>Was this a lucid dream?</Text>
          <Switch
            value={isLucid}
            onValueChange={setIsLucid}
            trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].primary }}
            thumbColor="#f4f3f4"
          />
        </View>
        
        <Text style={styles.label}>Dream Clarity (1-5)</Text>
        <View style={styles.clarityContainer} lightColor="transparent" darkColor="transparent">
          {[1, 2, 3, 4, 5].map(value => (
            <TouchableOpacity
              key={value}
              style={[
                styles.clarityButton,
                clarity === value && {
                  backgroundColor: Colors[colorScheme ?? 'light'].primary
                }
              ]}
              onPress={() => {
                setClarity(value);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              lightColor={clarity === value ? Colors.light.primary : '#e0e0e0'}
              darkColor={clarity === value ? Colors.dark.primary : '#333'}
            >
              <Text 
                style={[
                  styles.clarityButtonText,
                  clarity === value && styles.clarityButtonTextActive
                ]}
              >
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.clarityDescription}>
          {clarity === 1 && 'Very vague, barely remember anything'}
          {clarity === 2 && 'Fuzzy, remember some fragments'}
          {clarity === 3 && 'Moderate clarity, remember key parts'}
          {clarity === 4 && 'Clear, remember most details'}
          {clarity === 5 && 'Extremely vivid, like real life'}
        </Text>
      </View>
      
      <View style={styles.formSection} lightColor={Colors.light.card} darkColor={Colors.dark.card}>
        <Text style={styles.sectionTitle}>Emotions</Text>
        <Text style={styles.sectionDescription}>How did you feel in the dream?</Text>
        
        <View style={styles.emotionsContainer} lightColor="transparent" darkColor="transparent">
          {commonEmotions.map(emotion => (
            <TouchableOpacity
              key={emotion}
              style={[
                styles.emotionTag,
                emotions.includes(emotion) && {
                  backgroundColor: Colors[colorScheme ?? 'light'].primary
                }
              ]}
              onPress={() => handleToggleEmotion(emotion)}
              lightColor={emotions.includes(emotion) ? Colors.light.primary : '#e0e0e0'}
              darkColor={emotions.includes(emotion) ? Colors.dark.primary : '#333'}
            >
              <Text 
                style={[
                  styles.emotionTagText,
                  emotions.includes(emotion) && styles.emotionTagTextActive
                ]}
              >
                {emotion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.formSection} lightColor={Colors.light.card} darkColor={Colors.dark.card}>
        <Text style={styles.sectionTitle}>Tags</Text>
        <Text style={styles.sectionDescription}>Add tags to categorize your dream</Text>
        
        <View style={styles.tagInputContainer} lightColor="transparent" darkColor="transparent">
          <TextInput
            style={styles.tagInput}
            placeholder="Add a tag"
            value={newTag}
            onChangeText={setNewTag}
            onSubmitEditing={handleAddTag}
          />
          <TouchableOpacity 
            style={styles.addTagButton} 
            onPress={handleAddTag}
            lightColor={Colors.light.primary}
            darkColor={Colors.dark.primary}
          >
            <FontAwesome name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.commonTagsContainer} lightColor="transparent" darkColor="transparent">
          {commonTags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={styles.commonTag}
              onPress={() => {
                if (!tags.includes(tag)) {
                  setTags([...tags, tag]);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
              }}
              lightColor="#e0e0e0"
              darkColor="#333"
            >
              <Text style={styles.commonTagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.selectedTagsContainer} lightColor="transparent" darkColor="transparent">
          {tags.map(tag => (
            <View 
              key={tag} 
              style={styles.selectedTag}
              lightColor={Colors.light.primary}
              darkColor={Colors.dark.primary}
            >
              <Text style={styles.selectedTagText}>{tag}</Text>
              <TouchableOpacity 
                style={styles.removeTagButton} 
                onPress={() => handleRemoveTag(tag)}
              >
                <FontAwesome name="times" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSaveDream}
        lightColor={Colors.light.primary}
        darkColor={Colors.dark.primary}
      >
        <Text style={styles.saveButtonText}>Save Dream</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 24,
  },
  formSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  clarityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  clarityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clarityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clarityButtonTextActive: {
    color: '#fff',
  },
  clarityDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  emotionTagText: {
    fontSize: 14,
  },
  emotionTagTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tagInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tagInput: {
    flex: 1,
    marginRight: 8,
  },
  addTagButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commonTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  commonTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  commonTagText: {
    fontSize: 14,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedTagText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 4,
  },
  removeTagButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
