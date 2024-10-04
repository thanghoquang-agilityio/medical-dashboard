import { memo } from 'react';
// Types
import { APIResponse, ChemistModel, MetaResponse } from '@/types';

// Components
import ChemistCard from '../ChemistCard';
import { Text } from '@/components/ui';

// Constants
import { RESULT_NOT_FOUND } from '@/constants';

export type ChemistListProps = {
  chemists: Array<APIResponse<ChemistModel>>;
} & MetaResponse;

const ChemistList = memo(({ chemists }: ChemistListProps) => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-[2048px]:grid-cols-4 justify-evenly justify-items-center">
      {chemists.length > 0 ? (
        chemists.map((chemist) => (
          <ChemistCard
            key={chemist.id}
            {...chemist.attributes.users_permissions_user.data.attributes}
          />
        ))
      ) : (
        <Text size="lg" variant="description">
          {RESULT_NOT_FOUND}
        </Text>
      )}
    </div>
  );
});

ChemistList.displayName = 'ChemistList';

export default ChemistList;
