import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TestTouchable() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => alert('Pressed!')}>
        <Text>Press me</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/TestTouchable')}>
        <Text>Go to Test Touchable</Text>
      </TouchableOpacity>
    </View>
  );
}