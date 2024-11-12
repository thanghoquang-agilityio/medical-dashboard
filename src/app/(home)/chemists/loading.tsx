import { ChemistActionsSkeleton } from '@/features/chemists/ChemistActions/ChemistActionsSkeleton';
import { ChemistListSkeleton } from '@/features/chemists/ChemistList/ChemistSkeleton';

const Loading = () => {
  return (
    <>
      <ChemistActionsSkeleton />
      <ChemistListSkeleton />
    </>
  );
};

export default Loading;
