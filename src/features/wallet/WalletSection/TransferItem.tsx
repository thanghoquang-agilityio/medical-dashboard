import { Avatar, Text } from '@/components/ui';
import React from 'react';

export type TransferItemProps = {
  avatar: string;
  username: string;
  isIncoming: boolean;
  amount: number;
};
export const TransferItem = () => {
  return (
    <div className="flex gap-4">
      <Avatar size="lg" className="aspect-square" />
      <div className="flex flex-1 flex-col gap-2">
        <Text
          variant="description"
          customClass="text-[14px]/5 font-bold text-primary-200"
        >
          Josep akbar
        </Text>

        <Text size="xs" variant="description">
          Just sent you $10,000
        </Text>
      </div>
      <Text size="xs" variant="description" customClass="font-bold my-auto">
        Just now
      </Text>
    </div>
  );
};
