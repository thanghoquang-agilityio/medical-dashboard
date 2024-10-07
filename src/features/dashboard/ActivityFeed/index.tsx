'use client';

import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';

// Types
import { MetaResponse, NotificationResponse, ROLE } from '@/types';

// Constants
import {
  API_ENDPOINT,
  PAGE_SIZE_DEFAULT,
  PAGINATION_DEFAULT,
  PRIVATE_ROUTES,
} from '@/constants';

// Actions
import { getNotifications } from '@/actions/notification';
import { ActivityFeedSkeleton } from './ActivityFeedSkeleton';
const ActivityFeedList = lazy(() => import('./ActivityFeedList'));

export interface ActivityFeedProps {
  page: number;
  userId: string;
  role: string;
}

const ActivityFeed = ({ page, userId, role }: ActivityFeedProps) => {
  const [lastFetchedPage, setLastFetchedPage] = useState(page);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    [],
  );
  const [meta, setMeta] = useState<MetaResponse>(PAGINATION_DEFAULT);

  const searchParamsAPI = useMemo(() => {
    const params = new URLSearchParams();
    params.set('populate[0]', 'senderId');
    params.set('pagination[page]', page.toString());
    params.set('pagination[pageSize]', PAGE_SIZE_DEFAULT.toString());
    params.set('sort[0]', 'createdAt:desc');

    if (role === ROLE.NORMAL_USER || !role) {
      params.set('filters[senderId][id][$eq]', `${userId}`);
    }
    return params;
  }, [page, userId, role]);

  const isFirstRender = useRef(true); // Move useRef outside of useEffect

  useEffect(() => {
    setIsLoading(true);
    const fetchNotifications = async () => {
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
      setNotifications(notifications);
      setMeta(meta);
      setIsLoading(false);
    };

    if (isFirstRender.current || page !== lastFetchedPage) {
      setLastFetchedPage(page);
      fetchNotifications();
      isFirstRender.current = false; // Update after the first call
    }
  }, [page, lastFetchedPage, searchParamsAPI, userId]);

  return (
    <>
      {isLoading ? (
        <ActivityFeedSkeleton />
      ) : (
        <Suspense fallback={<ActivityFeedSkeleton />}>
          <ActivityFeedList
            userId={userId}
            notifications={notifications || []}
            pagination={
              meta.pagination && { ...meta.pagination, page: Number(page) }
            }
          />
        </Suspense>
      )}
    </>
  );
};

ActivityFeed.displayName = 'ActivityFeed';
export default ActivityFeed;
