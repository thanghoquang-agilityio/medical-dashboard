import { ReactNode } from 'react';

export interface ColumnType<T> {
  key: string;
  title: string;
  customNode?: ({
    column,
    item,
    id,
  }: {
    column?: ColumnType<T>;
    item?: T;
    id?: string;
  }) => ReactNode;
}

export enum DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}
