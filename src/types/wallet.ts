import { APIRelatedResponse, APIResponse, MetaResponse } from './response';
import { UserModel } from './user';

export type ReceiveMoneyFormData = {
  amount: string;
  id: string;
};

export type SendMoneyFormData = {
  amount: string;
  senderId: string;
  receiverId: string;
};

export type SendMoneyPayload = {
  senderId: string;
  senderBalance: number;
  senderSpending: number;
  receiverId: string;
  receiverBalance: number;
  amount: number;
};

export type TransferPayload = {
  senderId: string;
  receiverId: string;
  amount: number;
};

export type TransferResponse = {
  data: APIResponse<{
    amount: number;
  }>;
  meta?: MetaResponse;
};

export type Transfer = {
  senderId: APIRelatedResponse<
    APIResponse<Pick<UserModel, 'username' | 'avatar'>>
  >;
  receiverId: APIRelatedResponse<
    APIResponse<Pick<UserModel, 'username' | 'avatar'>>
  >;
  amount: number;
  createdAt: string;
};

export type TransferDataResponse = {
  data: Array<APIResponse<Transfer>>;
  meta?: MetaResponse;
  error: string | null;
};
