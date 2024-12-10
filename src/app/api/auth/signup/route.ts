import { API_ENDPOINT, FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';
import { apiClient } from '@/services';
import { AuthResponse, SignupFormData } from '@/types';
import { createErrorResponse } from '@/utils';

export async function POST(req: Request) {
  let data: SignupFormData;

  try {
    data = await req.json();
  } catch (error) {
    return createErrorResponse('Request body is not found');
  }

  const {
    email = '',
    username = '',
    password = '',
    confirmPassWord = '',
  } = data;

  const validations = [
    {
      condition: !email,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('Email'),
    },
    {
      condition: !username,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
    },
    {
      condition: !password,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('Password'),
    },
    {
      condition: !confirmPassWord,
      message: FORM_VALIDATION_MESSAGE.REQUIRED('Confirm Password'),
    },
    {
      condition: !REGEX.NAME,
      message: FORM_VALIDATION_MESSAGE.ONLY_TEXT,
    },
    {
      condition: username.length < 3,
      message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Username', 3),
    },
    {
      condition: !REGEX.EMAIL.test(email),
      message: FORM_VALIDATION_MESSAGE.INVALID('Email'),
    },
    {
      condition: password.length < 8,
      message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
    },
    {
      condition: password.length > 32,
      message: FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32),
    },
    {
      condition: !REGEX.ALL_WHITE_SPACE.test(password),
      message: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
    },
    {
      condition: password.length < 8,
      message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
    },
    {
      condition: password.length > 32,
      message: FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32),
    },
    {
      condition: !REGEX.ALL_WHITE_SPACE.test(password),
      message: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
    },
    {
      condition: confirmPassWord !== password,
      message: FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
    },
  ];

  for (const { condition, message } of validations) {
    if (condition) {
      return createErrorResponse(message);
    }
  }

  const response = await apiClient.post<AuthResponse>(
    `${API_ENDPOINT.AUTH}/register`,
    {
      body: data,
    },
  );

  return Response.json(response);
}
