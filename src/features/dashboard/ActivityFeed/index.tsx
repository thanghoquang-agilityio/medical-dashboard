'use server';
import ActivityFeedClient from './Client';

// Services
import { getNotifications } from '@/services';

const ActivityFeed = async () => {
  const { notifications, ...meta } = await getNotifications({
    options: {
      // cache: 'no-cache',
    },
  });

  return (
    <ActivityFeedClient
      notifications={notifications || []}
      pagination={meta?.pagination}
    />
  );
};

export default ActivityFeed;
