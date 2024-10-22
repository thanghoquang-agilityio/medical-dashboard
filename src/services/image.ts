'use server';

import { IMGBB_URL } from '@/constants';
import { ImgBBResponse } from '@/types';

export const uploadImageToImgbb = async (payload: FormData) => {
  try {
    const response = await fetch(IMGBB_URL, {
      headers: undefined,
      body: payload,
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.text();

      throw new Error(error);
    }

    const {
      data: { url },
    }: ImgBBResponse = await response.json();
    return { image: url, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred when upload image';

    return { image: null, error: errorMessage };
  }
};
