import { APIResponse, MetaResponse } from '@/types';

export interface SpecialtyModel {
  name: string;
  type?: number;
}

export type SpecialtyResponse = APIResponse<SpecialtyModel>;

export type SpecialtyDataResponse = Promise<
  {
    specialties: SpecialtyResponse[];
    error?: string | null;
  } & MetaResponse
>;

export type SpecialtiesResponse = {
  data: SpecialtyResponse[];
  meta: MetaResponse;
};
