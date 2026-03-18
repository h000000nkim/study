import { useState } from 'react';
import {
  collection, addDoc, updateDoc, doc, query,
  where, onSnapshot, getDocs, serverTimestamp, arrayUnion
} from 'firebase/firestore';
import { db } from '../firebase/config';

function generateInviteCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function useStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyStudies = (user) => {
    if (!user) {
      setStudies([]);
      setLoading(false);
      return () => {};
    }
    const q = query(
      collection(db, 'studies'),
      where('memberIds', 'array-contains', user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setStudies(data);
      setLoading(false);
    });
    return unsubscribe;
  };

  const createStudy = async (user, name, description) => {
    const inviteCode = generateInviteCode();
    await addDoc(collection(db, 'studies'), {
      name,
      description,
      inviteCode,
      createdBy: user.uid,
      createdByName: user.displayName,
      createdAt: serverTimestamp(),
      memberIds: [user.uid],
      members: [{ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }],
    });
  };

  const joinStudy = async (user, inviteCode) => {
    const q = query(collection(db, 'studies'), where('inviteCode', '==', inviteCode.toUpperCase()));
    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error('존재하지 않는 초대 코드입니다.');
    const studyDoc = snapshot.docs[0];
    const study = studyDoc.data();
    if (study.memberIds.includes(user.uid)) throw new Error('이미 참여 중인 스터디입니다.');
    await updateDoc(doc(db, 'studies', studyDoc.id), {
      memberIds: arrayUnion(user.uid),
      members: arrayUnion({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL }),
    });
  };

  return { studies, loading, fetchMyStudies, createStudy, joinStudy };
}
