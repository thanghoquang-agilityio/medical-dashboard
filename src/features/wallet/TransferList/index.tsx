import { TRANSFER_SEARCH_PARAMS } from '@/constants/wallet';
import { getTransferHistory } from '@/services/transfer';
import { TransferItem } from '../WalletSection/TransferItem';
import { DIRECTION } from '@/types';
import { Text } from '@/components/ui';

export type TransferListProps = {
  id: string;
};
const TransferList = async ({ id }: TransferListProps) => {
  const searchParamsAPI = new URLSearchParams();

  searchParamsAPI.append('sort[0]', `createdAt:${DIRECTION.DESC}`);

  TRANSFER_SEARCH_PARAMS.forEach((params, index) => {
    searchParamsAPI.append(`populate[${params}][fields]`, 'username');
    searchParamsAPI.append(`populate[${params}][fields]`, 'avatar');
    searchParamsAPI.append(`filters[$or][${index}][${params}]`, id);
  });

  const { data: transfers } = await getTransferHistory({
    searchParams: searchParamsAPI,
  });

  return (
    <div className="flex flex-col h-[200px] overflow-y-scroll scrollbar-hide justify-start gap-7 ">
      {transfers.map((transfer, _) => {
        const {
          amount = 0,
          createdAt = '',
          senderId: sender,
        } = transfer.attributes;

        const {
          attributes: { username: senderName = '', avatar: senderAvatar = '' },
          id: senderId,
        } = sender.data || {};

        const avatar = senderAvatar;
        const username = senderName;

        const description =
          senderId.toString() == id
            ? `Just spent $${amount}`
            : `Just send to you $${amount}`;

        return (
          <TransferItem
            key={transfer.id}
            avatar={avatar}
            username={username}
            description={description}
            createdAt={createdAt}
          />
        );
      })}

      {!transfers.length && (
        <Text variant="title" customClass="my-auto mx-auto">
          No transfer
        </Text>
      )}
    </div>
  );
};

export default TransferList;
