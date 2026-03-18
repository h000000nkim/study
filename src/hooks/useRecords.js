import { useState, useEffect } from 'react';
import {
  collection, addDoc, deleteDoc, doc, query,
  where, onSnapshot, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const COLLECTION = 'records';

export function useRecords(studyId) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studyId) {
      setRecords([]);
      setLoading(false);
      return;
    }
    const q = query(
      collection(db, COLLECTION),
      where('studyId', '==', studyId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setRecords(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [studyId]);

  const addRecord = (record) =>
    addDoc(collection(db, COLLECTION), {
      ...record,
      studyId,
      createdAt: serverTimestamp(),
    });

  const deleteRecord = (id) => deleteDoc(doc(db, COLLECTION, id));

  return { records, loading, addRecord, deleteRecord };
}
