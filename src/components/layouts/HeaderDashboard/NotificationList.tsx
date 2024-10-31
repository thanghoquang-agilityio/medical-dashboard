'use client';
import { getNotifications } from '@/actions/notification';
import { Avatar, Spinner, Text } from '@/components/ui';
import {
  API_ENDPOINT,
  PAGE_DEFAULT,
  PRIVATE_ROUTES,
  TYPE_CLASSES,
} from '@/constants';
import { SingleDotIcon } from '@/icons';
import { NotificationResponse } from '@/types';
import { formatDateTime, fromDateToNow } from '@/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface NotificationListProps {
  initialNotifications?: NotificationResponse[];
  searchParams: string;
  id?: string;
}

const NotificationList = ({
  searchParams,
  id = '',
  initialNotifications = [],
}: NotificationListProps) => {
  const [notifications, setNotifications] =
    useState<NotificationResponse[]>(initialNotifications);
  const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement>(null);

  const searchParamsAPI = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const fetchMoreNotifications = useCallback(async () => {
    const nextPage = currentPage + 1;
    searchParamsAPI.set('pagination[page]', nextPage.toString());

    const { notifications, pagination } = await getNotifications({
      searchParams: searchParamsAPI,
      options: {
        next: {
          tags: [
            API_ENDPOINT.NOTIFICATIONS,
            `${PRIVATE_ROUTES.DASHBOARD}/${id}`,
          ],
        },
      },
    });

    setNotifications((prev) => [...prev, ...notifications]);
    setCurrentPage(nextPage);

    pagination && pagination.page >= pagination.pageCount && setHasMore(false);
  }, [currentPage, id, searchParamsAPI]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && hasMore) {
        fetchMoreNotifications();
      }
    },
    [fetchMoreNotifications, hasMore],
  );

  useEffect(() => {
    const element = observerRef.current;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    element && observer.observe(element);

    return () => {
      element && observer.unobserve(element);
    };
  }, [handleObserver]);

  return (
    <div className="h-80 flex flex-col pl-4 overflow-y-scroll">
      {notifications.length ? (
        <>
          {notifications.map(({ attributes, id }, index) => (
            <div
              key={`${id}-${index}`}
              className="w-full relative flex justify-start my-2"
            >
              <Avatar
                src={attributes.senderAvatar}
                size="md"
                isCustomBordered
                className="aspect-square"
              />
              <div className="w-[315px] sm:w-[420px] flex flex-col pl-2 pr-10">
                <Text
                  size="xs"
                  variant="description"
                  customClass={TYPE_CLASSES.wrap}
                >
                  You {attributes.info.content} at&nbsp;
                  {formatDateTime(attributes.info.startTime)}
                </Text>
                <Text variant="subTitle" size="2xs">
                  {fromDateToNow(attributes.createdAt ?? '')}
                </Text>
              </div>
              {!attributes.isRead && (
                <SingleDotIcon customClass="absolute right-0 w-10 h-full text-primary" />
              )}
            </div>
          ))}

          {hasMore && (
            <div className="relative w-full pt-9" ref={observerRef}>
              <Spinner
                size="sm"
                classNames={{
                  circle1: 'border-[2px]',
                  circle2: 'border-[2px]',
                }}
                className="absolute"
              />
            </div>
          )}
        </>
      ) : (
        <Text variant="title" customClass="my-auto pr-4">
          No notification
        </Text>
      )}
    </div>
  );
};

export default NotificationList;
