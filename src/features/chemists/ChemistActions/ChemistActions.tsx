'use client';

import { useDisclosure } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';

// Components
import { Button, Select } from '@/components/ui';
import ChemistModal from '../ChemistModal';

// Types
import { APIResponse, MetaResponse, ROLE, SpecialtyModel } from '@/types';

// Utils
import { transformSpecialtiesById, transformSpecialtiesByName } from '@/utils';

export type ChemistActionsProps = {
  specialties: Array<APIResponse<SpecialtyModel>>;
  role: string;
  defaultSpecialty?: string;
} & MetaResponse;
const ChemistActions = ({
  specialties,
  role,
  defaultSpecialty = '',
}: ChemistActionsProps) => {
  const searchParams = useSearchParams() ?? '';
  const pathname = usePathname() ?? '';
  const { replace } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );
  const specialtyOptionsById = transformSpecialtiesById(specialties);
  const specialtyOptionsByName = transformSpecialtiesByName(specialties);
  const [specialty, setSpecialty] = useState(
    new Set<string>([defaultSpecialty]),
  );

  const updateSearchParams = useCallback(
    (key: string, value: string) => {
      if (value) {
        params.set(key, value); // Update or add the key
      } else {
        params.delete(key); // Remove the key
      }

      replace(`${pathname}?${params}`);
    },
    [params, pathname, replace],
  );

  const handleSelectSpecialty = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;

      if (value !== specialty?.values().next().value) params.delete('page');

      if (value === 'all') {
        params.delete('specialty');
        replace(`${pathname}?${params}`);

        return;
      }

      const selectedSpecialty = specialtyOptionsByName.find(
        ({ key }) => key === value,
      );
      const { key = '' } = selectedSpecialty || {};

      setSpecialty(new Set([value]));
      updateSearchParams('specialty', key);
    },
    [
      params,
      pathname,
      replace,
      specialty,
      specialtyOptionsByName,
      updateSearchParams,
    ],
  );

  const isAdmin = role === ROLE.ADMIN;

  return (
    <div className="flex justify-between md:gap-4 mb-10 md:mb-0 ">
      <Select
        aria-label="Select Specialty"
        options={specialtyOptionsByName}
        selectedKeys={specialty}
        defaultSelectedKeys={specialtyOptionsByName[0].key}
        placeholder="Specialty"
        classNames={{
          innerWrapper: 'w-[180px]',
          trigger: 'w-[180px] h-[52px]',
          listbox: 'px-0',
        }}
        onChange={handleSelectSpecialty}
      />
      {isAdmin && (
        <Button className="font-medium h-[52px]" onClick={onOpen}>
          Create
        </Button>
      )}

      <ChemistModal
        isOpen={isOpen}
        onClose={onClose}
        specialtyOptions={specialtyOptionsById}
      />
    </div>
  );
};

export default memo(ChemistActions);
