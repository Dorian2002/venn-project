import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyB5ze3VAgqWpK-IsjRiBuwrdznTi0Q4-xM",
  projectId: "vennproject-8b9d9",
  appId: "1:275780316595:android:0a827202aa0fc5320c6fc6",
};

export const app = getApps().length === 0 ? initializeApp(config) : getApp();

export const db = getFirestore(app);

function parseDocument(document) {
  return { id: document.id, ...document.data() };
}

export async function getAll(name) {
  const snapshot = await getDocs(query(collection(db, name)));
  return snapshot.docs.map(parseDocument);
}

export async function getOne(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return parseDocument(snapshot);
}
