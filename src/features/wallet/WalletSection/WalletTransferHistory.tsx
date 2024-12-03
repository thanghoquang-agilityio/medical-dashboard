import { ConfigIcon } from '@/icons';
import { TransferItem } from './TransferItem';

export const WalletTransferHistory = () => {
  return (
    <section className="flex flex-col gap-6 overflow-y-scroll">
      <section className="flex justify-between">
        <h3 className="text-base/6 font-semibold text-primary-200">
          Notifications
        </h3>
        <ConfigIcon customClass="w-6 h-6" />
      </section>
      <div className="flex flex-col h-[200px] overflow-y-scroll scrollbar-hide justify-start gap-7 ">
        <TransferItem />
        <TransferItem />
        <TransferItem />
        <TransferItem />
        <TransferItem />
        <TransferItem />
      </div>
    </section>
  );
};
