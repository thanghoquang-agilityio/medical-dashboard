import { Suspense } from 'react';
import { Metadata } from 'next';

// Services
import { auth } from '@/config/auth';
import { getSpecialties } from '@/services';

// Types
import { DIRECTION, ROLE, SearchParams } from '@/types';

// Constants
import { PAGE_DEFAULT, PAGE_SIZE_CHEMISTS_DEFAULT } from '@/constants';

// Component
import { ChemistSkeleton } from '@/features/chemists/ChemistList/ChemistSkeleton';
import { InputSearch } from '@/components/ui';
import ChemistActions from '@/features/chemists/ChemistActions/ChemistActions';
import Chemists from '../../../features/chemists/ChemistList';

export interface ChemistPageSearchParamsProps extends SearchParams {}

export const metadata: Metadata = {
  title: 'Chemists',
  description: 'Chemists page for Medical Dashboard',
};

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
  } = searchParams || {};

  const searchParamsAPI = new URLSearchParams();

  const CHEMISTS_SEARCH_PARAMS = ['specialtyId'];

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

  const CHEMISTS_FILTER_PARAMS = [
    [search, `filters[$or][0][users_permissions_user][username][$containsi]`],
    [
      specialty,
      `filters[$or][0][users_permissions_user][specialtyId][name][$containsi]`,
    ],
  ];

  CHEMISTS_FILTER_PARAMS.forEach(([value, key]) => {
    if (value) searchParamsAPI.set(key, value);
  });

  const { specialties } = await getSpecialties({});

  return (
    <>
      <div className="flex flex-col mt-8 md:flex-row gap-4 md:mb-3">
        <InputSearch placeholder="Search Chemists" />
        <ChemistActions
          specialties={specialties}
          role={role}
          defaultSpecialty={specialty}
        />
      </div>
      <Suspense fallback={<ChemistSkeleton />} key={page + search + specialty}>
        <Chemists
          defaultSpecialty={specialty}
          role={role}
          searchParamsAPI={searchParamsAPI}
        />
      </Suspense>
    </>
  );
};

export default ChemistPage;
