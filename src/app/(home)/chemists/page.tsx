import { lazy, Suspense } from 'react';

// Services
import { auth } from '@/config/auth';
import { getChemists, getSpecialties } from '@/services';

// Types
import { DIRECTION, ROLE, SearchParams } from '@/types';

// Constants
import { PAGE_DEFAULT, PAGE_SIZE_CHEMISTS_DEFAULT } from '@/constants';

// Component
import { ChemistSkeleton } from '@/features/chemists/ChemistList/ChemistSkeleton';

const ChemistList = lazy(() => import('@/features/chemists/ChemistList'));

export interface ChemistPageSearchParamsProps extends SearchParams {}

const ChemistPage = async ({
  searchParams,
}: {
  searchParams?: ChemistPageSearchParamsProps;
}) => {
  const { role = ROLE.NORMAL_USER } = (await auth())?.user || {};

  const {
    page = PAGE_DEFAULT,
    search = '',
    specialty = '',
  } = searchParams as ChemistPageSearchParamsProps;

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

  if (specialty) {
    searchParamsAPI.set(
      `filters[$or][0][users_permissions_user][specialtyId][name][$containsi]`,
      specialty,
    );
  }
  const { chemists, pagination } = await getChemists({
    searchParams: searchParamsAPI,
  });

  const { specialties } = await getSpecialties({});

  return (
    <Suspense fallback={<ChemistSkeleton />}>
      <ChemistList
        chemists={chemists}
        pagination={pagination}
        defaultSpecialty={specialty}
        role={role}
        specialties={specialties}
      />
    </Suspense>
  );
};

export default ChemistPage;
