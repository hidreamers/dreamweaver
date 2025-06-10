import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useColorScheme } from 'react-native';

type StatsCardProps = {
  title: string;
  value: number;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
};

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer} lightColor="transparent" darkColor="transparent">
        <FontAwesome 
          name={icon} 
          size={24} 
          color={Colors[colorScheme ?? 'light'].primary} 
        />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    opacity: 0.7,
  },
});
