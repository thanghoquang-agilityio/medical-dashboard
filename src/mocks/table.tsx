import { AppointmentModel, ColumnType, STATUS_TYPE_RESPONSE } from '@/types';
import { formatNewDate, formatTimeAppointment } from '@/utils';
import { Status, Text } from '@/components/ui';

export const MOCK_COLUMNS_APPOINTMENTS: ColumnType<AppointmentModel>[] = [
  {
    key: 'senderId',
    title: 'Sender',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {item.senderId.data.attributes.username}
      </Text>
    ),
  },
  {
    key: 'receiverId',
    title: 'Receiver',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {item.receiverId.data.attributes.username}
      </Text>
    ),
  },
  {
    key: 'durationTime',
    title: 'Duration',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {formatTimeAppointment({
          start: item.startTime,
          duration: item.durationTime,
        })}
      </Text>
    ),
  },
  {
    key: 'startTime',
    title: 'Date',
    customNode: (_, item) => (
      <Text variant="primary" size="xs">
        {formatNewDate(item.startTime)}
      </Text>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    customNode: (_, item) => (
      <Status status={STATUS_TYPE_RESPONSE[item.status]} />
    ),
  },
];
