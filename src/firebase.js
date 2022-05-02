import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { Component } from "react/cjs/react.production.min";

const config = {
  apiKey: "AIzaSyB5ze3VAgqWpK-IsjRiBuwrdznTi0Q4-xM",
  projectId: "vennproject-8b9d9",
  appId: "1:275780316595:android:73d4533c790081570c6fc6",
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

export async function UpdateLocation(member, newLocation) {
  await updateDoc(doc(db, "members", member), {
    location: newLocation,
  });
}

// eslint-disable-next-line prettier/prettier
export async function RegisterUser(
  _memberId,
  _firstname,
  _lastname,
  _favoritecolor,
  _location
) {
  const newMember = {
    id: _memberId,
    favoriteColor: _favoritecolor,
    firstname: _firstname,
    lastname: _lastname,
    location: _location,
  };
  await setDoc(doc(db, "members", _memberId), Object.assign({}, newMember));
  return newMember;
}

export async function CreateNewProject(_projectId, _tags, _participants) {
  const newProject = {
    projectId: _projectId,
    tags: _tags,
    participants: _participants,
    links: [],
  };
  await setDoc(doc(db, "projects", _projectId), Object.assign({}, newProject));
}

export async function UpdateProjectLinks(projectId, newTitle, newLink, links) {
  let component = { title: newTitle, link: newLink };
  links.push(component);
  await updateDoc(doc(db, "projects", projectId), {
    links: links,
  });
}
