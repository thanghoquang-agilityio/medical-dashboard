export type StringFilter = {
  field: string;
  operator: '[$eq]' | '[$contains]' | '[$in]' | string; // TODO: add value operator when needing it
  value: string;
};

export type NullCheckFilter = {
  field: string;
  operator: '$null' | '$notNull';
  value: 'false' | 'true';
};

export type SearchParamsFilter = {
  page?: number;
  pageSize?: number;
  filters?: (StringFilter | NullCheckFilter)[];
  sorts?: string[];
};

export type SearchParams = {
  id?: string;
  page?: number;
  sortBy?: string;
  orderBy?: string;
  category?: string[];
};
