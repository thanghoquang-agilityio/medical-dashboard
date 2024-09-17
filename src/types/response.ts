export type APIResponse<T> = { id: string; attributes: T };

export type APIRelatedResponse<T> = { data: T };

export type MetaResponse = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type TDataResponse<T> = {
  data: APIResponse<T>[];
  meta?: MetaResponse;
};
