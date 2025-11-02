'use client';

import { postPost, putPost } from '@/lib/client-actions/post';
import { fetchWithAuth } from '@/lib/client-actions/refresh';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const DEFAULT_DATA = {
  id: -1,
  userUsername: '',
  content: '',
  summary: '',
  title: '',
  createdAt: '',
  updatedAt: '',
};

export default function EditorClient({ data = DEFAULT_DATA }) {
  const editorRef = useRef(null);
  const titleRef = useRef(data.title);
  const [dirty, setDirty] = useState(false);
  const [id, setId] = useState(data.id);
  const [title, setTitle] = useState(data.title);
  const router = useRouter();
  useEffect(() => setDirty(false), [data]);
  useEffect(() => {
    titleRef.current = title;
  }, [title]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S (Windows/Linux) 또는 Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // 브라우저 저장 다이얼로그 방지
        handleSubmit(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editorRef.current) return;

    try {
      // 1. 먼저 모든 Base64/Blob 이미지를 업로드
      await editorRef.current.uploadImages();

      // 2. 업로드가 완료되면 이제 content는 모두 URL로 변환됨
      const content = editorRef.current.getContent();

      // 3. 서버에 최종 content 제출
      if (id === -1) {
        const response = await postPost(content, titleRef.current);
        if (response.status === 'success') {
          editorRef.current.setDirty(false);
          setDirty(false);
          setId(response.data.id);
          router.replace(`/edit/${response.data.id}`);
        } else {
          throw new Error('save failed');
        }
      } else {
        const response = await putPost(content, titleRef.current, data.id);
        if (response.status === 'success') {
          editorRef.current.setDirty(false);
          setDirty(false);
        } else {
          throw new Error('save failed');
        }
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    titleRef.current = newTitle; // ref도 동시 업데이트
    setDirty(true);
    if (editorRef.current) {
      editorRef.current.setDirty(true);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`border-[3px] rounded-[10px] ${dirty ? 'border-red' : 'border-blue'}`}
    >
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title required"
        className="w-full p-2 border rounded"
      />
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        initialValue={data?.content}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onDirty={() => setDirty(true)}
        init={{
          height: 800,
          plugins:
            'lists advlist link image save autosave codesample advlist table wordcount searchreplace preview',
          toolbar:
            'save undo redo | formatselect | bold italic emoticons | image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
          skin: 'oxide',
          images_upload_handler: async (blobInfo) => {
            const form = new FormData();
            form.append('file', blobInfo.blob(), blobInfo.filename());

            const res = await fetchWithAuth(
              `${process.env.NEXT_PUBLIC_CLIENT_TO_BACKEND_URL}/posts/uploads`,
              {
                method: 'POST',
                body: form,
                credentials: 'include',
              },
            );

            if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
            const json = await res.json();
            return json.location;
          },
          images_upload_credentials: true,
          paste_data_images: true,
          file_picker_types: 'image',
          save_onsavecallback: function (editor) {
            handleSubmit({ preventDefault: () => {} }); // event 객체 대충 만든 뒤 넘기기(에러 방지용)
          },
          codesample_global_prismjs: true,
          content_css: '/prism.css',
          codesample_languages: [
            { text: 'HTML/XML', value: 'markup' },
            { text: 'JavaScript', value: 'javascript' },
            { text: 'TypeScript', value: 'typescript' },
            { text: 'CSS', value: 'css' },
            { text: 'Python', value: 'python' },
            { text: 'Rust', value: 'rust' },
          ],
          automatic_uploads: true,
          content_css: 'default',
        }}
      />
      {/*<button name="submitbtn" disabled={!dirty || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Save'}
      </button>*/}
      {dirty && <p>You have unsaved content!</p>}
    </form>
  );
}
