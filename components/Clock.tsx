import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Text style={styles.clock}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </Text>
  );
}

const styles = StyleSheet.create({
  clock: {
    fontSize: 24,           // Smaller font size
    fontWeight: 'bold',
    color: '#3a1c71',
    marginTop: 24,          // Drop it down from the top
    marginBottom: 8,        // Less space below
    letterSpacing: 2,
    textShadowColor: '#b4aee8',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    alignSelf: 'center',
  },
});