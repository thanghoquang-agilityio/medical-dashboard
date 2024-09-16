export enum STATUS_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export const STATUS_TYPE_RESPONSE = {
  0: STATUS_TYPE.SUCCESS,
  1: STATUS_TYPE.WARNING,
  2: STATUS_TYPE.SUCCESS,
} as const;
