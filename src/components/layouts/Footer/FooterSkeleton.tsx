import { Skeleton } from '@nextui-org/react';
import { FOOTER_ITEMS } from '.';

export const FooterSkeleton = () => {
  return (
    <footer className="w-full m-h-40 mt-auto flex justify-center items-center flex-col gap-8 bg-background-100 pt-8 pb-4">
      <Skeleton className="w-[162px] h-8 rounded-medium" />

      <ul className="grid xl:grid-cols-6 grid-cols-3 gap-2 list-none">
        {FOOTER_ITEMS.map((_, index) => (
          <li key={index}>
            <Skeleton className="w-24 md:w-[124px] h-9 md:h-[60px]" />
          </li>
        ))}
      </ul>
    </footer>
  );
};
