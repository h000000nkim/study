import { useState } from 'react';
import { useRecords } from '../hooks/useRecords';
import { useAuth } from '../hooks/useAuth';
import RichTextEditor from './RichTextEditor';

export default function RecordForm({ studyId }) {
  const { addRecord } = useRecords(studyId);
  const { user } = useAuth();
  const [form, setForm] = useState({ date: '', topic: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.topic || !form.content || form.content === '<p></p>') return;
    setSubmitting(true);
    addRecord({
      ...form,
      author: user.displayName,
      authorId: user.uid,
      authorPhoto: user.photoURL,
    });
    setForm({ date: '', topic: '', content: '' });
    setSubmitting(false);
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="record-form">
      <h2>새 스터디 기록</h2>
      <div className="form-row">
        <label>날짜</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>학습 주제</label>
        <input
          type="text"
          name="topic"
          value={form.topic}
          onChange={handleChange}
          placeholder="학습한 주제를 입력하세요"
          required
        />
      </div>
      <div className="form-row">
        <label>내용</label>
        <RichTextEditor
          value={form.content}
          onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? '저장 중...' : '기록 저장'}
      </button>
    </form>
  );
}
