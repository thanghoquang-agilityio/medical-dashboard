import { TransferItemSkeleton } from '../WalletSection/TransferItemSkeleton';

export const TransferListSkeleton = () => {
  return (
    <div className="flex flex-col h-[200px] overflow-y-scroll scrollbar-hide justify-start gap-7 ">
      <TransferItemSkeleton />
      <TransferItemSkeleton />
      <TransferItemSkeleton />
    </div>
  );
};
