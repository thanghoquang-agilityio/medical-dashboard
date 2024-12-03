import React from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { WalletBalance } from './WalletBalance';
import { WalletTransferHistory } from './WalletTransferHistory';

const WalletSection = () => {
  return (
    <Card
      as="section"
      className="flex flex-1 bg-background-200 min-w-[280px] w-auto p-5 gap-9"
    >
      <CardHeader className="p-0">
        <WalletBalance />
      </CardHeader>
      <CardBody className="p-0">
        <WalletTransferHistory />
      </CardBody>
    </Card>
  );
};

export default WalletSection;
