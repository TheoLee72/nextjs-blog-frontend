'use client';
import { useRouter } from 'next/navigation';
export default function ViewMore() {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/blog')} className="cursor-pointer">
      <p className="text-[12px] text-blue">View More</p>
    </button>
  );
}
