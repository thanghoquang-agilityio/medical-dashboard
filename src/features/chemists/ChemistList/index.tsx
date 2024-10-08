'use client';

import { useDisclosure } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Key,
  lazy,
  memo,
  Suspense,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from 'react';

// Types
import {
  APIResponse,
  ChemistModel,
  MetaResponse,
  SpecialtyModel,
} from '@/types';

// Components
import { Button, InputSearch, MenuDropdown, Text } from '@/components/ui';
import { CategoryIcon } from '@/icons';
import ChemistCard from '../ChemistCard';
import ChemistModal from '../ChemistModal';
import { ChemistListSkeleton } from './ChemistSkeleton';

// Utils
import { formatString, transformSpecialties } from '@/utils';

// Constants
import { PAGE_DEFAULT, RESULT_NOT_FOUND } from '@/constants';

const Pagination = lazy(() => import('@/components/ui/Pagination'));

export type ChemistListProps = {
  chemists: Array<APIResponse<ChemistModel>>;
  specialties: Array<APIResponse<SpecialtyModel>>;
  defaultSpecialty?: string;
} & MetaResponse;

const ChemistList = memo(
  ({
    chemists,
    pagination,
    defaultSpecialty,
    specialties,
  }: ChemistListProps) => {
    const { page = PAGE_DEFAULT, pageCount = PAGE_DEFAULT } = pagination ?? {};

    const [isPending, startTransition] = useTransition();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const searchParams = useSearchParams() ?? '';
    const pathname = usePathname() ?? '';
    const { replace } = useRouter();

    const specialtyOptions = transformSpecialties(specialties);
    const [_, setSpecialty] = useState(new Set([defaultSpecialty]));

    const params = useMemo(
      () => new URLSearchParams(searchParams),
      [searchParams],
    );

    const handleReplaceURL = useCallback(
      (params: URLSearchParams) => {
        startTransition?.(() => {
          replace(`${pathname}?${params}`);
        });
      },
      [pathname, replace, startTransition],
    );

    const handlePageChange = useCallback(
      (page: number) => {
        page === 1
          ? params.delete('page')
          : params.set('page', page.toString());

        handleReplaceURL(params);
      },
      [handleReplaceURL, params],
    );

    const updateSearchParams = useCallback(
      (value: string) => {
        const specialty = searchParams.get('specialty');

        if (!specialty) {
          params.append('specialty', value);
        } else if (value) {
          params.set('specialty', value);
        } else {
          params.delete('specialty');
        }

        handleReplaceURL?.(params);
      },
      [handleReplaceURL, params, searchParams],
    );

    const handleSelectSpecialty = useCallback(
      (key: Key) => {
        setSpecialty(new Set([key as string]));

        // Find the selected specialty from specialtyOptions
        const selectedSpecialty = specialtyOptions.find(
          (option) => option.key === key,
        );

        if (key === 'all') {
          params.delete('specialty');
          handleReplaceURL?.(params);

          return;
        }

        updateSearchParams(formatString(selectedSpecialty?.label as string));
      },
      [handleReplaceURL, params, specialtyOptions, updateSearchParams],
    );

    return (
      <>
        <div className="flex flex-col mt-3 md:flex-row gap-4 md:mb-8">
          <InputSearch placeholder="Search Appointments" />
          <div className="flex justify-between md:gap-4 mb-10 md:mb-0 ">
            <MenuDropdown
              icon={<CategoryIcon customClass="w-4 h-4 md:w-6 md:h-6" />}
              label="Specialty"
              options={specialtyOptions}
              classNames={{
                trigger: 'w-[120px] md:w-[170px] h-[52px]',
              }}
              selectionMode="multiple"
              onAction={handleSelectSpecialty}
            />

            <Button className="font-medium h-[52px]" onClick={onOpen}>
              Create
            </Button>
          </div>
        </div>
        {isPending ? (
          <ChemistListSkeleton />
        ) : (
          <div className="flex flex-col items-center">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-[2048px]:grid-cols-4 justify-evenly justify-items-center">
              {chemists.length > 0 ? (
                chemists.map((chemist) => (
                  <ChemistCard
                    key={chemist.id}
                    {...chemist.attributes.users_permissions_user?.data
                      ?.attributes}
                  />
                ))
              ) : (
                <Text size="lg" variant="description">
                  {RESULT_NOT_FOUND}
                </Text>
              )}
            </div>
            {!!pagination && pagination.pageCount > 1 && (
              <Suspense fallback={null}>
                <Pagination
                  classNames={{ base: 'mt-4' }}
                  initialPage={page}
                  total={pageCount}
                  onChange={handlePageChange}
                />
              </Suspense>
            )}
          </div>
        )}
        <ChemistModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  },
);

ChemistList.displayName = 'ChemistList';

export default ChemistList;
