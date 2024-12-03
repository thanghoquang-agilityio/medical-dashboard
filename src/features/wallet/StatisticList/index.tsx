import React from 'react';
import StatisticCard from '../StatisticCard';

const StatisticList = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <StatisticCard title="VHA Token Balance" value={21500} />
      <StatisticCard title="Spending on VHA" value={5392} />
    </div>
  );
};

export default StatisticList;
