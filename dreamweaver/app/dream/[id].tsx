import React, { useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme, Alert } from 'react-native';
import { Text, View, TouchableOpacity } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useDreamStore } from '../../store/dreamStore';
import { useLocalSearchParams, router } from 'expo-router';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';

export default function DreamDetailScreen() {
  const colorScheme = useColorScheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getDreamById, deleteDream, updateDream } = useDreamStore();
  const dream = getDreamById(id);
  
  const [isEditing, setIsEditing] = useState(false);
  
  if (!dream) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Dream not found</Text>
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
  
  const handleDelete = () => {
    Alert.alert(
      'Delete Dream',
      'Are you sure you want to delete this dream? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDream(dream.id);
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              router.back();
            } catch (error) {
              console.error('Error deleting dream:', error);
              Alert.alert('Error', 'Failed to delete dream');
            }
          }
        }
      ]
    );
  };
  
  const handleToggleLucid = async () => {
    try {
      await updateDream(dream.id, { isLucid: !dream.isLucid });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Error updating dream:', error);
      Alert.alert('Error', 'Failed to update dream');
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.back()}
          lightColor="transparent"
          darkColor="transparent"
        >
          <FontAwesome name="arrow-left" size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions} lightColor="transparent" darkColor="transparent">
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setIsEditing(!isEditing)}
            lightColor="transparent"
            darkColor="transparent"
          >
            <FontAwesome name="edit" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={handleDelete}
            lightColor="transparent"
            darkColor="transparent"
          >
            <FontAwesome name="trash" size={24} color={Colors[colorScheme ?? 'light'].error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.dreamHeader} lightColor="transparent" darkColor="transparent">
        <Text style={styles.date}>
          {format(new Date(dream.date), 'EEEE, MMMM d, yyyy')}
        </Text>
        <Text style={styles.title}>{dream.title}</Text>
        
        <TouchableOpacity 
          style={[
            styles.lucidBadge,
            { backgroundColor: dream.isLucid ? Colors[colorScheme ?? 'light'].primary : '#e0e0e0' }
          ]}
          onPress={handleToggleLucid}
        >
          <Text 
            style={[
              styles.lucidText,
              { color: dream.isLucid ? '#fff' : Colors[colorScheme ?? 'light'].text }
            ]}
          >
            {dream.isLucid ? 'Lucid Dream' : 'Non-Lucid Dream'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section} lightColor={Colors.light.card} darkColor={Colors.dark.card}>
        <Text style={styles.sectionTitle}>Dream Description</Text>
        <Text style={styles.description}>{dream.description}</Text>
      </View>
      
      <View style={styles.section} lightColor={Colors.light.card} darkColor={Colors.dark.card}>
        <Text style={styles.sectionTitle}>Dream Details</Text>
        
        <View style={styles.detailRow} lightColor="transparent" darkColor="transparent">
          <Text style={styles.detailLabel}>Clarity:</Text>
          <View style={styles.clarityContainer} lightColor="transparent" darkColor="transparent">
            {[1, 2, 3, 4, 5].map(value => (
              <View
                key={value}
                style={[
                  styles.clarityDot,
                  { 
                    backgroundColor: value <= dream.clarity 
                      ? Colors[colorScheme ?? 'light'].primary 
                      : '#e0e0e0' 
                  }
                ]}
              />
            ))}
            <Text style={styles.clarityText}>{dream.clarity}/5</Text>
          </View>
        </View>
        
        {dream.emotions.length > 0 && (
          <View style={styles.detailRow} lightColor="transparent" darkColor="transparent">
            <Text style={styles.detailLabel}>Emotions:</Text>
            <View style={styles.tagsContainer} lightColor="transparent" darkColor="transparent">
              {dream.emotions.map((emotion, index) => (
                <View 
                  key={index} 
                  style={styles.tag}
                  lightColor={Colors.light.secondary + '40'}
                  darkColor={Colors.dark.secondary + '40'}
                >
                  <Text style={styles.tagText}>{emotion}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {dream.tags.length > 0 && (
          <View style={styles.detailRow} lightColor="transparent" darkColor="transparent">
            <Text style={styles.detailLabel}>Tags:</Text>
            <View style={styles.tagsContainer} lightColor="transparent" darkColor="transparent">
              {dream.tags.map((tag, index) => (
                <View 
                  key={index} 
                  style={styles.tag}
                  lightColor={Colors.light.primary + '40'}
                  darkColor={Colors.dark.primary + '40'}
                >
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
      
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => router.push(`/dream-journal/edit/${dream.id}`)}
        lightColor={Colors.light.primary}
        darkColor={Colors.dark.primary}
      >
        <Text style={styles.editButtonText}>Edit Dream</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 16,
  },
  dreamHeader: {
    marginBottom: 24,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lucidBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  lucidText: {
    fontSize: 14,
    fontWeight: 'bold',
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
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  clarityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clarityDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  clarityText: {
    fontSize: 14,
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
  },
  editButton: {
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  editButtonText: {
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
