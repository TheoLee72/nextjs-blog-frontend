'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { putPassword } from '@/lib/client-actions/user';
import { Preahvihear } from 'next/font/google';
export type FormStatus = 'idle' | 'error';

export default function UpdatePasswordPageClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    new_password: '',
    new_password_confirm: '',
    old_password: '',
  });

  const [formStatus, setFormStatus] = useState<{ [key: string]: FormStatus }>({
    new_password: 'idle',
    new_password_confirm: 'idle',
    old_password: 'idle',
  });

  const [formError, setFormError] = useState({
    new_password: '',
    new_password_confirm: '',
    old_password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'new_password_confirm' || name === 'new_password') {
      setFormStatus((prev) => ({
        ...prev,
        new_password: 'idle',
        new_password_confirm: 'idle',
      }));
    } else {
      setFormStatus((prev) => ({ ...prev, [name]: 'idle' }));
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus({
      new_password: 'idle',
      new_password_confirm: 'idle',
      old_password: 'idle',
    });
    setLoading(true);

    const result = await putPassword(
      formData.new_password,
      formData.new_password_confirm,
      formData.old_password,
    );
    if (result.status === 'success') {
      router.push('/profile');
    } else {
      if (result.message.includes('new_password:')) {
        setFormStatus((prev) => ({ ...prev, new_password: 'error' }));
        if (
          result.message.includes('new password must be at least 6 characters')
        ) {
          setFormError((prev) => ({
            ...prev,
            new_password: 'new password must be at least 6 characters',
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            new_password: 'Internal server error',
          }));
        }
      }
      if (result.message.includes('new_password_confirm:')) {
        setFormStatus((prev) => ({ ...prev, new_password_confirm: 'error' }));
        if (result.message.includes('new passwords do not match')) {
          setFormStatus((prev) => ({ ...prev, new_password: 'error' }));
          setFormError((prev) => ({
            ...prev,
            new_password_confirm: 'passwords do not match',
          }));
        } else if (
          result.message.includes(
            'new password confirm must be at least 6 characters',
          )
        ) {
          setFormError((prev) => ({
            ...prev,
            new_password_confirm:
              'Confirm Password must be at least 6 characters',
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            new_password_confirm: 'Internal server error',
          }));
        }
      }
      if (result.message.includes('Old password')) {
        setFormStatus((prev) => ({ ...prev, old_password: 'error' }));
        if (
          result.message.includes('Old password must be at least 6 characters')
        ) {
          setFormError((prev) => ({
            ...prev,
            old_password: 'Old password must be at least 6 characters',
          }));
        } else if (result.message.includes('Old password is incorrect')) {
          setFormError((prev) => ({
            ...prev,
            old_password: 'Old password is incorrect',
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            old_password: 'Internal server error',
          }));
        }
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        Change your password
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[24px] ${formStatus.new_password === 'error' ? 'text-red' : 'text-black'}`}
        >
          {formStatus.new_password === 'error'
            ? formError.new_password
            : 'New password'}
        </div>
        <input
          type="password"
          name="new_password"
          onChange={handleChange}
          value={formData.new_password}
          placeholder="Enter your new password"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.new_password === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${formStatus.new_password_confirm === 'error' ? 'text-red' : 'text-black'}`}
        >
          {formStatus.new_password_confirm === 'error'
            ? formError.new_password_confirm
            : 'Confirm new password'}
        </div>
        <input
          type="password"
          name="new_password_confirm"
          onChange={handleChange}
          value={formData.new_password_confirm}
          placeholder="Confirm your new password"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.new_password_confirm === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${formStatus.old_password === 'error' ? 'text-red' : 'text-black'}`}
        >
          {formStatus.old_password === 'error'
            ? formError.old_password
            : 'Old password'}
        </div>
        <input
          type="password"
          name="old_password"
          onChange={handleChange}
          value={formData.old_password}
          placeholder="Enter your old password"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.old_password === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div className="border-t w-full border-[1px] border-gray mt-[85px]"></div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[36px] bg-blue rounded-[5px] text-white font-semibold text-[14px] mt-[16px] cursor-pointer"
        >
          {loading ? 'Submitting...' : 'Submit new password'}
        </button>
      </form>
    </>
  );
}
