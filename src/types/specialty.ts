import { APIResponse } from '@/types';

export interface SpecialtyModel {
  name: string;
  type?: number;
}

export type SpecialtyResponse = APIResponse<SpecialtyModel>;

export type CategoriesDataResponse = Promise<{
  specialties: SpecialtyResponse[];
  error?: Error;
}>;

export type CategoriesResponse = {
  data: SpecialtyResponse[];
};
