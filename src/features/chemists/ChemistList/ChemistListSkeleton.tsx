import { Skeleton } from '@nextui-org/react';

// Constants
import { PAGE_SIZE_DEFAULT } from '@/constants';

// Components
import { Button } from '@/components/ui';
import { NoteIcon, StarIcon } from '@/icons';

const ChemistListSkeleton = () => {
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 min-[2048px]:grid-cols-4 justify-evenly justify-items-center">
      {Array(PAGE_SIZE_DEFAULT)
        .fill(0)
        .map((_, index) => (
          <div
            key={`chemist-detail-${index}`}
            className="bg-background-200 flex flex-col gap-6 rounded-large min-w-[300px] w-full h-[228px] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-32 h-4 rounded-small" />
                  <Skeleton className="w-32 h-4 rounded-small" />
                </div>
              </div>
              <Button color="default" className="text-minty-green">
                Book
              </Button>
            </div>

            <div className="flex flex-col gap-1">
              <Skeleton className="w-full h-10 rounded-small" />
            </div>

            <div className="flex justify-between mt-auto">
              <div className="flex items-center gap-1 sm:gap-2">
                <NoteIcon customClass="w-6 h-6" />

                <Skeleton className="w-12 h-5 rounded-small" />
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <StarIcon customClass="w-6 h-6 text-light-orange" />

                <Skeleton className="w-24 h-5 rounded-small" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChemistListSkeleton;
