import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useRef } from 'react';

const CLOUD_NAME = 'djtdyinlg';
const UPLOAD_PRESET = 'study-web';

export default function RichTextEditor({ value, onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
      alert('이미지 업로드에 실패했습니다.');
    }
    e.target.value = '';
  };

  return (
    <div className="rich-editor">
      <div className="rich-toolbar">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'active' : ''}
          title="굵게"
        >B</button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'active' : ''}
          title="기울임"
        ><em>I</em></button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'active' : ''}
          title="목록"
        >• 목록</button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'active' : ''}
          title="코드 블록"
        >{'</>'}</button>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          title="이미지 업로드"
        >🖼 이미지</button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
