import { Button } from '@/components/ui';
import { ExportIcon, ImportIcon } from '@/icons';
import { Skeleton } from '@nextui-org/react';

export const WalletBalanceSkeleton = () => {
  return (
    <section className="flex flex-1 flex-col gap-8">
      <section className="flex flex-col gap-4 text-center">
        <h3 className="text-base/8 font-bold text-primary-200">
          Total balance
        </h3>
        <Skeleton className="h-8 w-36 mx-auto rounded-medium" />
      </section>

      <div className="flex gap-4 justify-center">
        <Button isDisabled size="lg" className="h-[55px] max-h-[55px] max-w-36">
          Send
          <ExportIcon customClass="w-4 h-4" />
        </Button>
        <Button isDisabled size="lg" className="h-[55px] max-h-[55px] max-w-36">
          Receive
          <ImportIcon customClass="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};
