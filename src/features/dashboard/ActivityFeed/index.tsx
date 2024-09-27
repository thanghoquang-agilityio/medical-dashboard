import ActivityFeedList from './ActivityFeedList';

// Constants
import {
  API_ENDPOINT,
  PAGE_SIZE_DEFAULT,
  PRIVATE_ROUTES,
  ROLE,
} from '@/constants';

// Services
import { getNotifications } from '@/services';
interface ActivityFeedProps {
  page: number;
  id: string;
  role: string;
}

const ActivityFeed = async ({ page, id, role }: ActivityFeedProps) => {
  const searchParamsAPI = new URLSearchParams();
  searchParamsAPI.set('populate[0]', 'senderId');
  searchParamsAPI.set('pagination[page]', `${page}`);
  searchParamsAPI.set('pagination[pageSize]', PAGE_SIZE_DEFAULT.toString());
  searchParamsAPI.set(`sort[0]`, 'createdAt:desc');

  if (role === ROLE.USER || !role) {
    searchParamsAPI.set('filters[senderId][id][$eq]', id);
  }

  const { notifications, ...meta } = await getNotifications({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [API_ENDPOINT.NOTIFICATIONS, `${PRIVATE_ROUTES.DASHBOARD}/${id}`],
      },
    },
  });

  return (
    <ActivityFeedList
      userId={id}
      notifications={notifications || []}
      pagination={meta?.pagination}
    />
  );
};

export default ActivityFeed;
