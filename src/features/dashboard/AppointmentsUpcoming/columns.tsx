import { Key } from 'react';
import { AppointmentModel, ColumnType } from '@/types';
import { formatDate, formatTimeAppointment } from '@/utils';
import { MenuAction, OptionMoreAction, STATUS, Text } from '@/components/ui';
import { DeleteIcon, XmarkIcon } from '@/icons';

export const createColumns = ({
  isAdmin,
  status,
  onRemoveOrCancel,
}: {
  isAdmin: boolean;
  status: string;
  onRemoveOrCancel: (key?: Key) => void;
}): ColumnType<AppointmentModel>[] => {
  const baseColumns: ColumnType<AppointmentModel>[] = [
    {
      key: 'startTime',
      title: 'Start time',
      customNode: ({ item }) => {
        const { startTime = '' } = item || {};
        const date = formatDate(startTime);

        return (
          <div className="rounded-md w-[30px] md:w-[37px] h-10 bg-background-100 text-center pt-1">
            <Text customClass="text-xs text-yellow font-bold">
              {date.dayOfWeek}
            </Text>
            <Text variant="primary" customClass="text-xs">
              {date.dayOfMonth}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'receiverId',
      title: 'Receiver',
      customNode: ({ item }) => {
        const { receiverId, startTime = '', durationTime = '' } = item || {};
        const { attributes } = receiverId?.data || {};
        const { username = '' } = attributes || {};

        return (
          <>
            <Text variant="primary" customClass="text-xs md:text-sm">
              {username}
            </Text>
            <Text
              customClass="text-primary-300 font-light hidden lg:block"
              size="xs"
            >
              {formatTimeAppointment({
                start: startTime,
                duration: durationTime,
              })}
            </Text>
          </>
        );
      },
    },
    {
      key: 'durationTime',
      title: 'Duration time',
      customNode: ({ item }) => {
        const { startTime = '', durationTime = '' } = item || {};

        return (
          <Text customClass="text-primary-300 font-light lg:hidden" size="xs">
            {formatTimeAppointment({
              start: startTime,
              duration: durationTime,
            })}
          </Text>
        );
      },
    },
    {
      key: 'actions',
      title: 'Actions',
      customNode: ({ id = '' }) => {
        const iconClasses = 'mr-2 flex-shrink-0 w-4 h-4';

        const options: OptionMoreAction[] = [
          {
            key: isAdmin ? 'delete' : 'cancel',
            label: isAdmin ? 'Delete' : 'Cancel',
            startContent: isAdmin ? (
              <DeleteIcon customClass={`text-red ${iconClasses}`} />
            ) : (
              <XmarkIcon customClass={`text-red ${iconClasses}`} />
            ),
            isDisabled: status !== STATUS[0], // New
            onAction: () => onRemoveOrCancel(id),
          },
        ];

        return (
          <div className="flex justify-end">
            <MenuAction options={options} />
          </div>
        );
      },
    },
  ];

  return baseColumns;
};
