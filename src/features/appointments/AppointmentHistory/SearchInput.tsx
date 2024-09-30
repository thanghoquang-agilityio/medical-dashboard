'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import { Input } from '@/components/ui';
import { SearchIcon } from '@/icons';
import { useDebounce } from '@/hooks';
import { useCallback, useEffect, useState } from 'react';

interface SearchInputProps {
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  size = 'sm',
  placeholder = '',
  className = '',
}: SearchInputProps) => {
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

  return (
    <Input
      size={size}
      className={className}
      border="default"
      placeholder={placeholder}
      startContent={<SearchIcon customClass="w-5 h-5 ml-4 text-primary-200" />}
      onChange={handleChange}
      defaultValue={searchParams.get('search')?.toString()}
    />
  );
};

export default SearchInput;
