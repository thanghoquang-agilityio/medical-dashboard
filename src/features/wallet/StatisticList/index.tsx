import React from 'react';
import StatisticCard from '../StatisticCard';

export type StatisticListProps = {
  totalBalance: number;
  totalSpending: number;
};
const StatisticList = ({ totalBalance, totalSpending }: StatisticListProps) => {
  return (
    <div className="flex flex-1 flex-col md:flex-row gap-4">
      <StatisticCard title="VHA Token Balance" value={totalBalance} />
      <StatisticCard title="Spending on VHA" value={totalSpending} />
    </div>
  );
};

export default StatisticList;
