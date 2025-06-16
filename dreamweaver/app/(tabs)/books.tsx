import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const books = [
  {
     id: '0',
    id: '1',
    title: "Convergence and the Love Code",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Convergence-Through-a-Post-Apocalyptic-Dallas.png",
    link: "https://www.jerimiahmolfese.com/The_Love_Code.epub",
    description: "A thrilling journey through a transformed world and the power of dreams.",
  },
  {
    id: '2',
    title: "The Great Journey: What Lies Beyond",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/The-Great-Journey-What-Lies-Beyond-Fiction-or-reality-unraveling-some-of-humanitys-most-profound-questions-scaled.jpeg",
    link: "https://www.jerimiahmolfese.com/the_great_journy.epub",
    description: "Fiction or reality? Unraveling some of humanity's most profound questions.",
  },
  {
    id: '3',
    title: "My Adventures in Lucid Dreaming",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Lucid-Dreaming-cover.png",
    link: "https://www.jerimiahmolfese.com/My_Adventures_in_lucid_dreaming.epub",
    description: "Unlock the secrets of lucid dreaming and explore your inner universe.",
  },
  {
    id: '4',
    title: "Manifestation: Unlock the Secrets of Lucid Dreaming and Alchemy",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Manifestation-Unlock-the-Secrets-of-Lucid-Dreaming-and-Alchemy--scaled.jpeg",
    link: "https://www.jerimiahmolfese.com/Manifestation.epub",
    description: "Discover the connection between lucid dreaming and the art of manifestation.",
  },
  {
    id: '5',
    title: "Guardians Volume One",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Rise-of-The-Protectors-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/Guardians_Book_1.epub",
    description: "The first adventure in the Guardians saga.",
  },
  {
    id: '6',
    title: "Guardians Book 2",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-of-five-planets-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/GUARDIANS_Book_2.epub",
    description: "The epic battle continues across the stars.",
  },
  {
    id: '7',
    title: "Guardians Volume Three",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-For-The-Multiverse-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/Gaurdians_Book_3.epub",
    description: "The fate of the multiverse hangs in the balance.",
  },
  {
    id: '8',
    title: "Guardians Volume Four",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-For-The-Multiverse-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/Guardians_Book_4.epub",
    description: "The final battle for the Guardians.",
  },
  {
    id: '9',
    title: "A Dreamer’s Odyssey: True Stories of a Dream Traveler",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/04/cover-scaled.jpg",
    link: "https://www.jerimiahmolfese/A_Dreamer_Odyssey.epub",
    description: "“A Dreamer’s Odyssey: True Stories of a Dream Traveler” is an intimate journey into the real-life experiences of lucid dreaming and spiritual discovery.",
  },
];

const { width } = Dimensions.get('window');

export default function BooksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#ffaf7b', '#d76d77', '#3a1c71']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={styles.headerTitle}>Books by Jerimiah Molfese</Text>
      </View>
      <Text style={styles.description}>
        You will need the{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.amazon.com/b/ref=ruby_redirect?ie=UTF8&node=16571048011')
          }
        >
          Kindle Reader app
        </Text>{' '}
        to access these books.
      </Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {books.map(book => (
          <TouchableOpacity
            key={book.id}
            style={styles.bookCard}
            onPress={() => Linking.openURL(book.link)}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: book.cover }}
              style={styles.bookCover}
              resizeMode="contain"
            />
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookDesc}>{book.description}</Text>
            <Text style={styles.bookLink}>Read now</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1646' },
  header: {
    width: '100%',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
    zIndex: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 8,
    zIndex: 1,
  },
  scroll: { alignItems: 'center', paddingVertical: 24, paddingBottom: 40 },
  description: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  link: {
    color: '#d76d77',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  bookCard: {
    width: width - 32,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 28,
    padding: 18,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
  },
  bookCover: {
    width: width - 80,
    aspectRatio: 2 / 3, // Ensures the image keeps a book-like shape
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#eee',
    alignSelf: 'center',
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3a1c71',
    textAlign: 'center',
    marginBottom: 8,
  },
  bookDesc: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  bookLink: {
    color: '#d76d77',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
  },
});