'use client';
import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useMemo,
  useTransition,
} from 'react';
// Types
import { APIResponse, ChemistModel, MetaResponse } from '@/types';

// Components
import ChemistCard from '../ChemistCard';
import { Text } from '@/components/ui';

// Constants
import { PAGE_DEFAULT, RESULT_NOT_FOUND } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ChemistListSkeleton from './ChemistListSkeleton';

const Pagination = lazy(() => import('@/components/ui/Pagination'));

export type ChemistListProps = {
  chemists: Array<APIResponse<ChemistModel>>;
} & MetaResponse;

const ChemistList = memo(({ chemists, pagination }: ChemistListProps) => {
  const { page = PAGE_DEFAULT, pageCount = PAGE_DEFAULT } = pagination ?? {};

  const [isPending, startTransition] = useTransition();

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
  return (
    <div className="flex flex-col items-center">
      {isPending ? (
        <ChemistListSkeleton />
      ) : (
        <>
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
    </div>
  );
});

ChemistList.displayName = 'ChemistList';

export default ChemistList;
