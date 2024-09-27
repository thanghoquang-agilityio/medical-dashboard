'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, memo, useCallback, useMemo, useTransition } from 'react';

// Constants
import { PAGE_DEFAULT, RESULT_NOT_FOUND } from '@/constants';

// Types
import { APIResponse, ColumnType, MetaResponse } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { getObjectValue } from '@/utils';
import { Spinner, Text } from '@/components/ui';

// Components
const Pagination = dynamic(() => import('@/components/ui/Pagination'));

export interface DataTableProps<T> extends MetaResponse {
  data: APIResponse<T>[];
  columns: ColumnType<T>[];
  hasDivider?: boolean;
  classWrapper?: string;
  classRow?: string;
  classCell?: string;
}

const DataGrid = memo(
  <T,>({
    data,
    columns,
    pagination,
    hasDivider = false,
    classWrapper,
    classRow,
    classCell,
  }: DataTableProps<T>) => {
    const { page = PAGE_DEFAULT, pageCount = PAGE_DEFAULT } = pagination ?? {};
    const searchParams = useSearchParams() ?? '';
    const pathname = usePathname() ?? '';
    const { replace } = useRouter();
    const params = useMemo(
      () => new URLSearchParams(searchParams),
      [searchParams],
    );

    const [isPending, startTransition] = useTransition();

    const handleReplaceURL = useCallback(
      (params: URLSearchParams) => {
        startTransition(() => {
          replace(`${pathname}?${params.toString()}`);
        });
      },
      [pathname, replace],
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

    const loadingState = isPending ? 'loading' : 'idle';
    const classDivider =
      'p-4 border-0 border-primary-100 border-b border-opacity-10';

    return (
      <>
        <Table
          hideHeader
          className="w-full px-2"
          tabIndex={0}
          id="table"
          classNames={{
            emptyWrapper: 'text-primary-100 text-xl font-medium',
            wrapper: `bg-transparent-200 shadow-none ${classWrapper ?? ''}`,
          }}
        >
          <TableHeader>
            {columns.map((column) => {
              return <TableColumn key={column.key}>{column.title}</TableColumn>;
            })}
          </TableHeader>
          <TableBody
            emptyContent={RESULT_NOT_FOUND}
            loadingState={loadingState}
            loadingContent={<Spinner size="lg" />}
          >
            {data.length
              ? data.map((item, index) => {
                  const id = getObjectValue(item, 'id');
                  return (
                    <TableRow
                      key={`table-body-${id}`}
                      className={classRow ?? ''}
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell
                            key={`table-row-cell-${column.key}`}
                            className={`${hasDivider ? index !== data.length - 1 && classDivider : ''} ${classCell ?? ''}`}
                          >
                            {column.customNode ? (
                              column.customNode(column, item.attributes)
                            ) : (
                              <Text variant="error" size="xs">
                                {getObjectValue(item.attributes, column.key)}
                              </Text>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              : []}
          </TableBody>
        </Table>
        {!!pagination && pagination.pageCount > 1 && (
          <Suspense>
            <Pagination
              initialPage={page}
              total={pageCount}
              onChange={handlePageChange}
            />
          </Suspense>
        )}
      </>
    );
  },
);

DataGrid.displayName = 'DataGrid';
export default DataGrid;
