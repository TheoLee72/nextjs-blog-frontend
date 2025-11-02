'use client';
import { getSearch } from '@/lib/server-actions/search';
import { PostCardData } from '@/lib/server-actions/post';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState, useEffect } from 'react';
import { SearchResponse } from '@/lib/server-actions/search';
import PostCard from './PostCard';
export default function SearchClient({
  initialQuery,
  initialData,
  fetchLimit,
}: {
  initialQuery?: string;
  initialData?: SearchResponse;
  fetchLimit: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<PostCardData[]>(initialData?.data || []);
  const [total, setTotal] = useState(initialData?.total || 0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [page, setPage] = useState(1);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const searchInput = formData.get('search') as string;
    // setSearchQuery(searchInput);
    setPage(1);
    //fetch search result
    const res = await getSearch(searchQuery, 1, fetchLimit);
    setPosts(res.data);
    setTotal(res.total);

    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery !== '') {
      params.set('q', searchQuery);
    }
    params.set('page', String(1));
    router.replace(`?${params.toString()}`);
  };
  const loadMorePosts = async () => {
    if (loading || posts.length >= total) {
      return;
    }
    setLoading(true);
    const res = await getSearch(searchQuery, page + 1, fetchLimit);
    setPosts((prev) => [...prev, ...res.data]);
    setPage((prev) => prev + 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page + 1));
    router.replace(`?${params.toString()}`);
    setLoading(false);
  };
  const hasMore = posts && posts.length < total;
  return (
    <>
      <div className="w-full h-[74px] flex flex-row justify-center items-center">
        <div className="relative w-[clamp(1px,100%,500px)] h-[44px] bg-[#ffffff] border-[1px] border-black rounded-[25px] flex flex-row justify-center">
          <Image
            src="/search.svg"
            alt="search"
            width={20}
            height={20}
            className="absolute top-[11px] left-[10px]"
          ></Image>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-row justify-center items-center"
          >
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-[40px] outline-none"
            ></input>
            <button type="submit" hidden></button>
          </form>
        </div>
      </div>
      {posts?.map((item) => (
        <PostCard item={item} key={item.id} />
      ))}
      {hasMore && (
        <div className="w-full flex flex-row justify-center items-center h-[100px]">
          {loading ? (
            <div className="w-[104px] h-[28px] border-[1px] border-gray rounded-[5px] font-semibold text-[14px] text-textgray flex flex-row justify-center items-center hover:bg-gray-200">
              Loading...
            </div>
          ) : (
            <button onClick={loadMorePosts} className="cursor-pointer">
              <div className="w-[104px] h-[28px] border-[1px] border-gray rounded-[5px] font-semibold text-[14px] flex flex-row justify-center items-center hover:bg-gray-200">
                Load More
              </div>
            </button>
          )}
        </div>
      )}
    </>
  );
}
