'use client';

import { memo, useCallback, useEffect, useState } from 'react';
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

    // Local state to hold the input value
    const [searchTerm, setSearchTerm] = useState(
      searchParams.get('search') || '',
    );

    // Debounced search term (500ms delay)
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Update the URL with the debounced search term
    const updateSearchParams = useCallback(
      (search: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');

        if (search) {
          params.set('search', search);
        } else {
          params.delete('search');
        }

        replace(`${pathname}?${params.toString()}`);
      },
      [searchParams, pathname, replace],
    );

    // Call updateSearchParams whenever the debounced value changes
    useEffect(() => {
      updateSearchParams(debouncedSearchTerm);
    }, [debouncedSearchTerm, updateSearchParams]);

    // Handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    // Handle clear input
    const handleClear = () => {
      setSearchTerm('');
    };

    return (
      <Input
        classNames={{
          ...classNames,
          mainWrapper: cn(
            'h-fit py-3 max-w-[400px] text-xs',
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
        autoFocus={!!searchTerm}
        onClear={handleClear}
        onChange={handleChange}
        defaultValue={searchParams.get('search')?.toString()}
        {...props}
      />
    );
  },
);

InputSearch.displayName = 'InputSearch';
