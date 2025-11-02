'use client';
import { FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { putUsername } from '@/lib/client-actions/user';
export default function UpdateUsernameClient() {
  const router = useRouter();
  const params = useParams<{ init: string }>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error'>('idle');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setStatus('idle');
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('idle');
    setLoading(true);
    if (name === params.init) {
      setStatus('error');
      setError('Username unchanged');
    } else {
      const result = await putUsername(name);
      if (result.status === 'success') {
        router.push('/profile');
      } else {
        setStatus('error');
        if (result.message.includes('name: Name is required')) {
          setError('Username is required');
        } else if (
          result.message.includes(
            'duplicate key value violates unique constraint',
          )
        ) {
          setError('Username already exists');
        } else {
          setError('Internal server error');
        }
      }
    }
    setLoading(false);
  }
  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        Change username
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[24px] ${status === 'error' ? 'text-red' : 'text-black'}`}
        >
          {status === 'error' ? error : 'New username'}
        </div>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          disabled={loading}
          placeholder="Enter your new username"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${status === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div className="border-t w-full border-[1px] border-gray mt-[223px]"></div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[36px] bg-blue rounded-[5px] text-white font-semibold text-[14px] mt-[16px] cursor-pointer"
        >
          {loading ? 'Submitting...' : 'Submit new username'}
        </button>
      </form>
    </>
  );
}
