'use server';
import { Post } from '../server-actions/post';
export interface SearchResponse {
  data: Post[];
  total: number;
}
export async function getSearch(
  searchInput: string,
  page: number,
  limit: number,
): Promise<SearchResponse> {
  try {
    const response = await fetch(
      `${process.env.INTERNAL_BACKEND_URL}/search?q=${searchInput}&page=${page}&limit=${limit}`,
      { cache: 'no-store' },
    );
    const data = await response.json();
    if (response.ok) {
      return { data: data.data, total: data.pagination.total };
    } else {
      console.error(data.message);
      return { data: [], total: 0 };
    }
  } catch (error) {
    console.error('Next.js error');
    return { data: [], total: 0 };
  }
}
