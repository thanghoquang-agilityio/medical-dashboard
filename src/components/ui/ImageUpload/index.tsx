'use client';

import { memo, useRef, useState } from 'react';

// Components
import { Button, Input, Avatar } from '@/components/ui';
import { CloseIcon, UploadImageIcon } from '@/icons';

interface ImageUploadProps {
  src?: string;
  onRemoveImage?: () => void;
  onUploadImage?: (image: File | null) => void;
  altText?: string;
  width?: number;
  height?: number;
}

export const ImageUpload = memo(
  ({
    src = '',
    altText = 'Image for avatar',
    width = 100,
    height = 100,
    onRemoveImage,
    onUploadImage,
  }: ImageUploadProps) => {
    const [imageUpload, setImageUpload] = useState<string | null>(null);
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    // Handle input changes
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
        const image = files[0];
        setImageUpload(URL.createObjectURL(image));
        onUploadImage?.(image);
      }
    };

    // Handle remove upload image
    const handleRemoveImage = () => {
      setImageUpload(null);
      if (hiddenFileInput.current) {
        hiddenFileInput.current.value = '';
      }
      onRemoveImage?.();
      onUploadImage?.(null);
    };

    const handleClick = () => {
      hiddenFileInput.current?.click();
    };

    const hasImage = imageUpload || src;

    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="relative" style={{ width, height }}>
          {imageUpload ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="object-cover w-full h-full rounded-full"
              src={imageUpload}
              alt={altText}
            />
          ) : (
            <Avatar src={src} alt={altText} className=" w-[100px] h-[100px]" />
          )}
          {hasImage && (
            <Button
              size="tiny"
              className="flex items-center justify-end text-primary-300 absolute top-[-6px] right-[-2px] z-10 p-0 min-w-6 h-6"
              isIconOnly
              onClick={handleRemoveImage}
            >
              <CloseIcon customClass="text-primary-300 w-auto" />
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          color="default"
          className="w-8 h-8 text-primary-300"
          isIconOnly
          onClick={handleClick}
        >
          <UploadImageIcon />
          <Input
            type="file"
            className="hidden"
            ref={hiddenFileInput}
            onChange={handleUpload}
            accept="image/*"
          />
        </Button>
      </div>
    );
  },
);

ImageUpload.displayName = 'ImageUpload';
