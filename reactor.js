import { initializeApp, getApp } from 'firebase/app';
import {
  getFirestore,
  getDoc,
  getDocs,
  doc,
  collection
} from 'firebase/firestore';

let db;
let firebaseApp;

export function init() {
  try {
    firebaseApp = getApp();
  } catch (e) {
    firebaseApp = initializeApp({
      apiKey: 'AIzaSyCVoJ1fNik-brXSirPwXfzEzpK4HDJyIdE',
      authDomain: 'reactor-dam.firebaseapp.com',
      databaseURL: 'https://reactor-dam.firebaseio.com',
      projectId: 'reactor-dam',
      storageBucket: 'reactor-dam.appspot.com',
      messagingSenderId: '198256799515',
      appId: '1:198256799515:web:3cf8edc02e02434b466dbe'
    });
    db = getFirestore();
    console.log('Reactor initialized');
  }
}

export async function getUserData(uid) {
  if (!db) return;
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  console.log(data);
  return data;
}

export async function getModular(id) {
  const db = getFirestore();
  const snapshot = await getDoc(doc(db, 'collections', id));
  //   const querySnapshot = await getDocs(collection(db, 'collections', id));
  const data = snapshot.data();
  return data;
}
