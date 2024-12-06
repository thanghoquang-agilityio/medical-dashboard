import { StatisticListSkeleton } from '@/features/wallet/StatisticList/StatisticListSkeleton';
import { WalletTransferHistorySkeleton } from '@/features/wallet/WalletSection/WalletTransferHistorySkeleton';

const Loading = () => {
  return (
    <section className="flex flex-col md:flex-wrap md:flex-row gap-4 font-manrope">
      <StatisticListSkeleton />
      <WalletTransferHistorySkeleton />
    </section>
  );
};

export default Loading;
