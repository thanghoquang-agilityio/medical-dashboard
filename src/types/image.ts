import { APIResponse } from '@/types';

export type ImageExtension = 'webp' | 'png';

type Formats = {
  large?: { url: string };
  small?: { url: string };
  medium?: { url: string };
  thumbnail?: { url: string };
};

export interface ImageModel {
  name: string;
  id: string;
  hash?: string;
  ext?: ImageExtension;
  formats?: Formats;
  url: string;
}

export type ImageResponse = APIResponse<ImageModel>;

export type ImageInfo = {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
};

export type ImageData = {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: string;
  height: string;
  size: string;
  time: string;
  expiration: string;
  image: ImageInfo;
  thumb: ImageInfo;
  medium: ImageInfo;
  delete_url: string;
};

export type ImgBBResponse = {
  data: ImageData;
  success: boolean;
  status: number;
};
