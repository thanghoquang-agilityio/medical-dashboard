// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Types
import { ColumnType } from '@/types';

// Mocks
import { MOCK_APPOINTMENTS, MOCK_COLUMNS_APPOINTMENTS } from '@/mocks';

// Components
import DataGrid from '.';

const meta = {
  title: 'Components/DataGrid',
  tags: ['autodocs'],
  component: DataGrid,
  argTypes: {
    data: { description: 'data of body table' },
    columns: { description: 'columns of table' },
    pagination: { description: 'pagination of table' },
  },
} as Meta<typeof DataGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: MOCK_APPOINTMENTS,
    columns: MOCK_COLUMNS_APPOINTMENTS as ColumnType<unknown>[],
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: MOCK_COLUMNS_APPOINTMENTS as ColumnType<unknown>[],
  },
};
