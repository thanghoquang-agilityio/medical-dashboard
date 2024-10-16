import { Skeleton } from '@nextui-org/react';
import { FOOTER_ITEMS } from '.';

export const FooterSkeleton = () => {
  return (
    <div className="w-full m-h-40 mt-auto flex justify-center items-center flex-col gap-8 bg-background-100 pt-8 pb-4">
      <Skeleton className="w-[162px] h-8 rounded-medium" />

      <div className="grid xl:grid-cols-6 grid-cols-3 gap-2">
        {FOOTER_ITEMS.map((_, index) => (
          <Skeleton key={index} className="w-auto md:w-[124px] md:h-[60px]" />
        ))}
      </div>
    </div>
  );
};
