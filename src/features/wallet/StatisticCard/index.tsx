import { Button, Text } from '@/components/ui';
import { MoreIcon } from '@/icons';
import { formatNumberWithUnit } from '@/utils';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

export type StatisticCardProps = {
  title: string;
  value: number;
};
const StatisticCard = ({ title, value }: StatisticCardProps) => {
  return (
    <Card
      as="section"
      className="bg-background-200 min-w-[236px] w-full py-[14px] h-[140px] px-5 flex flex-col gap-2 font-manrope"
    >
      <CardHeader className="p-0 flex justify-between">
        <h3 className="text-[14px]/8 font-bold text-primary-200">{title}</h3>
        <Button
          isIconOnly
          className="min-w-[11px] w-[11px] h-[11px] md:w-4 md:h-4"
        >
          <MoreIcon customClass="w-[11px] h-[11px] md:w-4 md:h-4 rotate-90" />
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        <Text size="2xl" variant="primary" customClass="font-bold leading-8">
          ${formatNumberWithUnit(value)}
        </Text>
      </CardBody>
    </Card>
  );
};

StatisticCard.displayName = 'StatisticCard';
export default StatisticCard;
