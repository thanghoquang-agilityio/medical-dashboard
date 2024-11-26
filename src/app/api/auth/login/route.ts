import { login } from '@/actions/auth';
import { LoginFormData } from '@/types';

export async function POST(req: Request) {
  const data: LoginFormData = await req.json();

  const response = await login(data);

  return Response.json(response);
}
