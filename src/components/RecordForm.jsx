import { useState } from 'react';
import { useRecords } from '../hooks/useRecords';
import { useAuth } from '../hooks/useAuth';

export default function RecordForm() {
  const { addRecord } = useRecords();
  const { user } = useAuth();
  const [form, setForm] = useState({ date: '', topic: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.date || !form.topic || !form.content) return;
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

  if (!user) return <p className="hint">기록을 작성하려면 로그인하세요.</p>;

  return (
    <form onSubmit={handleSubmit} className="record-form">
      <h2>새 스터디 기록</h2>
      <div className="form-row">
        <label>날짜</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
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
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="학습 내용을 자유롭게 적어주세요"
          rows={5}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? '저장 중...' : '기록 저장'}
      </button>
    </form>
  );
}
