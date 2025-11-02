import Link from 'next/link';
import Image from 'next/image';
import { PostCardData } from '@/lib/server-actions/post';
export function truncateText(text: string, maxLength = 150) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export default function PostCard({ item }: { item: PostCardData }) {
  return (
    <Link
      href={`/posts/${item.id}`}
      key={item.id}
      className="flex flex-col gap-y-[24px] gap-x-[24px] md:flex-row"
    >
      <div className="relative flex-none w-full md:w-1/2 aspect-[3/2]">
        <Image
          src="https://theolee.net/static/uploads/test1.png"
          alt={item.title}
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="flex flex-col gap-y-[12px]">
        <div className="text-blue font-semibold text-[14px]">
          {`${new Date(item.createdAt).toLocaleDateString('en-US', { weekday: 'long' })}, ${new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short' })} ${new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric' })} ${new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric' })}`}
        </div>
        <div className="font-semibold text-[24px] leading-tight">
          {item.title}
        </div>
        <div className="text-textgray text-[16px]">
          {truncateText(item.summary)}
        </div>
      </div>
    </Link>
  );
}
