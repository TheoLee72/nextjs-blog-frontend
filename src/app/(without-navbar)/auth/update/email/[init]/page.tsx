'use client';
import { FormEvent, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { putEmail } from '@/lib/client-actions/user';
export default function UpdateEmailPageClient() {
  const router = useRouter();
  const params = useParams<{ init: string }>();
  const initEmail = decodeURIComponent(params.init);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setStatus('idle');
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('idle');
    setLoading(true);
    if (email === initEmail) {
      setStatus('error');
      setError('Email unchanged');
    } else {
      const result = await putEmail(email);
      if (result.status === 'success') {
        router.push(`/auth/update/email-request/${email}`); //수정
      } else {
        setStatus('error');
        if (result.message.includes('email: Email is required')) {
          setError('Email is required');
        } else if (result.message.includes('email: Validation error')) {
          setError('Invalid email address');
        } else if (result.message.includes('Email already exists')) {
          setError('Email already exists');
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
        Change email
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[24px] ${status === 'error' ? 'text-red' : 'text-black'}`}
        >
          {status === 'error' ? error : 'New email'}
        </div>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={email}
          disabled={loading}
          placeholder="Enter your new email"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${status === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div className="border-t w-full border-[1px] border-gray mt-[223px]"></div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[36px] bg-blue rounded-[5px] text-white font-semibold text-[14px] mt-[16px] cursor-pointer"
        >
          {loading ? 'Submitting...' : 'Submit new email'}
        </button>
      </form>
    </>
  );
}
