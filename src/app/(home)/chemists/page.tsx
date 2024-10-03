import { ChemistList } from '@/features/chemists/ChemistList';

import { MOCK_CHEMISTS_LIST } from '@/mocks/chemists';

const ChemistPage = () => {
  return (
    <>
      <ChemistList chemists={MOCK_CHEMISTS_LIST} />
    </>
  );
};

export default ChemistPage;
