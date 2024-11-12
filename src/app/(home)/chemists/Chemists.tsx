// Components
import ChemistList from '@/features/chemists/ChemistList';

// Services
import { getChemists, getSpecialties } from '@/services';

// Types
import { MetaResponse } from '@/types';

interface ChemistsProps extends MetaResponse {
  searchParamsAPI: URLSearchParams;
  role: string;
  defaultSpecialty?: string;
}

const Chemists = async ({
  searchParamsAPI,
  role,
  defaultSpecialty,
}: ChemistsProps) => {
  const { specialties } = await getSpecialties({});
  const { chemists, pagination } = await getChemists({
    searchParams: searchParamsAPI,
  });

  return (
    <ChemistList
      chemists={chemists}
      pagination={pagination}
      defaultSpecialty={defaultSpecialty}
      role={role}
      specialties={specialties}
    />
  );
};

export default Chemists;
