'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Suspense,
  TransitionStartFunction,
  lazy,
  memo,
  useCallback,
  useMemo,
} from 'react';

// Constants
import { PAGE_DEFAULT, RESULT_NOT_FOUND } from '@/constants';

// Types
import { APIResponse, ColumnType, MetaResponse } from '@/types';

// Utils
import { cn, getObjectValue } from '@/utils';

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableProps,
  TableRow,
} from '@nextui-org/react';
import { Spinner, Text } from '@/components/ui';

const Pagination = lazy(() => import('@/components/ui/Pagination'));

export interface DataTableProps<T> extends MetaResponse, TableProps {
  data: APIResponse<T>[];
  columns: ColumnType<T>[];
  hasDivider?: boolean;
  startTransition?: TransitionStartFunction;
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
    classWrapper = '',
    classRow = '',
    classCell = '',
    ...props
  }: DataTableProps<T>) => {
    const { page = PAGE_DEFAULT, pageCount = PAGE_DEFAULT } = pagination ?? {};
    const searchParams = useSearchParams() ?? '';
    const pathname = usePathname() ?? '';
    const { replace } = useRouter();
    const params = useMemo(
      () => new URLSearchParams(searchParams),
      [searchParams],
    );

    const handleReplaceURL = useCallback(
      (params: URLSearchParams) => {
        replace(`${pathname}?${params.toString()}`);
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

    const classDivider =
      'border-0 border-primary-100 border-b border-opacity-10';

    return (
      <>
        <Table
          hideHeader
          className="w-full"
          tabIndex={0}
          classNames={{
            emptyWrapper: 'text-primary-100 text-xl font-medium h-[152px] pb-4',
            wrapper: cn(
              `bg-transparent-200 shadow-none p-0 ${classWrapper ?? ''}`,
            ),
          }}
          aria-label="Table"
          {...props}
        >
          <TableHeader>
            {columns.map((column) => {
              return <TableColumn key={column.key}>{column.title}</TableColumn>;
            })}
          </TableHeader>
          <TableBody
            emptyContent={RESULT_NOT_FOUND}
            loadingContent={<Spinner size="lg" className="absolute" />}
          >
            {data.length
              ? data.map((item, index) => {
                  const id = getObjectValue(item, 'id');
                  const isLastItem = data.length === index + 1;
                  return (
                    <TableRow
                      key={id}
                      className={!isLastItem ? classRow ?? '' : ''}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={`table-row-cell-${column.key}`}
                          className={cn(
                            `p-0 ${!isLastItem ? classCell ?? '' : ''}`,
                            `${hasDivider ? (!isLastItem ? `py-3 ${classDivider}` : 'pt-3') : ''}`,
                            column.additionalClassName,
                          )}
                          role="cell"
                          headers={`${props.id}-${column.key}`}
                        >
                          {column.customNode ? (
                            column.key === 'actions' ? (
                              column.customNode({ item: item.attributes, id })
                            ) : (
                              column.customNode({
                                column,
                                item: item.attributes,
                              })
                            )
                          ) : (
                            <Text variant="error" size="xs">
                              {getObjectValue(item.attributes, column.key)}
                            </Text>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              : []}
          </TableBody>
        </Table>
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
    );
  },
);

DataGrid.displayName = 'DataGrid';
export default DataGrid;
