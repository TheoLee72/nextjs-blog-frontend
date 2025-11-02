'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function EditButton({
  id,
  username,
}: {
  id: number;
  username: string;
}) {
  const router = useRouter();
  const [editBoolean, setEditBoolean] = useState(false);
  useEffect(() => {
    if (username === localStorage.getItem('username')) {
      setEditBoolean(true);
    } else {
      setEditBoolean(false);
    }
  }, [username]);
  return (
    <>
      {editBoolean && (
        <span
          onClick={() => {
            router.push(`/edit/${id}`);
          }}
          className="ml-[5px] cursor-pointer underline"
        >
          Edit
        </span>
      )}
    </>
  );
}
