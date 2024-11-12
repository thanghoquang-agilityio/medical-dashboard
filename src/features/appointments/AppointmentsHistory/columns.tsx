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
        const { username = '', avatar = '' } = attributes || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={avatar}
              size="md"
              isBordered
              avatarContainerClass="shrink-0 hidden sm:block"
              className="aspect-square"
            />
            <Text
              variant="primary"
              size="sm"
              customClass="overflow-hidden max-w-[65px] md:max-w-[90px] lg:max-w-full"
            >
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
        const { username = '', avatar = '' } = attributes || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={avatar}
              size="md"
              isBordered
              avatarContainerClass="shrink-0 hidden sm:block"
              className="aspect-square"
            />
            <Text
              variant="primary"
              size="sm"
              customClass="overflow-hidden max-w-[65px] md:max-w-[90px] lg:max-w-full"
            >
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

        const { avatar: urlSender } = attributesSender || {};
        const { username: usernameSender = '' } = attributesSender || {};

        // Receiver
        const { attributes: attributesReceiver } = receiverId?.data || {};
        const { username: usernameReceiver = '', avatar: urlReceiver } =
          attributesReceiver || {};

        return (
          <div className="flex gap-2 items-center">
            <Avatar
              src={userId == idSender ? urlReceiver : urlSender}
              size="md"
              isBordered
              className="shrink-0 aspect-square"
            />
            <Text
              variant="primary"
              size="sm"
              customClass="overflow-hidden max-w-[65px] md:max-w-[90px] lg:max-w-full"
            >
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
          <Text variant="primary" size="xs" customClass="hidden sm:block">
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
        const { startTime = '', status = 0 } = item || {};
        const date = formatDayMonthYear(startTime);

        return (
          <div>
            <Status status={status} className="mb-2 md:hidden" />
            <Text variant="primary" size="xs">
              {date}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      customNode: ({ item }) => {
        const { status = 0 } = item || {};
        return <Status status={status} className="hidden md:block" />;
      },
    },
    {
      key: 'actions',
      title: 'Actions',
      customNode: ({ item, id = '' }) => {
        const { startTime = '', status = 0 } = item || {};
        const isDisabled =
          !isLaterThanCurrentTime(startTime) ||
          (!isAdmin && status !== getStatusKey('new')) ||
          (isAdmin && status === getStatusKey('cancelled'));

        const isDisabledCancel =
          !isAdmin &&
          (!isLaterThanCurrentTime(startTime) ||
            status !== getStatusKey('new'));

        const iconClasses = 'mr-2 flex-shrink-0 w-4 h-4';

        const options: OptionMoreAction[] = [
          {
            key: 'edit',
            label: 'Edit',
            startContent: (
              <EditIcon customClass={`text-success ${iconClasses}`} />
            ),
            isDisabled: isDisabled,
            onAction: () => onEdit(id),
          },
          {
            key: isAdmin ? 'delete' : 'cancel',
            label: isAdmin ? 'Delete' : 'Cancel',
            startContent: isAdmin ? (
              <DeleteIcon customClass={`text-danger-100 ${iconClasses}`} />
            ) : (
              <XmarkIcon customClass={`text-danger-100 ${iconClasses}`} />
            ),
            isDisabled: isDisabledCancel,
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
