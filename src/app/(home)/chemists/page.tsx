import { lazy, Suspense } from 'react';

// Services
import { getChemists, getSpecialties } from '@/services';

// Types
import { DIRECTION, SearchParams } from '@/types';

// Constants
import { PAGE_DEFAULT, PAGE_SIZE_CHEMISTS_DEFAULT } from '@/constants';

// Component
import ChemistListSkeleton from '@/features/chemists/ChemistList/ChemistListSkeleton';
const ChemistList = lazy(() => import('@/features/chemists/ChemistList'));

export interface ChemistPageSearchParamsProps extends SearchParams {}

const ChemistPage = async ({
  searchParams,
}: {
  searchParams?: ChemistPageSearchParamsProps;
}) => {
  const { page = PAGE_DEFAULT, search } =
    searchParams as ChemistPageSearchParamsProps;

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

  if (search) {
    searchParamsAPI.set(
      `filters[$or][0][users_permissions_user][username][$containsi]`,
      search,
    );
  }
  const { chemists, pagination } = await getChemists({
    searchParams: searchParamsAPI,
  });

  const { specialties } = await getSpecialties({});

  return (
    <Suspense fallback={<ChemistListSkeleton />}>
      <ChemistList
        chemists={chemists}
        pagination={pagination}
        specialties={specialties}
      />
    </Suspense>
  );
};

export default ChemistPage;
