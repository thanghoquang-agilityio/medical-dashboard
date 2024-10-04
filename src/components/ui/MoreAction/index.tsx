import { Key } from 'react';

// Components
import { EditIcon, DeleteIcon, MoreIcon } from '@/icons';
import { MenuDropdown } from '../MenuDropdown';

interface MoreActionProps {
  isDisabledEdit?: boolean;
  onShowEditModal: (key: Key) => void;
  onShowDeleteModal: (key: Key) => void;
}

export const MenuAction = ({
  onShowEditModal,
  onShowDeleteModal,
  isDisabledEdit,
}: MoreActionProps) => {
  const iconClasses = 'mr-2 flex-shrink-0 w-4 h-4';
  const options = [
    {
      key: 'edit',
      label: 'Edit',
      startContent: <EditIcon customClass={`text-green ${iconClasses}`} />,
      isDisabled: isDisabledEdit,
    },
    {
      key: 'delete',
      label: 'Delete',
      startContent: <DeleteIcon customClass={`text-red ${iconClasses}`} />,
    },
  ];
  const handleAction = (key: Key) => {
    switch (key) {
      case 'edit':
        onShowEditModal(key);
        break;

      case 'delete':
        onShowDeleteModal(key);
        break;

      default:
    }
  };

  return (
    <MenuDropdown
      onAction={handleAction}
      options={options}
      classNames={{
        trigger:
          'p-0 min-w-4 h-4 md:h-[26px] md:min-w-[26px] bg-background-100 rounded-md ',
        content: 'min-w-[90px] border-gray border',
      }}
      icon={<MoreIcon customClass="w-[11px] h-[11px] md:w-4 md:h-4" />}
    />
  );
};
