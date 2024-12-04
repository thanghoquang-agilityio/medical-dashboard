import { auth } from '@/config/auth';
import StatisticList from '@/features/wallet/StatisticList';
import WalletSection from '@/features/wallet/WalletSection';
import { getUserLogged } from '@/services';

const WalletPage = async () => {
  const { token = '' } = (await auth())?.user || {};

  const { user } = await getUserLogged(token);

  const { balance = 0, spendingMoney = 0 } = user ?? {};
  return (
    <section className="flex flex-col md:flex-wrap md:flex-row gap-4 font-manrope">
      <StatisticList totalBalance={balance} totalSpending={spendingMoney} />
      <WalletSection />
    </section>
  );
};

export default WalletPage;
