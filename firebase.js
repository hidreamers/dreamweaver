import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, get, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'tbKamn5KZlInz7O_6s0wbzGoca4glm0',
  authDomain: 'lucid-dreaming-assistant.firebaseapp.com',
  projectId: 'lucid-dreaming-assistant',
  databaseURL: 'https://lucid-dreaming-assistant-default-rtdb.firebaseio.com',
  storageBucket: 'lucid-dreaming-assistant.appspot.com',
  messagingSenderId: '528383123772',
  appId: '1:528383123772:web:a2eb0e8393bc02bcc47e39',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Example function to save a dream
export function saveDream(dream) {
  const dreamsRef = ref(db, 'dreams');
  return push(dreamsRef, dream);
}

// Example function to save a dream sign
export function saveDreamSign(dreamSign) {
  const signsRef = ref(db, 'dreamSigns');
  return push(signsRef, dreamSign);
}

// Example function to get all dreams
export function getDreams(callback) {
  const dreamsRef = ref(db, 'dreams');
  onValue(dreamsRef, (snapshot) => {
    callback(snapshot.val());
  });
}