import { getSearch } from '@/lib/server-actions/search';
import SearchClient from '../_components/SearchClient';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const resolvedSearchParams = await searchParams;
  const fetchLimit = 1;
  if (resolvedSearchParams.q && resolvedSearchParams.page) {
    const initialData = await getSearch(
      resolvedSearchParams.q,
      1,
      Number(resolvedSearchParams.page) * fetchLimit,
    );
    return (
      <SearchClient
        initialQuery={resolvedSearchParams.q}
        initialData={initialData}
        fetchLimit={fetchLimit}
      />
    );
  } else {
    return <SearchClient fetchLimit={fetchLimit} />;
  }
}
