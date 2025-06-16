import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeStopWords } from '../../utils/stopWordFilter';

const STOP_WORDS = [
  "a", "about", "above", "after", "again", "against", "ain", "all", "am", "an", "and", "any", "are", "aren", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can", "could", "couldn", "d", "did", "didn", "do", "does", "doesn", "doing", "don", "down", "during", "each", "few", "for", "from", "further", "had", "hadn", "has", "hasn", "have", "haven", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn", "it", "its", "itself", "just", "ll", "m", "ma", "me", "mightn", "more", "most", "mustn", "my", "myself", "needn", "no", "nor", "not", "now", "o", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own", "re", "s", "same", "shan", "she", "should", "shouldn", "so", "some", "such", "t", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up", "ve", "very", "was", "wasn", "we", "were", "weren", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "won", "would", "wouldn", "y", "you", "your", "yours", "yourself", "yourselves", "ain’t", "aren’t", "can’t", "could’ve", "couldn’t", "didn’t", "doesn’t", "don’t", "hadn’t", "hasn’t", "haven’t", "he’d", "he’ll", "he’s", "how’d", "how’ll", "how’s", "i’d", "i’ll", "i’m", "i’ve", "isn’t", "it’d", "it’ll", "it’s", "let’s", "might’ve", "mightn’t", "must’ve", "mustn’t", "shan’t", "she’d", "she’ll", "she’s", "should’ve", "shouldn’t", "that’ll", "that’s", "there’s", "they’d", "they’ll", "they’re", "they’ve", "wasn’t", "we’d", "we’ll", "we’re", "we’ve", "weren’t", "what’d", "what’s", "when’d", "when’ll", "when’s", "where’d", "where’ll", "where’s", "who’d", "who’ll", "who’s", "why’d", "why’ll", "why’s", "won’t", "would’ve", "wouldn’t", "you’d", "you’ll", "you’re", "you’ve", "got", "went", "gone", "come", "comes", "came", "get", "gets", "getting", "doing", "done", "being", "want", "wants", "wanted", "like", "likes", "liked", "know", "knows", "knew", "known", "make", "makes", "made", "see", "saw", "seen", "use", "used", "using", "go", "goes", "going", "have", "had", "has", "do", "did", "does", "keep", "keeps", "kept", "let", "lets", "say", "says", "said", "think", "thinks", "thought", "try", "tries", "tried", "need", "needs", "needed", "look", "looks", "looked", "seem", "seems", "seemed", "give", "gives", "gave", "find", "finds", "found", "tell", "tells", "told", "ask", "asks", "asked", "work", "works", "worked", "feel", "feels", "felt", "call", "calls", "called"
];

const DREAMS_KEY = 'dreamEntries';

