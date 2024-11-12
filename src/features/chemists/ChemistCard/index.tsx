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
import { DeleteIcon, EditIcon, NoteIcon, StarIcon } from '@/icons';
const ConfirmModal = lazy(() => import('@/components/ui/ConfirmModal'));

// Types
import { STATUS_TYPE, UserModel } from '@/types';
import { AVATAR_THUMBNAIL, ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/constants';

// Services
import {
  updateUnpublishAppointment,
  updateUnpublishNotification,
  updateUnpublishUser,
} from '@/services';

// Hooks
import { useToast } from '@/context/toast';

// Utils
import { cn, formatNumberWithUnit } from '@/utils';

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
    reviews = 0,
    tasks = 0,
    specialtyId,
    avatar = AVATAR_THUMBNAIL,
  } = data || {};

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
    <>
      <div className="min-w-[300px] w-full h-[232px] relative">
        <Card
          aria-label="chemist-card"
          className={cn(
            'bg-background-200 w-full h-full p-6 gap-6 overflow-visible',
            isAdmin ? 'pt-0' : '',
          )}
        >
          {isAdmin && (
            <div className="group">
              <div className="absolute z-20 inset-0 rounded-large opacity-0 top-0 left-0 right-0 bottom-0 bg-primary-200 dark:group-hover:opacity-50 group-hover:opacity-70 flex justify-center items-center">
                <Button isIconOnly onClick={handleEdit} aria-label="edit-btn">
                  <EditIcon customClass="text-background-100 flex-shrink-0 w-4 h-4" />
                </Button>
                <Button
                  isIconOnly
                  onClick={handleOpenConfirmModal}
                  aria-label="delete-btn"
                >
                  <DeleteIcon customClass="text-background-100 flex-shrink-0 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
          <CardHeader className="flex justify-between p-0">
            <div className="flex items-center gap-2">
              <Avatar src={avatar} size="lg" className="aspect-square" />
              <div className="flex flex-col gap-1">
                <Text size="md" variant="title">
                  {username}
                </Text>
                {specialty && (
                  <Text
                    size="xs"
                    variant="description"
                    customClass="font-normal"
                  >
                    {specialty}
                  </Text>
                )}
              </div>
            </div>
            <Button
              color="default"
              className="text-secondary-500 text-lg font-medium p-0 min-w-10"
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
          <CardFooter className="p-0 inline-block rounded-none">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
                <div className="flex items-center gap-1 sm:gap-2">
                  <NoteIcon customClass="w-6 h-6" />
                  <Text size="sm" variant="title" customClass="font-medium">
                    {formatNumberWithUnit(tasks, 'Task')}
                  </Text>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Text size="sm" variant="title" customClass="font-medium">
                    ({formatNumberWithUnit(reviews, 'Review')})
                  </Text>
                </div>
              </div>

              <div className="flex justify-between items-center gap-1 sm:gap-2">
                <Text size="sm" variant="title" customClass="font-medium">
                  Rating: {rating}
                </Text>
                <div className="flex">
                  {new Array(rating).fill(0).map((_, index) => (
                    <StarIcon
                      key={index}
                      customClass="w-6 h-6 text-light-orange"
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ConfirmModal
        title="Confirmation"
        subTitle="Do you want to delete this chemist?"
        isOpen={isOpenConfirm}
        isLoading={isLoading}
        onClose={onClosConfirm}
        onAction={handleDelete}
      />
    </>
  );
};

export default ChemistCard;
