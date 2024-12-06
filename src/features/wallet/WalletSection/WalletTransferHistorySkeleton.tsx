import React from 'react';
import { TransferItemSkeleton } from './TransferItemSkeleton';
import { ConfigIcon } from '@/icons';

export const WalletTransferHistorySkeleton = () => {
  return (
    <section className="flex flex-col gap-6 overflow-y-scroll">
      <section className="flex justify-between">
        <h3 className="text-base/6 font-semibold text-primary-200">
          Notifications
        </h3>
        <ConfigIcon customClass="w-6 h-6" />
      </section>
      <div className="flex flex-col h-[200px] overflow-y-scroll scrollbar-hide justify-start gap-7 ">
        <TransferItemSkeleton />
        <TransferItemSkeleton />
        <TransferItemSkeleton />
      </div>
    </section>
  );
};
