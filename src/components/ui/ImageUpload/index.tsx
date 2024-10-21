'use client';

import { forwardRef } from 'react';

// Components
import { Button, Input, Avatar } from '@/components/ui';
import { CloseIcon, UploadImageIcon } from '@/icons';
import { API_IMAGE_URL } from '@/constants';

interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  isDisabled?: boolean;
  src?: string;
  srcUpload?: string;
  onRemoveImage?: () => void;
  onUploadImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  altText?: string;
  width?: number;
  height?: number;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      isDisabled = false,
      src = '',
      srcUpload = '',
      altText = 'Image for avatar',
      width = 100,
      height = 100,
      onRemoveImage,
      onUploadImage,
    },
    ref,
  ) => {
    const hasImage = srcUpload || src;

    return (
      <div className="flex flex-col justify-center items-center">
        <div className="relative rounded-full" style={{ width, height }}>
          <label htmlFor="avatar" className="group cursor-pointer relative">
            <Avatar
              className="w-[100px] h-[100px]"
              src={srcUpload || `${API_IMAGE_URL}${src}`}
              alt={altText}
            />
            <div className="w-[100px] h-[100px] rounded-full absolute z-20 inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <UploadImageIcon customClass="w-5 h-5" />
            </div>
          </label>
          {hasImage && (
            <Button
              size="tiny"
              className="flex items-center justify-end text-primary-300 absolute top-[-6px] right-[-2px] z-10 p-0 min-w-6 h-6"
              isIconOnly
              onClick={onRemoveImage}
              isDisabled={isDisabled}
            >
              <CloseIcon customClass="text-primary-300 w-auto" />
            </Button>
          )}
        </div>

        <Input
          type="file"
          className="hidden"
          ref={ref}
          onChange={onUploadImage}
          id="avatar"
          data-testid="upload-image"
          accept="image/*"
        />
      </div>
    );
  },
);

ImageUpload.displayName = 'ImageUpload';
