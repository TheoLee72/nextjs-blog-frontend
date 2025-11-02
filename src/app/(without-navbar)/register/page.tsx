'use client';
import { postRegister } from '@/lib/client-actions/auth';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export type FormStatus = 'idle' | 'error';

export default function RegisterPageClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formStatus, setFormStatus] = useState<{ [key: string]: FormStatus }>({
    username: 'idle',
    email: 'idle',
    password: 'idle',
    confirmPassword: 'idle',
  });

  const [formError, setFormError] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'confirmPassword' || name === 'password') {
      setFormStatus((prev) => ({
        ...prev,
        password: 'idle',
        confirmPassword: 'idle',
      }));
    } else {
      setFormStatus((prev) => ({ ...prev, [name]: 'idle' }));
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus({
      username: 'idle',
      email: 'idle',
      password: 'idle',
      confirmPassword: 'idle',
    });
    setLoading(true);

    const result = await postRegister(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword,
    );
    if (result.status === 'success') {
      router.push(`auth/email/confirm-request/${formData.email}`);
    } else {
      if (result.message.includes('username')) {
        setFormStatus((prev) => ({ ...prev, username: 'error' }));
        if (
          result.message.includes(
            'duplicate key value violates unique constraint',
          )
        ) {
          setFormError((prev) => ({
            ...prev,
            username: 'Username already exists',
          }));
        } else if (result.message.includes('Name is required')) {
          setFormError((prev) => ({
            ...prev,
            username: 'Username is required',
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            username: 'Internal server error',
          }));
        }
      }
      if (result.message.includes('email')) {
        setFormStatus((prev) => ({ ...prev, email: 'error' }));
        if (result.message.includes('Email is required')) {
          setFormError((prev) => ({
            ...prev,
            email: 'Email is required',
          }));
        } else if (result.message.includes('Email is invalid')) {
          setFormError((prev) => ({
            ...prev,
            email: 'Invalid email address',
          }));
        } else if (
          result.message.includes(
            'duplicate key value violates unique constraint',
          )
        ) {
          setFormError((prev) => ({
            ...prev,
            email: 'Email already exists',
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            email: 'Internal server error',
          }));
        }
      }
      if (result.message.includes('password:')) {
        setFormStatus((prev) => ({ ...prev, password: 'error' }));
        if (result.message.includes('Password must be at least 6 characters')) {
          setFormError((prev) => ({
            ...prev,
            password: 'Password must be at least 6 characters',
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            password: 'Internal server error',
          }));
        }
      }
      if (result.message.includes('password_confirm:')) {
        setFormStatus((prev) => ({ ...prev, confirmPassword: 'error' }));
        if (result.message.includes('Confirm Password is required')) {
          setFormError((prev) => ({
            ...prev,
            confirmPassword: 'Confirm Password is required',
          }));
        } else if (result.message.includes('passwords do not match')) {
          setFormStatus((prev) => ({ ...prev, password: 'error' }));
          setFormError((prev) => ({
            ...prev,
            confirmPassword: 'passwords do not match',
          }));
        } else {
          setFormError((prev) => ({
            ...prev,
            confirmPassword: 'Internal server error',
          }));
        }
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        Create your account
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[24px] ${formStatus.username === 'error' ? 'text-red' : 'text-black'}`}
        >
          {formStatus.username === 'error' ? formError.username : 'Username'}
        </div>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Enter your username"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.username === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${formStatus.email === 'error' ? 'text-red' : 'text-black'}`}
        >
          {formStatus.email === 'error' ? formError.email : 'Email'}
        </div>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Enter your email address"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.email === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${formStatus.password === 'error' ? 'text-red' : 'text-black'}`}
        >
          {formStatus.password === 'error' ? formError.password : 'Password'}
        </div>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Enter your password"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.password === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div
          className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${formStatus.confirmPassword === 'error' ? 'text-red' : 'text-black'}`}
        >
          {formStatus.confirmPassword === 'error'
            ? formError.confirmPassword
            : 'Confirm Password'}
        </div>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.confirmPassword === 'error' ? 'border-red' : 'border-gray'}`}
        ></input>
        <div className="border-t w-full border-[1px] border-gray mt-[16px]"></div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[36px] bg-blue rounded-[5px] text-white font-semibold text-[14px] mt-[16px] cursor-pointer"
        >
          {loading ? 'Creating...' : 'Create your account'}
        </button>
        <div className="w-full text-center justify-start mt-[4px]">
          <span className="text-[14px] text-sm font-normal">
            Already have an account?{' '}
          </span>
          <Link href="/login">
            <span className="text-[14px] text-sm font-semibold underline">
              Login
            </span>
          </Link>
        </div>
      </form>
    </>
  );
}
