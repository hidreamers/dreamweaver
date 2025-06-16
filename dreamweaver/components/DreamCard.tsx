import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { View, Text, TouchableOpacity } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Dream } from '../types';
import { format } from 'date-fns';
import { removeStopWords } from '../utils/stopWordFilter';

type DreamCardProps = {
  dream: Dream;
  onPress: (id: string) => void;
};

export default function DreamCard({ dream, onPress }: DreamCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const filteredDescription = removeStopWords(dream.description);

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { 
          backgroundColor: dream.isLucid 
            ? Colors[colorScheme].dreamCard 
            : Colors[colorScheme].card 
        }
      ]}
      onPress={() => onPress(dream.id)}
      lightColor={dream.isLucid ? Colors.light.dreamCard : Colors.light.card}
      darkColor={dream.isLucid ? Colors.dark.dreamCard : Colors.dark.card}
    >
      <View style={styles.header} lightColor="transparent" darkColor="transparent">
        <Text style={styles.date}>
          {format(new Date(dream.date), 'MMM d, yyyy')}
        </Text>
        {dream.isLucid && (
          <View style={styles.lucidBadge} lightColor={Colors.light.primary} darkColor={Colors.dark.primary}>
            <Text style={styles.lucidText}>Lucid</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.title} numberOfLines={1}>{dream.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{dream.description}</Text>
      <Text style={styles.keywords} numberOfLines={1}>Keywords: {filteredDescription}</Text>
      
      <View style={styles.footer} lightColor="transparent" darkColor="transparent">
        {dream.tags.map((tag, index) => (
          <View 
            key={index} 
            style={styles.tag}
            lightColor={Colors.light.secondary + '40'}
            darkColor={Colors.dark.secondary + '40'}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
  },
  lucidBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lucidText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  keywords: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
  },
});
