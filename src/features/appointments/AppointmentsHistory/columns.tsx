import { Key } from 'react';

// Types
import { AppointmentModel, ColumnType } from '@/types';

// Utils
import {
  formatDayMonthYear,
  formatTimeAppointment,
  isLaterThanCurrentTime,
} from '@/utils';

// Constants
import { API_IMAGE_URL } from '@/constants';

// Components
import {
  Avatar,
  Status,
  Text,
  MenuAction,
  OptionMoreAction,
} from '@/components/ui';

// Service
import { DeleteIcon, EditIcon, XmarkIcon } from '@/icons';

export const createColumns = ({
  isAdmin,
  onEdit,
  onRemoveOrCancel,
}: {
  isAdmin: boolean;
  onEdit: (key?: Key) => void;
  onRemoveOrCancel: (key?: Key) => void;
}): ColumnType<AppointmentModel>[] => {
  const baseColumns: ColumnType<AppointmentModel>[] = [
    {
      key: 'senderId',
      title: 'Sender',
      customNode: ({ item }) => {
        const { senderId = '' } = item || {};
        const { data } = senderId || {};
        const { attributes } = data || {};
        const { avatar, username = '' } = attributes || {};
        const { data: dataAvatar } = avatar || {};
        const { attributes: attributesAvatar } = dataAvatar || {};
        const { url = '' } = attributesAvatar || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={`${API_IMAGE_URL}${url}`}
              size="md"
              isBordered
              className="shrink-0"
            />
            <Text variant="primary" size="sm">
              {username}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'receiverId',
      title: 'Receiver',
      customNode: ({ item }) => {
        const { receiverId = '' } = item || {};
        const { data } = receiverId || {};
        const { attributes } = data || {};
        const { avatar, username = '' } = attributes || {};
        const { data: dataAvatar } = avatar || {};
        const { attributes: attributesAvatar } = dataAvatar || {};
        const { url = '' } = attributesAvatar || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={`${API_IMAGE_URL}${url}`}
              size="md"
              isBordered
              className="shrink-0"
            />
            <Text variant="primary" size="sm">
              {username}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'durationTime',
      title: 'Duration time',
      customNode: ({ item }) => {
        const { startTime = '', durationTime = '' } = item || {};
        return (
          <Text variant="primary" size="xs">
            {formatTimeAppointment({
              start: startTime,
              duration: durationTime,
            })}
          </Text>
        );
      },
    },
    {
      key: 'startTime',
      title: 'Start time',
      customNode: ({ item }) => {
        const { startTime = '' } = item || {};
        const date = formatDayMonthYear(startTime);

        return (
          <Text variant="primary" size="xs">
            {date}
          </Text>
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      customNode: ({ item }) => {
        const { status = 0 } = item || {};
        return <Status status={status} />;
      },
    },
    {
      key: 'actions',
      title: 'Actions',
      customNode: ({ item, id = '' }) => {
        const { startTime = '' } = item || {};
        const isDisabled = isLaterThanCurrentTime(startTime);

        const iconClasses = 'mr-2 flex-shrink-0 w-4 h-4';

        const options: OptionMoreAction[] = [
          {
            key: 'edit',
            label: 'Edit',
            startContent: (
              <EditIcon customClass={`text-green ${iconClasses}`} />
            ),
            isDisabled: isDisabled,
            onAction: () => onEdit(id),
          },
          {
            key: isAdmin ? 'delete' : 'cancel',
            label: isAdmin ? 'Delete' : 'Cancel',
            startContent: isAdmin ? (
              <DeleteIcon customClass={`text-red ${iconClasses}`} />
            ) : (
              <XmarkIcon customClass={`text-red ${iconClasses}`} />
            ),
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

  return isAdmin ? baseColumns : baseColumns.slice(1);
};
