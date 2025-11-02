'use server';
export type PostCardData = {
  id: number;
  userUsername: string;
  summary: string;
  title: string;
  createdAt: string; // ISO 날짜 문자열
  updatedAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type PostsResponse = {
  status: string;
  data: PostCardData[];
  pagination: Pagination;
};

export async function getPosts(
  page: number,
  limit: number,
  user_username: string,
): Promise<PostsResponse | null> {
  try {
    const response = await fetch(
      `${process.env.INTERNAL_BACKEND_URL}/posts?page=${page}&limit=${limit}&user_username=${user_username}`,
      { cache: 'no-store' },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error(data.message);
      return null;
    }
  } catch (error) {
    console.error('Next.js error');
    return null;
  }
}

export type Post = {
  id: number;
  userUsername: string;
  content: string;
  summary: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export async function getPost(
  post_id: string,
): Promise<{ status: string; data?: Post; message?: string }> {
  try {
    const response = await fetch(
      `${process.env.INTERNAL_BACKEND_URL}/posts/${post_id}`,
      { cache: 'no-store' },
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error(data.message);
      return data;
    }
  } catch (error) {
    console.error('Next.js error');
    return { status: 'fail', message: 'Next.js error' };
  }
}
