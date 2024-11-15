import { Button, InputSearch, Select } from '@/components/ui';

// Types
import { ROLE } from '@/types';

// Config
import { auth } from '@/config/auth';

export const ChemistActionsSkeleton = async () => {
  const { role = ROLE.NORMAL_USER } = (await auth())?.user || {};
  const isAdmin = role === ROLE.ADMIN;

  return (
    <div className="flex flex-col mt-3 md:flex-row gap-4 md:mb-8">
      <InputSearch placeholder="Search Appointments" isDisabled={true} />
      <div className="flex justify-between md:gap-4 mb-10 md:mb-0 ">
        <Select
          aria-label="Select Specialty"
          options={[]}
          isDisabled={true}
          placeholder="Specialty"
          classNames={{
            innerWrapper: 'w-[180px]',
            trigger: 'w-[180px] h-[52px]',
            listbox: 'px-0',
          }}
        />
        {isAdmin && (
          <Button className="h-[52px] font-medium" isDisabled={true}>
            Create
          </Button>
        )}
      </div>
    </div>
  );
};
