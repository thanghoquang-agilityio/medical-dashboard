import { API_ENDPOINT, FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';
import { apiClient } from '@/services';
import { AuthResponse, LoginFormData } from '@/types';
import { createErrorResponse } from '@/utils';

export async function POST(req: Request) {
  let data: Omit<LoginFormData, 'remember'>;

  try {
    data = await req.json();
  } catch (error) {
    return createErrorResponse('Request body is not found');
  }

  const { identifier = '', password = '' } = data;

  const validations = [
    {
      condition: !identifier || !password,
      message: 'Identifier and password are required',
    },
    {
      condition: !REGEX.EMAIL.test(identifier),
      message: FORM_VALIDATION_MESSAGE.INVALID('Identifier'),
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
  ];

  for (const { condition, message } of validations) {
    if (condition) {
      return createErrorResponse(message);
    }
  }

  const response = await apiClient.post<AuthResponse>(API_ENDPOINT.AUTH, {
    body: data,
  });

  return Response.json(response);
}
