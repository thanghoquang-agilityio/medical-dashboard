// Components
import { BaseModal } from '@/components/ui/BaseModal';
import SendMoneyForm from '../SendMoneyForm';

export type SendMoneyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  email: string;
  currentBalance: number;
  currentSpending: number;
};
const SendMoneyModal = ({
  id,
  email,
  isOpen,
  onClose,
  currentBalance,
  currentSpending,
}: SendMoneyModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} placement="center" size="2xl">
      <SendMoneyForm
        currentBalance={currentBalance}
        currentSpending={currentSpending}
        email={email}
        onClose={onClose}
        id={id}
      />
    </BaseModal>
  );
};

export default SendMoneyModal;
