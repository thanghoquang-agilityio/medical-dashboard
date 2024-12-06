import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { WalletBalance } from './WalletBalance';
import { WalletTransferHistory } from './WalletTransferHistory';

export type WalletSectionProps = {
  totalBalance: number;
  totalSpending: number;
  id: string;
  email: string;
};
const WalletSection = ({
  totalBalance,
  totalSpending,
  id,
  email,
}: WalletSectionProps) => {
  return (
    <Card
      as="section"
      className="flex flex-1 bg-background-200 min-w-[280px] w-auto p-5 gap-9"
    >
      <CardHeader className="p-0">
        <WalletBalance
          totalBalance={totalBalance}
          totalSpending={totalSpending}
          id={id}
          email={email}
        />
      </CardHeader>
      <CardBody className="p-0">
        <WalletTransferHistory id={id} />
      </CardBody>
    </Card>
  );
};

export default WalletSection;
