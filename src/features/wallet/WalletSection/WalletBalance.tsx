import { Button, Text } from '@/components/ui';
import { ExportIcon, ImportIcon } from '@/icons';
import { formatNumberWithUnit } from '@/utils';
import React from 'react';

export const WalletBalance = () => {
  return (
    <section className="flex flex-1 flex-col gap-8">
      <section className="flex flex-col gap-4 text-center">
        <h3 className="text-base/8 font-bold text-primary-200">
          Total balance
        </h3>
        <Text size="4xl" variant="primary" customClass="font-bold leading-8">
          ${formatNumberWithUnit(81.91)}
        </Text>
      </section>

      <div className="flex gap-4 justify-center">
        <Button size="lg" className="h-[55px] max-h-[55px] max-w-[144px]">
          Send
          <ExportIcon customClass="w-4 h-4" />
        </Button>
        <Button size="lg" className="h-[55px] max-h-[55px] max-w-[144px]">
          Receive
          <ImportIcon customClass="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};
