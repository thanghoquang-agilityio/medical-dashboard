'use client';

import { forwardRef } from 'react';

// Components
import { Button, Input, Avatar } from '@/components/ui';
import { CloseIcon, UploadImageIcon } from '@/icons';
import { API_IMAGE_URL } from '@/constants';

interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  srcUpload?: string;
  onRemoveImage?: () => void;
  onClick?: () => void;
  onUploadImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  altText?: string;
  width?: number;
  height?: number;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      src = '',
      srcUpload = '',
      altText = 'Image for avatar',
      width = 100,
      height = 100,
      onRemoveImage,
      onUploadImage,
      onClick,
    },
    ref,
  ) => {
    const hasImage = srcUpload || src;

    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="relative" style={{ width, height }}>
          {srcUpload ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="object-cover w-full h-full rounded-full"
              src={srcUpload}
              alt={altText}
            />
          ) : (
            <Avatar
              src={`${API_IMAGE_URL}${src}`}
              alt={altText}
              className=" w-[100px] h-[100px]"
            />
          )}
          {hasImage && (
            <Button
              size="tiny"
              className="flex items-center justify-end text-primary-300 absolute top-[-6px] right-[-2px] z-10 p-0 min-w-6 h-6"
              isIconOnly
              onClick={onRemoveImage}
            >
              <CloseIcon customClass="text-primary-300 w-auto" />
            </Button>
          )}
        </div>
        <Button
          color="primary"
          className="w-20 h-8 text-primary-100"
          onClick={onClick}
        >
          <UploadImageIcon />
          <Input
            type="file"
            className="hidden"
            ref={ref}
            onChange={onUploadImage}
            accept="image/*"
          />
        </Button>
      </div>
    );
  },
);

ImageUpload.displayName = 'ImageUpload';
