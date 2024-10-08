import { lazy } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from '@nextui-org/react';

// Components
import { Avatar, Button, Text } from '@/components/ui';
import { NoteIcon, StarIcon } from '@/icons';

// Types
import { Option, UserModel } from '@/types';
import { API_IMAGE_URL } from '@/constants';

const ChemistModal = lazy(() => import('@/features/chemists/ChemistModal'));

export interface ChemistCardProps {
  id: string;
  data: UserModel;
  isAdmin?: boolean;
  specialtyOptions: Option[];
}

const ChemistCard = ({
  id,
  specialtyOptions,
  data,
  isAdmin = false,
}: ChemistCardProps) => {
  const {
    username = '',
    description = '',
    rating = 0,
    reviews,
    tasks,
    avatar,
    specialtyId,
  } = data;

  const { isOpen: isModalOpen, onClose, onOpen: onModalOpen } = useDisclosure();

  return (
    <div className="min-w-[300px] w-full h-[228px]" onClick={onModalOpen}>
      <Card className="bg-background-200 w-full h-full p-5 sm:p-6 gap-6">
        <CardHeader className="flex justify-between p-0">
          <div className="flex items-center gap-2">
            <Avatar
              src={`${API_IMAGE_URL}${avatar?.data?.attributes?.url}`}
              size="lg"
            />
            <div className="flex flex-col gap-1">
              <Text size="md" variant="title">
                {username}
              </Text>
              <Text size="xs" variant="description" customClass="font-normal">
                {specialtyId?.data?.attributes?.name || 'Unknown'}
              </Text>
            </div>
          </div>
          <Button
            color="default"
            className="text-minty-green"
            onClick={onModalOpen}
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
      {isAdmin && (
        <ChemistModal
          id={id}
          data={data}
          isOpen={isModalOpen}
          onClose={onClose}
          specialtyOptions={specialtyOptions}
        />
      )}
    </div>
  );
};

export default ChemistCard;
