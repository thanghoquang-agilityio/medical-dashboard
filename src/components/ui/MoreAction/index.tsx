import { Key } from 'react';

// Components
import { MoreIcon } from '@/icons';
import { MenuDropdown, MenuOption } from '../MenuDropdown';
import { cn } from '@/utils';

export interface OptionMoreAction extends MenuOption {
  onAction: () => void;
}

interface MoreActionProps {
  options: OptionMoreAction[];
}

export const MenuAction = ({ options }: MoreActionProps) => {
  const optionsMenu = options.map(({ onAction: _, ...rest }) => rest);

  const handleAction = (key: Key) => {
    const option = options.find((option) => option.key === key);

    return option?.onAction();
  };

  return (
    <MenuDropdown
      aria-label="more-action"
      onAction={handleAction}
      options={optionsMenu}
      classNames={{
        trigger: cn(
          'p-0 min-w-4 h-4 md:h-[26px] md:min-w-[26px] bg-background-100 rounded-md ',
          'data-[focus=true]:border-transparent data-[focus=true]:border-opacity-20 border-transparent border-opacity-20',
        ),
        content: 'min-w-[90px] border-1 border-primary-100 border-opacity-10',
      }}
      icon={<MoreIcon customClass="w-[11px] h-[11px] md:w-4 md:h-4" />}
    />
  );
};
