import { Key } from 'react';

// Types
import { AppointmentModel, ColumnType } from '@/types';

// Utils
import {
  formatDayMonthYear,
  formatTimeAppointment,
  getStatusKey,
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
  userId,
  isAdmin,
  onEdit,
  onRemoveOrCancel,
}: {
  userId: string;
  isAdmin: boolean;
  onEdit: (key?: Key) => void;
  onRemoveOrCancel: (key?: Key) => void;
}): ColumnType<AppointmentModel>[] => {
  const columnsAdmin: ColumnType<AppointmentModel>[] = [
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
  ];

  const columnsNormalUser: ColumnType<AppointmentModel>[] = [
    {
      key: 'senderId',
      title: 'Sender',
      customNode: ({ item }) => {
        const { senderId, receiverId } = item || {};
        // Sender
        const { attributes: attributesSender, id: idSender } =
          senderId?.data || {};
        const { avatar: avatarSender, username: usernameSender = '' } =
          attributesSender || {};
        const { data: dataAvatarSender } = avatarSender || {};
        const { attributes: attributesAvatarSender } = dataAvatarSender || {};
        const { url: urlSender = '' } = attributesAvatarSender || {};

        // Receiver
        const { attributes: attributesReceiver } = receiverId?.data || {};
        const { avatar: avatarReceiver, username: usernameReceiver = '' } =
          attributesReceiver || {};
        const { data: dataAvatarReceiver } = avatarReceiver || {};
        const { attributes: attributesAvatarReceiver } =
          dataAvatarReceiver || {};
        const { url: urlReceiver = '' } = attributesAvatarReceiver || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={`${API_IMAGE_URL}${userId == idSender ? urlReceiver : urlSender}`}
              size="md"
              isBordered
              className="shrink-0"
            />
            <Text variant="primary" size="sm">
              {userId == idSender ? usernameReceiver : usernameSender}
            </Text>
          </div>
        );
      },
    },
  ];

  const baseColumns: ColumnType<AppointmentModel>[] = [
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
        const { startTime = '', status = 0 } = item || {};
        const isDisabled =
          isLaterThanCurrentTime(startTime) ||
          (!isAdmin && status !== getStatusKey('new')) ||
          (isAdmin && status === getStatusKey('cancelled'));

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
            isDisabled: !isAdmin && status !== getStatusKey('new'),
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

  return isAdmin
    ? columnsAdmin.concat(baseColumns)
    : columnsNormalUser.concat(baseColumns);
};
