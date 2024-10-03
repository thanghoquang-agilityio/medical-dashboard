import { Key } from 'react';

// Components
import { EditIcon, DeleteIcon, MoreIcon } from '@/icons';
import { MenuDropdown } from '../MenuDropdown';

const iconClasses = 'mr-2 pointer-events-none flex-shrink-0 w-4 h-4';
const options2 = [
  {
    key: 'edit',
    label: 'Edit',
    startContent: <EditIcon customClass={iconClasses} />,
  },
  {
    key: 'delete',
    label: 'Delete',
    startContent: <DeleteIcon customClass={iconClasses} />,
  },
];

interface MoreActionProps {
  onShowEditModal: (key: Key) => void;
  onShowDeleteModal: (key: Key) => void;
}

export const MenuAction = ({
  onShowEditModal,
  onShowDeleteModal,
}: MoreActionProps) => {
  const handleAction = (key: Key) => {
    switch (key) {
      case 'edit':
        onShowEditModal(key);
        break;

      case 'delete':
        onShowDeleteModal && onShowDeleteModal(key);
        break;

      default:
    }
  };

  return (
    <MenuDropdown
      onAction={handleAction}
      options={options2}
      classNames={{
        trigger:
          'p-0 min-w-4 h-4 md:h-[26px] md:min-w-[26px] bg-background-100 rounded-md',
        content: 'min-w-[90px]',
      }}
      icon={<MoreIcon customClass=" w-[11px] h-[11px] md:w-4 md:h-4" />}
    />
  );
};