function extractDreamSigns(entries) {
  const wordDreams = {};
  entries.forEach((entry, dreamIdx) => {
    const words = entry.text
      .replace(/[^\w\s]/g, '')
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word && !STOP_WORDS.includes(word));
    const uniqueWords = new Set(words);
    uniqueWords.forEach(word => {
      if (!wordDreams[word]) wordDreams[word] = new Set();
      wordDreams[word].add(dreamIdx);
    });
  });
  // Return array of [word, count], sorted by count descending
  return Object.entries(wordDreams)
    .map(([word, dreamSet]) => [word, dreamSet.size])
    .filter(([_, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1]);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function DreamJournalScreen() {
  const [dreamText, setDreamText] = useState('');
  const [dreamEntries, setDreamEntries] = useState([]);
  const [dreamSigns, setDreamSigns] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Load dreams on mount
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(DREAMS_KEY);
      const dreams = data ? JSON.parse(data) : [];
      setDreamEntries(dreams);
      setDreamSigns(extractDreamSigns(dreams));
    })();
  }, []);

  // Save a new dream
  const handleAddDream = async () => {
    if (!dreamText.trim()) {
      Alert.alert('Please enter your dream.');
      return;
    }
    const newDream = { text: dreamText.trim(), date: new Date().toISOString() };
    const newDreams = [...dreamEntries, newDream];
    await AsyncStorage.setItem(DREAMS_KEY, JSON.stringify(newDreams));
    setDreamEntries(newDreams);
    setDreamSigns(extractDreamSigns(newDreams));
    setDreamText('');
  };

  // Analyze dreams for dream signs
  const handleAnalyzeDreams = () => {
    setDreamSigns(extractDreamSigns(dreamEntries));
    Alert.alert('Dream Signs Updated', 'Recurring dream signs have been analyzed!');
  };

  // Optional: Clear all dreams (for testing)
  const handleClearDreams = async () => {
    await AsyncStorage.removeItem(DREAMS_KEY);
    setDreamEntries([]);
    setDreamSigns([]);
    Alert.alert('Dreams Cleared', 'All dreams have been deleted.');
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = async () => {
    const updatedDreams = dreamEntries.map(d => d.date === editingId ? { ...d, text: editText } : d);
    await AsyncStorage.setItem(DREAMS_KEY, JSON.stringify(updatedDreams));
    setDreamEntries(updatedDreams);
    setDreamSigns(extractDreamSigns(updatedDreams));
    setEditingId(null);
    setEditText('');
  };// Example dream entry for testing removeStopWords
  const dreamEntry = "I was flying over the city and it was amazing!";
  const filteredText = removeStopWords(dreamEntry);


  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={{ uri: 'https://www.hidreamers.com/wp-content/uploads/2025/06/dream-journal.png' }}
        style={{ flex: 1 }}
        blurRadius={2}
      >
        <View style={[styles.container, { backgroundColor: 'rgba(26,22,70,0.85)' }]}>
          <Text style={styles.header}>Dream Journal</Text>
          <TextInput
            style={styles.input}
            placeholder="Write your dream here..."
            placeholderTextColor="#d1c4e9"
            value={dreamText}
            onChangeText={setDreamText}
            multiline
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddDream}>
            <Text style={styles.addButtonText}>Add Dream</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Your Dreams</Text>
          <FlatList
            data={dreamEntries}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.entry} onPress={() => startEdit(item.date, item.text)}>
                <Text style={styles.dreamText}>{item.text}</Text>
                <Text style={styles.dreamDate}>{formatDate(item.date)}</Text>
                <Text style={styles.editHint}>Tap to edit</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.empty}>No dreams yet. Start journaling!</Text>}
            style={{ marginBottom: 10 }}
          />

          <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyzeDreams}>
            <Text style={styles.analyzeButtonText}>Analyze My Dreams</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Recurring Dream Signs</Text>
          {dreamSigns.length > 0 ? (
            dreamSigns.map(([sign, count], idx) => (
              <Text key={idx} style={styles.dreamSign}>
                {'\u2022'} {sign} <Text style={{ color: '#888' }}>({count})</Text>
              </Text>
            ))
          ) : (
            <Text style={styles.empty}>No recurring dream signs found yet.</Text>
          )}

          <TouchableOpacity style={styles.clearButton} onPress={handleClearDreams}>
            <Text style={styles.clearButtonText}>Clear All Dreams</Text>
          </TouchableOpacity>

          <Modal visible={!!editingId} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Dream</Text>
                <TextInput
                  style={styles.input}
                  value={editText}
                  onChangeText={setEditText}
                  multiline
                />
                <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setEditingId(null)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Debugging: Show original and filtered dream entry */}
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>Original: {dreamEntry}</Text>
            <Text style={styles.debugText}>Filtered: {filteredText}</Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 16, textAlign: 'center', textShadowColor: '#3a1c71', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff', minHeight: 60, color: '#3a1c71' },
  addButton: { backgroundColor: '#d76d77', borderRadius: 8, padding: 12, alignItems: 'center', marginBottom: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffaf7b', marginTop: 24, marginBottom: 8 },
  dreamItem: { backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  dreamText: { fontSize: 16, color: '#333' },
  dreamDate: { fontSize: 12, color: '#888', marginTop: 4, textAlign: 'right' },
  empty: { color: '#d1c4e9', fontStyle: 'italic', marginTop: 10 },
  analyzeButton: { backgroundColor: '#3a1c71', borderRadius: 8, padding: 12, marginTop: 18, alignItems: 'center' },
  analyzeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  dreamSign: { fontSize: 16, color: '#ffaf7b', marginLeft: 10, marginBottom: 4 },
  clearButton: { backgroundColor: '#eee', borderRadius: 8, padding: 10, marginTop: 24, alignItems: 'center' },
  clearButtonText: { color: '#d76d77', fontWeight: 'bold' },
  entry: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginBottom: 14, elevation: 2 },
  editHint: { fontSize: 12, color: '#d76d77', marginTop: 6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 14, padding: 24, width: '85%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#3a1c71', marginBottom: 14 },
  saveButton: { backgroundColor: '#3a1c71', borderRadius: 8, padding: 12, alignItems: 'center', marginBottom: 10 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButton: { alignItems: 'center', padding: 8 },
  cancelButtonText: { color: '#d76d77', fontWeight: 'bold', fontSize: 15 },

});
