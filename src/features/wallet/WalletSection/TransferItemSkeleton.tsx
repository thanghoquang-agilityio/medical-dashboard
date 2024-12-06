import { Skeleton } from '@nextui-org/react';

export const TransferItemSkeleton = () => {
  return (
    <div className="flex gap-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="block h-5 rounded-small" />

        <Skeleton className="block h-4 rounded-small" />
      </div>

      <Skeleton className="h-4 w-12 my-auto block rounded-small" />
    </div>
  );
};
