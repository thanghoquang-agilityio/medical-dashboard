import dynamic from 'next/dynamic';
const ActivityFeedList = dynamic(() => import('./ActivityFeedList'));

// Constants
import {
  API_ENDPOINT,
  PAGE_SIZE_DEFAULT,
  PRIVATE_ROUTES,
  ROLE,
} from '@/constants';

// Services
import { getNotifications } from '@/services';

export interface ActivityFeedProps {
  page: number;
  userId: string;
  role: string;
}

const ActivityFeed = async ({ page, userId, role }: ActivityFeedProps) => {
  const searchParamsAPI = new URLSearchParams();
  searchParamsAPI.set('populate[0]', 'senderId');
  searchParamsAPI.set('pagination[page]', page.toString());
  searchParamsAPI.set('pagination[pageSize]', PAGE_SIZE_DEFAULT.toString());
  searchParamsAPI.set('sort[0]', 'createdAt:desc');

  if (role === ROLE.USER || !role) {
    searchParamsAPI.set('filters[senderId][id][$eq]', `${userId}`);
  }

  const { notifications, error, ...meta } = await getNotifications({
    searchParams: searchParamsAPI,
    options: {
      next: {
        tags: [
          API_ENDPOINT.NOTIFICATIONS,
          `${PRIVATE_ROUTES.DASHBOARD}/${userId}`,
        ],
      },
    },
  });

  if (error) throw error;

  return (
    <ActivityFeedList
      userId={userId}
      notifications={notifications || []}
      pagination={meta?.pagination}
    />
  );
};

ActivityFeed.displayName = 'ActivityFeed';

export default ActivityFeed;
