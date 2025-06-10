import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Switch, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRealityCheckStore } from '../../store/realityCheckStore';
import { useSettings } from '../../store/settingsStore';

const realityCheckTypes = [
  {
    id: '1',
    name: 'Hand Check',
    description: 'Look at your hands. In dreams, hands often appear distorted or have the wrong number of fingers.',
    icon: 'hand-left',
  },
  {
    id: '2',
    name: 'Text Check',
    description: 'Read some text, look away, then read it again. In dreams, text often changes when you look at it twice.',
    icon: 'text',
  },
  {
    id: '3',
    name: 'Breathing Check',
    description: 'Try to breathe with your nose closed. In dreams, you might still be able to breathe.',
    icon: 'fitness',
  },
  {
    id: '4',
    name: 'Jump Check',
    description: 'Jump slightly. In dreams, you might float or jump higher than normal.',
    icon: 'arrow-up',
  },
  {
    id: '5',
    name: 'Light Switch Check',
    description: 'Flip a light switch. In dreams, light switches often don\'t work properly.',
    icon: 'bulb',
  },
  {
    id: '6',
    name: 'Mirror Check',
    description: 'Look in a mirror. In dreams, your reflection might be distorted or different.',
    icon: 'person',
  },
];

export default function RealityChecksScreen() {
  const { realityChecks, addRealityCheck } = useRealityCheckStore();
  const { settings } = useSettings();
  const [selectedCheck, setSelectedCheck] = useState<string | null>(null);
  const [remindersOn, setRemindersOn] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to trigger the reminder (popup only)
  const triggerReminder = () => {
    Alert.alert('Reality Check', 'Do a reality check now!');
  };

  // Start/stop reminders every 2 hours
  useEffect(() => {
    if (remindersOn) {
      triggerReminder(); // Immediate first reminder
      intervalRef.current = setInterval(triggerReminder, 7200000); // 2 hours
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [remindersOn]);

  // Perform a reality check
  const performRealityCheck = (checkId: string) => {
    setSelectedCheck(checkId);
    const check = realityCheckTypes.find(c => c.id === checkId);
    if (!check) return;
    const newCheck = {
      id: Date.now().toString(),
      name: check.name,
      description: check.description,
      completed: true,
      timestamp: new Date().toISOString(),
    };
    addRealityCheck(newCheck);
    setTimeout(() => {
      setSelectedCheck(null);
      Alert.alert(
        'Reality Check Complete',
        'Remember to ask yourself: "Am I dreaming?" and really consider the possibility.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };

  // Render a reality check item
  const renderRealityCheck = ({ item }: { item: typeof realityCheckTypes[0] }) => (
    <TouchableOpacity
      style={[
        styles.checkItem,
        selectedCheck === item.id && styles.selectedCheck
      ]}
      onPress={() => performRealityCheck(item.id)}
    >
      <View style={styles.checkIconContainer}>
        <Ionicons name={item.icon as any} size={28} color="#3a1c71" />
      </View>
      <View style={styles.checkContent}>
        <Text style={styles.checkName}>{item.name}</Text>
        <Text style={styles.checkDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3a1c71', '#d76d77', '#ffaf7b']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Reality Checks</Text>
        <Text style={styles.headerSubtitle}>Train your mind to recognize dreams</Text>
      </LinearGradient>

      <View style={styles.reminderContainer}>
        <Text style={styles.reminderTitle}>Automated Reality Check Reminders</Text>
        <Text style={styles.reminderDescription}>
          You will receive a reality check reminder every 2 hours automatically.
        </Text>
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 16, color: '#3a1c71', fontWeight: 'bold', marginRight: 12 }}>
              Reminders
            </Text>
            <Switch
              value={remindersOn}
              onValueChange={setRemindersOn}
              trackColor={{ false: '#d1d1d1', true: '#d76d77' }}
              thumbColor={remindersOn ? '#3a1c71' : '#f4f3f4'}
            />
          </View>
          <Button
            title="Test Reminder"
            onPress={triggerReminder}
            color="#d76d77"
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Choose a Reality Check</Text>
      <FlatList
        data={realityCheckTypes}
        renderItem={renderRealityCheck}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  checkItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedCheck: {
    backgroundColor: '#f0e6ff',
    borderColor: '#3a1c71',
    borderWidth: 1,
  },
  checkIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkContent: {
    flex: 1,
  },
  checkName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  checkDescription: {
    fontSize: 14,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#f0e6ff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  reminderContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  reminderDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
});
