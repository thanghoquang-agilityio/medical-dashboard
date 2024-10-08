'use server';

import { apiClient } from './api';
import { ImageModel } from '@/types';
import { API_ENDPOINT } from '@/constants';

export const uploadImage = async (payload: FormData) => {
  try {
    const response = await apiClient.postFile<ImageModel[]>(
      API_ENDPOINT.UPLOAD,
      {
        body: payload,
      },
    );

    return { image: response, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred when upload image';

    return { image: null, error: errorMessage };
  }
};
