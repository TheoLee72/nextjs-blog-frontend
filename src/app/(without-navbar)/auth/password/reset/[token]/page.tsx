'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { FormStatus } from '@/app/(without-navbar)/register/page';
import { postResetPassword } from '@/lib/client-actions/auth';
export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const [globalStatus, setGlobalStatus] = useState<
    'idle' | 'loading' | 'success' | 'token-fail'
  >('idle');
  const [formData, setFormData] = useState({
    new_password: '',
    new_password_confirm: '',
  });
  const [formStatus, setFormStatus] = useState<{ [key: string]: FormStatus }>({
    new_password: 'idle',
    new_password_confirm: 'idle',
  });
  const [formError, setFormError] = useState({
    new_password: '',
    new_password_confirm: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormStatus({
      new_password: 'idle',
      new_password_confirm: 'idle',
    });
  };
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus({ new_password: 'idle', new_password_confirm: 'idle' });
    setGlobalStatus('loading');
    const result = await postResetPassword(
      params.token,
      formData.new_password,
      formData.new_password_confirm,
    );
    if (result.status === 'success') {
      setGlobalStatus('success');
    } else {
      if (result.message.includes('token')) {
        setGlobalStatus('token-fail');
      } else {
        setGlobalStatus('idle');
        if (result.message.includes('new_password:')) {
          setFormStatus((prev) => ({ ...prev, new_password: 'error' }));
          if (
            result.message.includes(
              'new password must be at least 6 characters',
            )
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
          if (
            result.message.includes(
              'new password confirm must be at least 6 characters',
            )
          ) {
            setFormError((prev) => ({
              ...prev,
              new_password_confirm:
                'new password confirm must be at least 6 characters',
            }));
          } else if (result.message.includes('new passwords do not match')) {
            setFormStatus((prev) => ({ ...prev, new_password: 'error' }));
            setFormError((prev) => ({
              ...prev,
              new_password_confirm: 'new passwords do not match',
            }));
          } else {
            setFormError((prev) => ({
              ...prev,
              new_password_confirm: 'Internal server error',
            }));
          }
        }
      }
    }
  }
  return (
    <>
      <div className="font-semibold text-[32px] h-[72px] flex flex-col justify-center">
        {globalStatus === 'success'
          ? 'It has been reset!'
          : globalStatus === 'token-fail'
            ? 'Invalid or Expired'
            : 'Reset password'}
      </div>
      <div className="font-semibold text-[14px] h-[195px] flex flex-col justify-start mt-[24px] leading-loose">
        {globalStatus === 'success' ? (
          <Link href="/login">
            <div className="font-semibold text-[14px] h-[24px] flex flex-col justify-center underline">
              Login
            </div>
          </Link>
        ) : globalStatus === 'token-fail' ? (
          <Link href="/auth/password/forgot-submit">
            <div className="font-semibold text-[14px] h-[24px] flex flex-col justify-center underline">
              Resend reset link
            </div>
          </Link>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center ${formStatus.new_password === 'error' ? 'text-red' : 'text-black'}`}
            >
              {formStatus.new_password === 'error'
                ? formError.new_password
                : 'New password'}
            </div>
            <input
              type="password"
              name="new_password"
              placeholder="Enter your new password"
              disabled={globalStatus === 'loading'}
              onChange={handleChange}
              className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.new_password === 'error' ? 'border-red' : 'border-gray'}`}
            ></input>
            <div
              className={`font-semibold text-[14px] h-[24px] flex flex-col justify-center mt-[9px] ${formStatus.new_password_confirm === 'error' ? 'text-red' : 'text-black'}`}
            >
              {formStatus.new_password_confirm === 'error'
                ? formError.new_password_confirm
                : 'Confirm password'}
            </div>
            <input
              type="password"
              name="new_password_confirm"
              placeholder="Enter your confirm password"
              disabled={globalStatus === 'loading'}
              onChange={handleChange}
              className={`focus:outline-none border-[1px] h-[36px] w-full rounded-[5px] px-[13px] py-[6px] text-[14px] shadow-sm ${formStatus.new_password_confirm === 'error' ? 'border-red' : 'border-gray'}`}
            ></input>
            <div className="border-t w-full border-[1px] border-gray mt-[154px]"></div>
            <button
              type="submit"
              className="w-full h-[36px] bg-blue rounded-[5px] text-white font-semibold text-[14px] mt-[16px] cursor-pointer"
              disabled={globalStatus === 'loading'}
            >
              Submit new password
            </button>
          </form>
        )}
      </div>
    </>
  );
}
