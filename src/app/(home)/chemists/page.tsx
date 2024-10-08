import { lazy, Suspense } from 'react';

// Services
import { getChemists } from '@/services';
import { auth } from '@/config/auth';

// Types
import { DIRECTION, ROLE, SearchParams } from '@/types';

// Component
import { ChemistSkeleton } from '@/features/chemists/ChemistList/ChemistSkeleton';
import { PAGE_DEFAULT, PAGE_SIZE_CHEMISTS_DEFAULT } from '@/constants';

const ChemistList = lazy(() => import('@/features/chemists/ChemistList'));

export interface ChemistPageSearchParamsProps extends SearchParams {}

const ChemistPage = async ({
  searchParams,
}: {
  searchParams?: ChemistPageSearchParamsProps;
}) => {
  const { role = ROLE.NORMAL_USER } = (await auth())?.user || {};

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
  searchParamsAPI.set(
    'pagination[pageSize]',
    PAGE_SIZE_CHEMISTS_DEFAULT.toString(),
  );
  searchParamsAPI.set('sort[0]', `createdAt:${DIRECTION.DESC}`);
  // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  // await delay(100000);
  const { chemists, pagination } = await getChemists({
    searchParams: searchParamsAPI,
  });

  return (
    <Suspense fallback={<ChemistSkeleton />}>
      <ChemistList chemists={chemists} pagination={pagination} role={role} />
    </Suspense>
  );
};

export default ChemistPage;
