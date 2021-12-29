import { initializeApp, getApp } from 'firebase/app';
import {
  getFirestore,
  getDoc,
  getDocs,
  doc,
  collection,
  query,
  where
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

export async function getUserData(uid, orderBy) {
  if (!db) return;
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  console.log(data);
  return data;
}

export async function getModular(id, orderBy, direction, limit) {
  const db = getFirestore();
  const snapshot = await getDoc(doc(db, 'collections', id));
  const data = snapshot.data();
  let order = data.order;
  if (order === '') {
    return [];
  } else {
    order = order.split(' | ');
  }
  let q = query(
    collection(db, `collections/${id}/data`),
    where('_show', '==', true)
  );
  if (orderBy) {
    q = q.orderBy(orderBy, direction);
  }
  if (limit) {
    q = q.limit(limit);
  }
  let items = await getDocs(q);
  if (orderBy) {
    items = items.docs.reduce((acc, item) => {
      const data = item.data();
      Object.keys(data).forEach(function (key) {
        if (data[key].seconds) {
          data[key] = data[key].toDate().toString();
        }
      });
      data.id = item.id;
      acc.push(data);
      return acc;
    }, []);
  } else {
    items = order.reduce((acc, itemId) => {
      const item = items.docs.find(itm => itm.id === itemId);
      if (!item) return acc;
      const data = item.data();
      Object.keys(data).forEach(function (key) {
        if (data[key].seconds) {
          data[key] = data[key].toDate().toString();
        }
      });
      data.id = item.id;
      acc.push(data);
      return acc;
    }, []);
  }
  // console.log(items);
  return items;
}

export async function getFixed(id) {
  const db = getFirestore();
  const snapshot = await getDoc(doc(db, 'pages', id));
  const data = snapshot.data().data;
  if (!data) return {};
  Object.keys(data).forEach(function (key) {
    if (data[key].seconds) {
      data[key] = data[key].toDate().toString();
    }
  });
  console.log(data);
  return data;
}
