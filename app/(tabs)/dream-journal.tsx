import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  TextInput, 
  ScrollView,
  Alert,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDreamStore, Dream } from '../../store/dreamStore';
import { router } from 'expo-router';

// Example: Replace with your real dream entries state or storage
const dreamEntries = [
  "I was flying over a city and saw a giant clock.",
  "I was late for school and couldn't find my shoes.",
  "I saw a clock melting on the wall.",
  "I was flying again, this time with my dog.",
  "I couldn't find my classroom and felt lost.",
];

// List of stop words and words to ignore
const STOP_WORDS = [
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "cannot", "could", "couldn't", "couldnt",
  "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
  "each", "few", "for", "from", "further",
  "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
  "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself",
  "let's", "me", "more", "most", "mustn't", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
  "same", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
  "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too",
  "under", "until", "up", "very",
  "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't",
  "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves",
  // Dream-specific exclusions
  "dream", "dreams", "dreaming", "dreamt"
];

// Helper function to extract dream signs from at least 2 different dreams
function extractDreamSigns(entries) {
  const wordDreams = {}; // word -> Set of dream indices

  entries.forEach((entry, dreamIdx) => {
    const words = entry
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

  // Only keep words that appear in at least 2 different dreams
  return Object.entries(wordDreams)
    .filter(([word, dreamSet]) => (dreamSet as Set<number>).size >= 2)
    .map(([word]) => word);
}

// Helper function to extract dream signs and their counts
function extractDreamSignsWithCounts(entries) {
  const wordDreams = {}; // word -> Set of dream indices

  entries.forEach((entry, dreamIdx) => {
    const words = entry
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

  // Only keep words that appear in at least 2 different dreams, and count them
  return Object.entries(wordDreams)
    .filter(([_, dreamSet]) => dreamSet.size >= 2)
    .map(([word, dreamSet]) => ({ word, count: dreamSet.size }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

export default function DreamJournalScreen() {
  const { dreams, addDream, updateDream, deleteDream } = useDreamStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingDream, setEditingDream] = useState<Dream | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLucid, setIsLucid] = useState(false);
  const [clarity, setClarity] = useState(3);
  const [dreamSigns, setDreamSigns] = useState<string[]>([]);
  const [newDreamSign, setNewDreamSign] = useState('');
  const [filterLucid, setFilterLucid] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!modalVisible) {
      resetForm();
    }
  }, [modalVisible]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setIsLucid(false);
    setClarity(3);
    setDreamSigns([]);
    setNewDreamSign('');
    setEditingDream(null);
  };

  const openAddDreamModal = () => {
    resetForm();
    setModalVisible(true);
  };

  const openEditDreamModal = (dream: Dream) => {
    setEditingDream(dream);
    setTitle(dream.title);
    setDescription(dream.description);
    setIsLucid(dream.isLucid);
    setClarity(dream.clarity);
    setDreamSigns(dream.dreamSigns || []);
    setModalVisible(true);
  };

  const handleSaveDream = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a dream title');
      return;
    }

    const dreamData: Dream = {
      id: editingDream ? editingDream.id : Date.now().toString(),
      title,
      description,
      date: editingDream ? editingDream.date : new Date().toISOString(),
      isLucid,
      clarity,
      dreamSigns,
    };

    if (editingDream) {
      updateDream(editingDream.id, dreamData);
    } else {
      addDream(dreamData);
    }

    setModalVisible(false);
  };

  const handleDeleteDream = () => {
    if (editingDream) {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this dream?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: () => {
              deleteDream(editingDream.id);
              setModalVisible(false);
            }
          }
        ]
      );
    }
  };

  const addDreamSign = () => {
    if (newDreamSign.trim() && !dreamSigns.includes(newDreamSign.trim())) {
      setDreamSigns([...dreamSigns, newDreamSign.trim()]);
      setNewDreamSign('');
    }
  };

  const removeDreamSign = (sign: string) => {
    setDreamSigns(dreamSigns.filter(s => s !== sign));
  };

  const filteredDreams = filterLucid 
    ? dreams.filter(dream => dream.isLucid)
    : dreams;

  const sortedDreams = [...filteredDreams].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const renderDreamItem = ({ item }: { item: Dream }) => (
    <TouchableOpacity 
      style={[styles.dreamCard, item.isLucid && styles.lucidDreamCard]} 
      onPress={() => openEditDreamModal(item)}
    >
      <View style={styles.dreamHeader}>
        <Text style={styles.dreamTitle}>{item.title}</Text>
        {item.isLucid && (
          <View style={styles.lucidBadge}>
            <Text style={styles.lucidText}>Lucid</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.dreamDate}>
        {new Date(item.date).toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </Text>
      
      <Text style={styles.dreamDescription} numberOfLines={3}>
        {item.description}
      </Text>
      
      <View style={styles.dreamFooter}>
        <View style={styles.clarityContainer}>
          <Text style={styles.clarityLabel}>Clarity:</Text>
          <View style={styles.clarityStars}>
            {[1, 2, 3, 4, 5].map(star => (
              <Ionicons
                key={star}
                name="star"
                size={16}
                color={star <= item.clarity ? '#FFD700' : '#e0e0e0'}
              />
            ))}
          </View>
        </View>
        
        {item.dreamSigns && item.dreamSigns.length > 0 && (
          <View style={styles.dreamSignsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.dreamSigns.map(sign => (
                <View key={sign} style={styles.dreamSignBadge}>
                  <Text style={styles.dreamSignText}>{sign}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const [dreamSignsAnalysis, setDreamSignsAnalysis] = useState<{word: string, count: number}[]>([]);

  const handleAnalyzeDreams = () => {
    const signs = extractDreamSignsWithCounts(dreams.map(d => d.description || ""));
    setDreamSignsAnalysis(signs);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3a1c71', '#d76d77', '#ffaf7b']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Dream Journal</Text>
        <Text style={styles.headerSubtitle}>Record and analyze your dreams</Text>
      </LinearGradient>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filterLucid && styles.filterButtonActive]}
          onPress={() => setFilterLucid(!filterLucid)}
        >
          <Ionicons 
            name={filterLucid ? "checkbox" : "square-outline"} 
            size={20} 
            color={filterLucid ? "#3a1c71" : "#666"} 
          />
          <Text style={[styles.filterText, filterLucid && styles.filterTextActive]}>
            Show Lucid Dreams Only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dream Analysis Area - move here */}
      <View style={styles.analysisArea}>
        <Text style={styles.sectionTitle}>Dream Analysis</Text>
        <Button title="Analyze My Dreams" onPress={handleAnalyzeDreams} />
        {dreamSignsAnalysis.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <Text style={styles.text}>Recurring Dream Signs:</Text>
            {dreamSignsAnalysis.map(sign => (
              <Text key={sign.word} style={styles.dreamSign}>{sign.word} ({sign.count})</Text>
            ))}
          </View>
        )}
      </View>

      {dreams.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="book" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Your dream journal is empty</Text>
          <Text style={styles.emptySubtext}>
            Start recording your dreams to identify patterns and increase lucidity
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedDreams}
          renderItem={renderDreamItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.dreamList}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={openAddDreamModal}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Dream Entry/Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingDream ? 'Edit Dream' : 'Add New Dream'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter dream title"
              />

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe your dream in detail..."
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />

              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Was this a lucid dream?</Text>
                <TouchableOpacity 
                  style={[styles.switchButton, isLucid && styles.switchButtonActive]}
                  onPress={() => setIsLucid(!isLucid)}
                >
                  <View style={[styles.switchThumb, isLucid && styles.switchThumbActive]} />
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Dream Clarity (1-5)</Text>
              <View style={styles.claritySelector}>
                {[1, 2, 3, 4, 5].map(value => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.clarityStar,
                      value <= clarity && styles.clarityStarActive
                    ]}
                    onPress={() => setClarity(value)}
                  >
                    <Ionicons
                      name="star"
                      size={30}
                      color={value <= clarity ? '#FFD700' : '#e0e0e0'}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Dream Signs</Text>
              <View style={styles.dreamSignInput}>
                <TextInput
                  style={styles.dreamSignTextInput}
                  value={newDreamSign}
                  onChangeText={setNewDreamSign}
                  placeholder="Add a dream sign"
                />
                <TouchableOpacity style={styles.addDreamSignButton} onPress={addDreamSign}>
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.dreamSignsList}>
                {dreamSigns.map(sign => (
                  <View key={sign} style={styles.dreamSignItem}>
                    <Text style={styles.dreamSignItemText}>{sign}</Text>
                    <TouchableOpacity onPress={() => removeDreamSign(sign)}>
                      <Ionicons name="close-circle" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveDream}>
                  <Text style={styles.saveButtonText}>Save Dream</Text>
                </TouchableOpacity>
                
                {editingDream && (
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteDream}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontSize: 28,
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
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#e6e0ff',
  },
  filterText: {
    marginLeft: 8,
    color: '#666',
  },
  filterTextActive: {
    color: '#3a1c71',
  },
  dreamList: {
    padding: 16,
  },
  dreamCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lucidDreamCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3a1c71',
  },
  dreamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dreamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  lucidBadge: {
    backgroundColor: '#e6e0ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lucidText: {
    color: '#3a1c71',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dreamDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  dreamDescription: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    lineHeight: 22,
  },
  dreamFooter: {
    marginTop: 8,
  },
  clarityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  clarityLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  clarityStars: {
    flexDirection: 'row',
  },
  dreamSignsContainer: {
    marginTop: 8,
  },
  dreamSignBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  dreamSignText: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3a1c71',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalScrollView: {
    maxHeight: '100%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 120,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  switchButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    padding: 2,
  },
  switchButtonActive: {
    backgroundColor: '#3a1c71',
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
  },
  switchThumbActive: {
    transform: [{ translateX: 20 }],
  },
  claritySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  clarityStar: {
    padding: 5,
  },
  clarityStarActive: {
    transform: [{ scale: 1.1 }],
  },
  dreamSignInput: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dreamSignTextInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 10,
  },
  addDreamSignButton: {
    backgroundColor: '#3a1c71',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dreamSignsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  dreamSignItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  dreamSignItemText: {
    fontSize: 14,
    color: '#555',
    marginRight: 6,
  },
  modalButtons: {
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#3a1c71',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  deleteButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#3a1c71', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#d76d77', 
    marginTop: 18, 
    marginBottom: 6 
  },
  text: { 
    fontSize: 16, 
    color: '#333', 
    marginBottom: 8 
  },
  analysisArea: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 20, 
    elevation: 2 
  },
  dreamSign: { 
    fontSize: 16, 
    color: '#3a1c71', 
    fontWeight: 'bold', 
    marginLeft: 8, 
    marginTop: 2 
  },
});
