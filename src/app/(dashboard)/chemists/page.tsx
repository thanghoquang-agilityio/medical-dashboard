import ChemistCard from '@/features/chemists/ChemistCard';
import { MOCK_CHEMISTS_LIST } from '@/mocks/chemists';

const ChemistPage = () => {
  return (
    <>
      <h1 className="text-lg font-semibold">Welcome to Chemist page</h1>
      <ChemistCard
        {...MOCK_CHEMISTS_LIST[0].attributes.users_permissions_user.data
          .attributes}
      />
    </>
  );
};

export default ChemistPage;
