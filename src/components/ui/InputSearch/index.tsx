'use client';

import { memo, useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Utils
import { cn } from '@/utils';

// Hooks
import { useDebounce } from '@/hooks';

// Components
import { InputProps } from '@nextui-org/react';
import { Input } from '@/components/ui';
import { SearchIcon } from '@/icons';

export const InputSearch = memo(
  ({ placeholder = '', classNames, ...props }: InputProps) => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const params = useMemo(
      () => new URLSearchParams(searchParams),
      [searchParams],
    );

    // Update the URL with the debounced search term
    const updateSearchParams = useCallback(
      (search: string) => {
        if (search) {
          params.set('search', search);
        } else {
          params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`);
      },
      [params, pathname, replace],
    );

    // Call updateSearchParams whenever the debounced value changes
    const debouncedSearchTerm = useDebounce((value: string) => {
      updateSearchParams(value);
    });

    // Handle input changes
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        params.delete('page');
        debouncedSearchTerm(value);
      },

      [params, debouncedSearchTerm],
    );

    // Handle clear input
    const handleClear = () => {
      debouncedSearchTerm('');
    };

    return (
      <Input
        classNames={{
          ...classNames,
          mainWrapper: cn(
            'h-fit lg:max-w-[400px] text-xs',
            classNames?.mainWrapper ?? '',
          ),
          inputWrapper: 'h-[52px]',
        }}
        border="default"
        placeholder={placeholder}
        startContent={
          <SearchIcon customClass="w-5 h-5 ml-4 text-primary-200" />
        }
        isClearable
        autoFocus
        onClear={handleClear}
        onChange={handleChange}
        defaultValue={searchParams.get('search')?.toString()}
        {...props}
      />
    );
  },
);

InputSearch.displayName = 'InputSearch';
