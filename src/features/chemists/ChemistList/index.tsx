'use client';

import { useDisclosure } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

// Types
import {
  APIResponse,
  ChemistModel,
  MetaResponse,
  SpecialtyResponse,
} from '@/types';

// Components
import { Button, InputSearch, MenuDropdown, Text } from '@/components/ui';
import { CategoryIcon } from '@/icons';
import ChemistCard from '../ChemistCard';
import ChemistModal from '../ChemistModal';
import ChemistListSkeleton from './ChemistListSkeleton';

// Services
import { getSpecialties } from '@/services';

// Utils
import { transformSpecialties } from '@/utils';

// Constants
import { PAGE_DEFAULT, RESULT_NOT_FOUND } from '@/constants';

const Pagination = lazy(() => import('@/components/ui/Pagination'));

export type ChemistListProps = {
  chemists: Array<APIResponse<ChemistModel>>;
} & MetaResponse;

const ChemistList = memo(({ chemists, pagination }: ChemistListProps) => {
  const { page = PAGE_DEFAULT, pageCount = PAGE_DEFAULT } = pagination ?? {};

  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchParams = useSearchParams() ?? '';
  const pathname = usePathname() ?? '';
  const { replace } = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleReplaceURL = useCallback(
    (params: URLSearchParams) => {
      startTransition?.(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, replace, startTransition],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', `${page}`);
      }

      handleReplaceURL(params);
    },
    [handleReplaceURL, params],
  );

  const [specialties, setSpecialties] = useState<SpecialtyResponse[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      const { specialties, error } = await getSpecialties({});
      if (error) throw error;
      setSpecialties(specialties);
    };

    fetchSpecialties();
  }, []);

  const specialtyOptions = transformSpecialties(specialties);

  return (
    <>
      <div className="flex flex-col mt-3 md:flex-row gap-4 md:mb-10">
        <InputSearch placeholder="Search Appointments" />
        <div className="flex justify-between md:gap-4 mb-10 md:mb-0 ">
          <MenuDropdown
            icon={<CategoryIcon customClass="w-4 h-4 md:w-6 md:h-6" />}
            label="Specialty"
            // TODO: add options later
            options={specialtyOptions}
            classNames={{
              trigger: 'w-[120px] md:w-[170px] h-[52px]',
            }}
          />

          <Button className="font-medium h-[52px]" onClick={onOpen}>
            Create
          </Button>
        </div>
      </div>
      {isPending ? (
        <ChemistListSkeleton />
      ) : (
        <>
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
        </>
      )}
      <ChemistModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});

ChemistList.displayName = 'ChemistList';

export default ChemistList;
