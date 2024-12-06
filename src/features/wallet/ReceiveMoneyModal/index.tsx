// Components
import { BaseModal } from '@/components/ui/BaseModal';
import ReceiveMoneyForm from '../ReceiveMoneyForm';

export type ReceiveMoneyModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
};
const ReceiveMoneyModal = ({
  id,
  isOpen,
  onClose,
  currentBalance,
}: ReceiveMoneyModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} placement="center" size="lg">
      <ReceiveMoneyForm
        currentBalance={currentBalance}
        id={id}
        onClose={onClose}
      />
    </BaseModal>
  );
};

export default ReceiveMoneyModal;
