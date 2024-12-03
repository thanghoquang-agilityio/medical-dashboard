import StatisticList from '@/features/wallet/StatisticList';
import WalletSection from '@/features/wallet/WalletSection';

const WalletPage = () => {
  return (
    <section className="flex flex-col md:flex-wrap md:flex-row gap-4 font-manrope">
      <StatisticList />
      <WalletSection />
    </section>
  );
};

export default WalletPage;
