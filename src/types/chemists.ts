import {
  APIRelatedResponse,
  APIResponse,
  MetaResponse,
  UserModel,
} from '@/types';

export type ChemistModel = {
  users_permissions_user: APIRelatedResponse<APIResponse<UserModel>>;
};

export type ChemistsDataResponse = Promise<
  { chemists: ChemistResponse[]; error: string | null } & MetaResponse
>;

export type ChemistsResponse = {
  data: ChemistResponse[];
  meta: MetaResponse;
};

export type ChemistPayload = {
  users_permissions_user: string;
};

export type ChemistResponse = {
  error: string | null;
};
