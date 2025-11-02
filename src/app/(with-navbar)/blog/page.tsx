import { getPosts } from '@/lib/server-actions/post';
import BlogClient from '../_components/BlogClient';
export default async function BlogPage() {
  const [resLatest, resTrending, resFeatured] = await Promise.all([
    getPosts(1, 5, 'theolee72'),
    getPosts(1, 5, 'theolee72'),
    getPosts(1, 5, 'theolee72'),
  ]);
  return (
    <BlogClient
      initialPostsLatest={resLatest?.data}
      initialPostsTrending={resTrending?.data}
      initialPostsFeatured={resFeatured?.data}
      total={resLatest?.pagination.total}
    ></BlogClient>
  );
}
