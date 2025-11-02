'use client';
import { Post } from '@/lib/server-actions/post';
import { getPost } from '@/lib/client-actions/post';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
const EditorClient = dynamic(() => import('../../_components/EditorClient'), {
  ssr: false,
});

export default function PostEditPage() {
  const params = useParams<{ postId: string }>();
  const initPostId = useRef(params.postId);
  const [data, setData] = useState<Post>();
  const [status, setStatus] = useState<'fail' | 'success' | 'loading' | 'new'>(
    'loading',
  );
  useEffect(() => {
    const fetchPost = async () => {
      if (initPostId.current === 'new') {
        setStatus('new');
        return;
      }
      const response = await getPost(initPostId.current);
      if (
        response.status === 'success' &&
        response.data?.userUsername === localStorage.getItem('username')
      ) {
        setData(response.data);
        setStatus('success');
      } else {
        setStatus('fail');
      }
    };
    fetchPost();
  }, []);
  return (
    <>
      {status === 'success' ? (
        <EditorClient data={data} />
      ) : status === 'new' ? (
        <EditorClient data={undefined} />
      ) : status === 'fail' ? (
        <div className="flex flex-row items-center justify-center h-[calc(100vh-72px)]">
          Access Denied
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center h-[calc(100vh-72px)]">
          Loading
        </div>
      )}
    </>
  );
}
