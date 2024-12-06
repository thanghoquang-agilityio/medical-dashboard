import { Avatar, Text } from '@/components/ui';
import { fromDateToNow } from '@/utils';

export type TransferItemProps = {
  avatar: string;
  username: string;
  description: string;
  createdAt: string;
};
export const TransferItem = ({
  avatar,
  username,
  description,
  createdAt,
}: TransferItemProps) => {
  return (
    <div className="flex gap-4">
      <Avatar src={avatar} size="lg" className="aspect-square" />
      <div className="flex flex-1 flex-col gap-2">
        <Text
          variant="description"
          customClass="text-[14px]/5 font-bold text-primary-200"
        >
          {username}
        </Text>

        <Text size="xs" variant="description">
          {description}
        </Text>
      </div>
      <Text size="xs" variant="description" customClass="font-bold my-auto">
        {fromDateToNow(createdAt)}
      </Text>
    </div>
  );
};
