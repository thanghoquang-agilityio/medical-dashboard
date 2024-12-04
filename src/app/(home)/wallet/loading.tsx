import { StatisticListSkeleton } from '@/features/wallet/StatisticList/StatisticListSkeleton';
import WalletSection from '@/features/wallet/WalletSection';

const Loading = () => {
  return (
    <section className="flex flex-col md:flex-wrap md:flex-row gap-4 font-manrope">
      <StatisticListSkeleton />
      <WalletSection />
    </section>
  );
};

export default Loading;
