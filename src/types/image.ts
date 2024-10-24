export type ImageExtension = 'webp' | 'png';

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
