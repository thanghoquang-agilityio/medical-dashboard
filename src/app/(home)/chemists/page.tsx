import { lazy, Suspense } from 'react';

// Services
import { getChemists } from '@/services';

// Component
import ChemistListSkeleton from '@/features/chemists/ChemistList/ChemistListSkeleton';
const ChemistList = lazy(() => import('@/features/chemists/ChemistList'));

const ChemistPage = async () => {
  const searchParamsAPI = new URLSearchParams();

  const CHEMISTS_SEARCH_PARAMS = ['avatar', 'specialtyId'];

  CHEMISTS_SEARCH_PARAMS.forEach((param, index) => {
    searchParamsAPI.set(
      `populate[users_permissions_user][populate][${index}]`,
      param,
    );
  });

  const { chemists } = await getChemists({
    searchParams: searchParamsAPI,
  });

  return (
    <Suspense fallback={<ChemistListSkeleton />}>
      <ChemistList chemists={chemists} />
    </Suspense>
  );
};

export default ChemistPage;
