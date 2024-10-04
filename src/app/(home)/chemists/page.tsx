import { lazy, Suspense } from 'react';

// Services
import { getChemists } from '@/services';

// Types
import { DIRECTION, SearchParams } from '@/types';

// Component
import ChemistListSkeleton from '@/features/chemists/ChemistList/ChemistListSkeleton';
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT } from '@/constants';
const ChemistList = lazy(() => import('@/features/chemists/ChemistList'));

export interface ChemistPageSearchParamsProps extends SearchParams {}

const ChemistPage = async ({
  searchParams,
}: {
  searchParams?: ChemistPageSearchParamsProps;
}) => {
  const { page = PAGE_DEFAULT } = searchParams as ChemistPageSearchParamsProps;

  const searchParamsAPI = new URLSearchParams();

  const CHEMISTS_SEARCH_PARAMS = ['avatar', 'specialtyId'];

  CHEMISTS_SEARCH_PARAMS.forEach((param, index) => {
    searchParamsAPI.set(
      `populate[users_permissions_user][populate][${index}]`,
      param,
    );
  });

  searchParamsAPI.set('pagination[page]', page.toString());
  searchParamsAPI.set('pagination[pageSize]', PAGE_SIZE_DEFAULT.toString());
  searchParamsAPI.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

  const { chemists, pagination } = await getChemists({
    searchParams: searchParamsAPI,
  });

  return (
    <Suspense fallback={<ChemistListSkeleton />}>
      <ChemistList chemists={chemists} pagination={pagination} />
    </Suspense>
  );
};

export default ChemistPage;
