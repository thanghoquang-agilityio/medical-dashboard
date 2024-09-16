export type APIResponse<T extends object> = { id: string; attributes: T };

export type APIRelatedResponse<T extends object> = { data: T };

export type MetaResponse = {
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
};

export type TDataResponse<T extends object> = {
  data: APIResponse<T>[];
  meta?: MetaResponse;
};
