import { StatisticCardSkeleton } from '../StatisticCard/StatisticCardSkeleton';

export const StatisticListSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col md:flex-row gap-4">
      <StatisticCardSkeleton title="VHA Token Balance" />
      <StatisticCardSkeleton title="Spending on VHA" />
    </div>
  );
};
