// Components
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import { Avatar, Button, Text } from '@/components/ui';
import { NoteIcon, StarIcon } from '@/icons';

// Types
import { UserModel } from '@/types';
import { API_IMAGE_URL } from '@/constants';

// Utils
import { cn } from '@/utils';

export interface ChemistCardProps {
  data: UserModel;
  isAdmin: boolean;
  onEdit?: () => void;
}

const ChemistCard = ({ data, isAdmin, onEdit }: ChemistCardProps) => {
  const {
    username = '',
    description = '',
    rating = 0,
    reviews,
    tasks,
    avatar,
    specialtyId,
  } = data;

  const { data: dataAvatar } = avatar || {};
  const { attributes: attributesAvatar } = dataAvatar || {};
  const { url = '' } = attributesAvatar || {};

  const { data: dataSpecialty } = specialtyId || {};
  const { attributes: attributesSpecialty } = dataSpecialty || {};
  const { name: specialty = '' } = attributesSpecialty || {};

  return (
    <div
      className={cn(
        `min-w-[300px] w-full h-[228px] ${isAdmin ? 'cursor-pointer' : 'cursor-default'}`,
      )}
      onClick={onEdit}
    >
      <Card className="bg-background-200 w-full h-full p-5 sm:p-6 gap-6">
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
          <Button color="default" className="text-minty-green">
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
    </div>
  );
};

export default ChemistCard;
