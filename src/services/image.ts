'use server';

import { apiClient } from './api';
import { ImageResponse } from '@/types';
import { API_ENDPOINT } from '@/constants';

export const uploadImage = async (payload: FormData) => {
  try {
    const response = await apiClient.postFile<
      ImageResponse & { error: string | null }
    >(API_ENDPOINT.UPLOAD, {
      body: payload,
    });

    const { error = null, ...image } = response;

    if (error) return { image: null, error };

    return { image, error };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred when upload image';

    return { image: null, error: errorMessage };
  }
};
