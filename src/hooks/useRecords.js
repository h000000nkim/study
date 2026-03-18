import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION = 'records';

export function useRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecords(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const addRecord = (record) =>
    addDoc(collection(db, COLLECTION), {
      ...record,
      createdAt: serverTimestamp(),
    });

  const deleteRecord = (id) => deleteDoc(doc(db, COLLECTION, id));

  return { records, loading, addRecord, deleteRecord };
}
