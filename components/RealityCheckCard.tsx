import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { View, Text, TouchableOpacity } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { RealityCheck } from '../types';

type RealityCheckCardProps = {
  check: RealityCheck;
  onToggle: (id: string) => void;
};

export default function RealityCheckCard({ check, onToggle }: RealityCheckCardProps) {
  const colorScheme = useColorScheme() ?? 'light';
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: Colors[colorScheme].card }
    ]}>
      <View style={styles.content} lightColor="transparent" darkColor="transparent">
        <Text style={styles.title}>{check.name}</Text>
        <Text style={styles.description}>{check.description}</Text>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.checkButton,
          { backgroundColor: check.completed ? Colors[colorScheme].success : Colors[colorScheme].primary }
        ]}
        onPress={() => onToggle(check.id)}
        lightColor={check.completed ? Colors.light.success : Colors.light.primary}
        darkColor={check.completed ? Colors.dark.success : Colors.dark.primary}
      >
        <FontAwesome 
          name={check.completed ? "check" : "hand-pointer-o"} 
          size={20} 
          color="#fff" 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
  },
  checkButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
