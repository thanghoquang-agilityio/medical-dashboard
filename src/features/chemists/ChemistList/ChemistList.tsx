'use client';

import { useDisclosure } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
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
  ROLE,
  SpecialtyModel,
  UserModel,
} from '@/types';

// Components
import { Text } from '@/components/ui';

import ChemistCard from '../ChemistCard';
import ChemistModal from '../ChemistModal';

// Utils
import { transformSpecialtiesById } from '@/utils';

// Constants
import { PAGE_DEFAULT, RESULT_NOT_FOUND } from '@/constants';
import { ChemistListSkeleton } from './ChemistSkeleton';

const Pagination = lazy(() => import('@/components/ui/Pagination'));

export type ChemistListProps = {
  chemists: Array<APIResponse<ChemistModel>>;
  specialties: Array<APIResponse<SpecialtyModel>>;
  role: string;
  defaultSpecialty?: string;
} & MetaResponse;

const ChemistList = memo(
  ({ chemists, role, pagination, specialties }: ChemistListProps) => {
    const { page = PAGE_DEFAULT, pageCount = PAGE_DEFAULT } = pagination ?? {};

    const [chemist, setChemist] = useState<UserModel>();
    const [chemistId, setChemistId] = useState<string>('');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const searchParams = useSearchParams() ?? '';
    const pathname = usePathname() ?? '';
    const { replace } = useRouter();

    const [isPending, startTransition] = useTransition();

    const specialtyOptionsById = transformSpecialtiesById(specialties);

    const params = useMemo(
      () => new URLSearchParams(searchParams),
      [searchParams],
    );

    const handleReplaceURL = useCallback(
      (params: URLSearchParams) => {
        startTransition(() => {
          replace(`${pathname}?${params}`);
        });
      },
      [pathname, replace],
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

    const isAdmin = role === ROLE.ADMIN;

    // Handle edit
    const handleEdit = useCallback(
      ({ data, id }: { data: UserModel; id: string }) => {
        if (!isAdmin) return;
        setChemist(data);
        setChemistId(id);
        onOpen();
      },
      [isAdmin, onOpen],
    );

    return (
      <>
        <Text variant="primary" size="2xl" customClass="my-5">
          {params.size ? 'Chemist Results' : 'All Chemists'}
        </Text>
        {isPending ? (
          <ChemistListSkeleton />
        ) : (
          <div className="flex flex-col items-center min-h-[40vh] sm:min-h-[60vh]">
            {chemists.length > 0 ? (
              <div className="w-full grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-[2048px]:grid-cols-4 justify-evenly justify-items-center">
                {chemists.map((chemist) => {
                  const { attributes } = chemist;
                  const { users_permissions_user } = attributes || {};
                  const { id = '', attributes: data } =
                    users_permissions_user?.data || {};

                  return (
                    <ChemistCard
                      id={id}
                      key={id}
                      isAdmin={isAdmin}
                      data={data}
                      onEdit={handleEdit}
                    />
                  );
                })}
              </div>
            ) : (
              <Text size="lg" variant="description" customClass="my-auto">
                {RESULT_NOT_FOUND}
              </Text>
            )}

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
        {isAdmin && (
          <ChemistModal
            isOpen={isOpen}
            id={chemistId}
            data={chemist}
            onClose={onClose}
            specialtyOptions={specialtyOptionsById}
          />
        )}
      </>
    );
  },
);

ChemistList.displayName = 'ChemistList';
export default ChemistList;
