'use client';
import { getPosts, PostCardData } from '@/lib/server-actions/post';
import { useState } from 'react';
import PostCard from './PostCard';
interface BlogClientProps {
  initialPostsLatest?: PostCardData[];
  initialPostsTrending?: PostCardData[];
  initialPostsFeatured?: PostCardData[];
  total?: number;
}
type TabType = 'latest' | 'trending' | 'featured';

export default function BlogClient({
  initialPostsLatest = [],
  initialPostsTrending = [],
  initialPostsFeatured = [],
  total = 0,
}: BlogClientProps) {
  const [latestPosts, setLatestPosts] = useState(initialPostsLatest);
  const [latestPage, setLatestPage] = useState(1);
  const [trendingPosts, setTrendingPosts] = useState(initialPostsTrending);
  const [trendingPage, setTrendingPage] = useState(1);
  const [featuredPosts, setFeaturedPosts] = useState(initialPostsFeatured);
  const [featuredPage, setFeaturedPage] = useState(1);
  const [tab, setTab] = useState<TabType>('latest');
  const [loading, setLoading] = useState(false);

  const loadMorePosts = async (tabType: TabType) => {
    if (loading) return;

    setLoading(true);
    try {
      let page;
      switch (tabType) {
        case 'latest':
          page = latestPage;
          break;
        case 'trending':
          page = trendingPage;
          break;
        case 'featured':
          page = featuredPage;
          break;
      }

      const newPostsResponse = await getPosts(page + 1, 5, 'theolee72');

      if (newPostsResponse?.data) {
        switch (tabType) {
          case 'latest':
            setLatestPosts((prevPosts) => [
              ...prevPosts,
              ...newPostsResponse.data,
            ]);
            setLatestPage((p) => p + 1);
            break;
          case 'trending':
            setTrendingPosts((prevPosts) => [
              ...prevPosts,
              ...newPostsResponse.data,
            ]);
            setTrendingPage((p) => p + 1);
            break;
          case 'featured':
            setFeaturedPosts((prevPosts) => [
              ...prevPosts,
              ...newPostsResponse.data,
            ]);
            setFeaturedPage((p) => p + 1);
            break;
        }
      }
    } catch (error) {
      console.error('Failed to load more posts:', error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const posts =
    tab === 'latest'
      ? latestPosts
      : tab === 'trending'
        ? trendingPosts
        : featuredPosts;

  const hasMore = posts && posts.length < total;

  return (
    <>
      <div className="w-full h-[74px]">
        <div className="w-full flex flex-row justify-around pt-[16px] text-[16px] leading-loose">
          <button
            onClick={() => {
              setTab('latest');
            }}
            className="cursor-pointer"
          >
            <div
              className={`w-[70px] ${tab === 'latest' ? 'font-semibold' : ''}`}
            >
              Latest
            </div>
          </button>
          <button
            onClick={() => {
              setTab('trending');
            }}
            className="cursor-pointer"
          >
            <div
              className={`w-[70px] ${tab === 'trending' ? 'font-semibold' : ''}`}
            >
              Trending
            </div>
          </button>
          <button
            onClick={() => {
              setTab('featured');
            }}
            className="cursor-pointer"
          >
            <div
              className={`w-[70px] ${tab === 'featured' ? 'font-semibold' : ''}`}
            >
              Featured
            </div>
          </button>
        </div>
        <div
          className={`flex flex-col ${tab === 'latest' ? 'items-start' : tab === 'trending' ? 'items-center' : 'items-end'}`}
        >
          <div className="w-full border-t mt-[10px] border-gray"></div>
          <div className="w-1/3 border-t border-black"></div>
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
            <button
              onClick={() => loadMorePosts(tab)}
              className="cursor-pointer"
            >
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
