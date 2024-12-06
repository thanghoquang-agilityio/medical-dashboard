'use client';
import { useDisclosure } from '@nextui-org/react';
import { memo } from 'react';

// Components
import { Button, Text } from '@/components/ui';
import ReceiveMoneyModal from '../ReceiveMoneyModal';
import SendMoneyModal from '../SendMoneyModal';

// Icons
import { ExportIcon, ImportIcon } from '@/icons';

// Utils
import { formatNumberWithUnit } from '@/utils';

export type WalletBalanceProps = {
  totalBalance: number;
  totalSpending: number;
  id: string;
  email: string;
};

export const WalletBalance = memo(
  ({ totalBalance, totalSpending, id, email }: WalletBalanceProps) => {
    const {
      isOpen: isReceiveMoneyModalOpen,
      onOpen: onOpenReceiveMoneyModal,
      onClose: onCloseReceiveMoneyModal,
    } = useDisclosure({ defaultOpen: false });

    const {
      isOpen: isSendMoneyModalOpen,
      onClose: onCloseSendMoneyModal,
      onOpen: onOpenSendMoneyModal,
    } = useDisclosure({ defaultOpen: false });
    return (
      <>
        <section className="flex flex-1 flex-col gap-8">
          <section className="flex flex-col gap-4 text-center">
            <h3 className="text-base/8 font-bold text-primary-200">
              Total balance
            </h3>
            <Text
              size="4xl"
              variant="primary"
              customClass="font-bold leading-8"
            >
              ${formatNumberWithUnit(totalBalance)}
            </Text>
          </section>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={onOpenSendMoneyModal}
              size="lg"
              className="h-[55px] max-h-[55px] max-w-36"
            >
              Send
              <ExportIcon customClass="w-4 h-4" />
            </Button>
            <Button
              onClick={onOpenReceiveMoneyModal}
              size="lg"
              className="h-[55px] max-h-[55px] max-w-36"
            >
              Receive
              <ImportIcon customClass="w-4 h-4" />
            </Button>
          </div>
        </section>
        {isReceiveMoneyModalOpen && (
          <ReceiveMoneyModal
            currentBalance={totalBalance}
            isOpen={isReceiveMoneyModalOpen}
            onClose={onCloseReceiveMoneyModal}
            id={id}
          />
        )}

        {isSendMoneyModalOpen && (
          <SendMoneyModal
            id={id}
            email={email}
            currentBalance={totalBalance}
            currentSpending={totalSpending}
            isOpen={isSendMoneyModalOpen}
            onClose={onCloseSendMoneyModal}
          />
        )}
      </>
    );
  },
);

WalletBalance.displayName = 'WalletBalance';
