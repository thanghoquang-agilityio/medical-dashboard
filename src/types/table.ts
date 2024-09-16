import { ReactNode } from 'react';

export interface ColumnType<T extends object> {
  key: string;
  title: string;
  customNode?: (column: ColumnType<T>, item: T) => ReactNode;
}

export enum DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}
