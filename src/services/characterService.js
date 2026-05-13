// services/characterService.js
import { db } from "../firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const COLLECTION = "characters";

// ── CREAR ──────────────────────────────────────────────────────────────────
// Firestore genera el ID automáticamente, lo devolvemos junto con los datos
export const createCharacter = async (data) => {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: new Date(),
  });
  return { id: ref.id, ...data };
};

// ── BUSCAR UNO ─────────────────────────────────────────────────────────────
export const getCharacter = async (id) => {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

// ── EDITAR ─────────────────────────────────────────────────────────────────
// Pasás solo los campos que cambiaron, no el objeto entero
export const updateCharacter = async (id, data) => {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    ...data,
    updatedAt: new Date(),
  });
};

// ── LISTAR TODOS ───────────────────────────────────────────────────────────
export const getAllCharacters = async () => {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
