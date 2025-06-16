import React from 'react';
import { StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

type TechniqueCardProps = {
  title: string;
  description: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

export default function TechniqueCard({ title, description, image, onPress }: TechniqueCardProps) {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.card} lightColor="#f8f9fa" darkColor="#2a2a2a">
        <Image source={image} style={styles.image} />
        <View style={styles.content} lightColor="transparent" darkColor="transparent">
          <Text style={[styles.title, {color: Colors[colorScheme ?? 'light'].text}]}>
            {title}
          </Text>
          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 12,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
});
