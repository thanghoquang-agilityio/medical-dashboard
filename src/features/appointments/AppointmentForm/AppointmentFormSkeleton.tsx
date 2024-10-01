'use client';

import { memo } from 'react';
import { Skeleton } from '@nextui-org/react';

// Types
import { AppointmentModel } from '@/types';

// Components
import { Button, Text } from '@/components/ui';

export type AppointmentModalProps = {
  userId: string;
  role: string;
  data?: AppointmentModel;
  onClose: () => void;
};

export const AppointmentFormSkeleton = memo(
  ({ data }: { data?: AppointmentModel }) => {
    const isEdit = !!data;

    return (
      <div className="p-4">
        <Text variant="title" size="xl">
          {isEdit ? 'Update appointment' : 'Create appointment'}
        </Text>

        <div className="flex flex-col md:flex-row md:gap-3 mt-6">
          <div className="w-full text-sm">
            <Text customClass="mb-1">Sender</Text>
            <Skeleton className="w-full h-10 mb-6 rounded-large" />
          </div>
          <div className="w-full text-sm">
            <Text customClass="mb-1">Receiver</Text>
            <Skeleton className="w-full h-10 mb-6 rounded-large" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-3 items-start">
          <div className="w-full text-sm">
            <Text customClass="mb-1">Start Date</Text>
            <Skeleton className="w-full h-10 mb-6 rounded-large" />
          </div>
          <div className="w-full text-sm">
            <Text customClass="mb-1">Start Time</Text>
            <Skeleton className="w-full h-10 mb-6 rounded-large" />
          </div>
        </div>

        <div className="w-full text-sm">
          <Text customClass="mb-1">Duration Time</Text>
          <Skeleton className="w-full h-10 mb-6 rounded-large" />
        </div>

        <div className="w-full text-sm">
          <Text customClass="mb-1">Status</Text>
          <Skeleton className="w-full h-10 mb-6 rounded-large" />
        </div>

        <div className="flex gap-4 justify-end mt-3">
          <Button
            variant="outline"
            color="outline"
            className="font-medium"
            isDisabled={true}
          >
            Cancel
          </Button>
          <Button isDisabled={true} type="submit">
            Submit
          </Button>
        </div>
      </div>
    );
  },
);

AppointmentFormSkeleton.displayName = 'AppointmentFormSkeleton';
