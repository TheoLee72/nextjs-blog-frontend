import ViewMore from './_components/ViewMore';
import { getPosts } from '@/lib/server-actions/post';
import Image from 'next/image';
import Link from 'next/link';
import PostCard from './_components/PostCard';

export default async function Home() {
  const res = await getPosts(1, 5, 'theolee72');
  const posts = res?.data;
  return (
    <>
      <div className="w-full h-[284px] flex flex-col justify-between items-start my-[74px] md:items-center">
        <p className="font-serif font-normal text-[18px] md:text-[30px]">
          In an AI-driven world,
        </p>
        <p className="font-serif font-normal text-[18px] md:text-[30px]">
          true agency
        </p>
        <p className="font-serif font-normal text-[18px] md:text-[30px]">
          and the courage to act
        </p>
        <p className="font-serif font-normal text-[18px] md:text-[30px]">
          still belong to us.
        </p>
        <p className="text-lg font-serif font-semibold text-[18px] md:text-[30px]">
          Stay flexible, keep evolving!
        </p>
      </div>
      <div className="flex flex-col gap-y-[25px]">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="font-semibold text-[24px] leading-tight">Latest</p>
          <ViewMore />
        </div>
        {posts?.map((item) => (
          <PostCard item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
