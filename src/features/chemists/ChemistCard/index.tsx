'use client';
import { lazy, useCallback, useState } from 'react';

// Components
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Avatar, Button, Text } from '@/components/ui';
import { CloseIcon, NoteIcon, StarIcon } from '@/icons';
const ConfirmModal = lazy(() => import('@/components/ui/ConfirmModal'));

// Types
import { STATUS_TYPE, UserModel } from '@/types';
import { API_IMAGE_URL, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';

// Utils
import { cn } from '@/utils';
import {
  updateUnpublishAppointment,
  updateUnpublishNotification,
  updateUnpublishUser,
} from '@/services';
import { useToast } from '@/context/toast';

export interface ChemistCardProps {
  id: string;
  data: UserModel;
  isAdmin: boolean;
  onEdit?: ({ data, id }: { data: UserModel; id: string }) => void;
}

const ChemistCard = ({ id, data, isAdmin, onEdit }: ChemistCardProps) => {
  const {
    username = '',
    description = '',
    rating = 0,
    reviews,
    tasks,
    avatar,
    specialtyId,
  } = data || {};

  const { data: dataAvatar } = avatar || {};
  const { attributes: attributesAvatar } = dataAvatar || {};
  const { url = '' } = attributesAvatar || {};

  const { data: dataSpecialty } = specialtyId || {};
  const { attributes: attributesSpecialty } = dataSpecialty || {};
  const { name: specialty = '' } = attributesSpecialty || {};

  const openToast = useToast();

  const {
    isOpen: isOpenConfirm,
    onClose: onClosConfirm,
    onOpen: onOpenConfirm,
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const handleOpenConfirmModal = useCallback(() => {
    onOpenConfirm();
  }, [onOpenConfirm]);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    const { error: errorUser } = await updateUnpublishUser(id);
    if (errorUser) {
      openToast({
        message: ERROR_MESSAGE.DELETE('chemist'),
        type: STATUS_TYPE.ERROR,
      });
      setIsLoading(false);
      return;
    }

    openToast({
      message: SUCCESS_MESSAGE.DELETE('chemist'),
      type: STATUS_TYPE.SUCCESS,
    });

    setIsLoading(false);
    onClosConfirm();

    await updateUnpublishAppointment(id);
    await updateUnpublishNotification(id);
  }, [id, onClosConfirm, openToast]);

  const handleEdit = useCallback(() => {
    onEdit?.({ data, id });
  }, [data, id, onEdit]);

  return (
    <div
      className={cn(
        `min-w-[300px] w-full h-[228px] ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`,
      )}
      onClick={handleEdit}
    >
      <Card className="bg-background-200 w-full h-full p-5 sm:p-6 gap-6 overflow-visible">
        {isAdmin && (
          <Button
            aria-label="close"
            isIconOnly
            size="tiny"
            color="red"
            className="absolute top-[-8px] right-[-8px] min-w-6"
            onClick={handleOpenConfirmModal}
          >
            <CloseIcon />
          </Button>
        )}
        <CardHeader className="flex justify-between p-0">
          <div className="flex items-center gap-2">
            <Avatar src={`${API_IMAGE_URL}${url}`} size="lg" />
            <div className="flex flex-col gap-1">
              <Text size="md" variant="title">
                {username}
              </Text>
              {specialty && (
                <Text size="xs" variant="description" customClass="font-normal">
                  {specialty}
                </Text>
              )}
            </div>
          </div>
          <Button
            color="default"
            className="text-green text-lg font-medium p-0 min-w-10"
          >
            Book
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          <Text
            size="sm"
            type="wrap"
            variant="description"
            customClass="line-clamp-2"
          >
            {description || 'No description'}
          </Text>
        </CardBody>
        <CardFooter className="p-0 flex justify-between">
          <div className="flex items-center gap-1 sm:gap-2">
            <NoteIcon customClass="w-6 h-6" />
            <Text size="sm" variant="title" customClass="font-medium">
              {tasks} Task
            </Text>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <StarIcon customClass="w-6 h-6 text-light-orange" />
            <Text size="sm" variant="title" customClass="font-medium">
              {rating} ({reviews} Reviews)
            </Text>
          </div>
        </CardFooter>
      </Card>

      <ConfirmModal
        title="Confirmation"
        subTitle={`Do you want to delete this chemist?`}
        isOpen={isOpenConfirm}
        isLoading={isLoading}
        onClose={onClosConfirm}
        onAction={handleDelete}
      />
    </div>
  );
};

export default ChemistCard;
