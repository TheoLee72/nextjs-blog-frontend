import { getMe } from '@/lib/server-component/user';
import CookieUpdater from '../_components/CookieUpdater';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProfilePage() {
  const data = await getMe();
  return (
    <>
      <div className="w-full h-[74px] text-2xl md:text-3xl md:text-center">
        Manage Your Profile
      </div>
      <div className="grid grid-rows-12 md:grid-cols-[1fr_4fr] md:grid-rows-6">
        <div className="h-[40px] text-[13px] flex flex-col justify-center border-t border-gray">
          Username
        </div>
        <div className="h-[40px] md:border-t border-gray flex flex-row justify-between items-center">
          {data.data?.user.name}
          <Link href={`/auth/update/username/${data.data?.user.name}`}>
            <Image
              src="/Right.svg"
              alt="update"
              width={25}
              height={25}
              className="relative right-[20px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="h-[40px] text-[13px] flex flex-col justify-center border-t border-gray">
          Email
        </div>
        <div className="h-[40px] md:border-t border-gray flex flex-row justify-between items-center">
          {data.data?.user.email}
          <Link href={`/auth/update/email/${data.data?.user.email}`}>
            <Image
              src="/Right.svg"
              alt="update"
              width={25}
              height={25}
              className="relative right-[20px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="h-[40px] text-[13px] flex flex-col justify-center border-t border-gray">
          password
        </div>
        <div className="h-[40px] md:border-t border-gray flex flex-row justify-between items-center">
          *********
          <Link href="/auth/update/password">
            <Image
              src="/Right.svg"
              alt="update"
              width={25}
              height={25}
              className="relative right-[20px] cursor-pointer"
            />
          </Link>
        </div>
        <div className="h-[40px] text-[13px] flex flex-col justify-center border-t border-gray">
          my posts
        </div>
        <div className="h-[40px] md:border-t border-gray flex flex-row justify-between items-center">
          {data.data?.post_count}
          <Image
            src="/Right.svg"
            alt="update"
            width={25}
            height={25}
            className="relative right-[20px] cursor-pointer"
          />
        </div>
        <div className="h-[40px] text-[13px] flex flex-col justify-center border-t border-gray">
          my reviews
        </div>
        <div className="h-[40px] md:border-t border-gray flex flex-row justify-between items-center">
          {data.data?.comment_count}
          <Image
            src="/Right.svg"
            alt="update"
            width={25}
            height={25}
            className="relative right-[20px] cursor-pointer"
          />
        </div>
        <div className="h-[40px] border-t border-gray"></div>
        <div className="h-[40px] md:border-t border-gray"></div>
        <CookieUpdater newAccessToken={data.access_token} />
      </div>
    </>
  );
}
