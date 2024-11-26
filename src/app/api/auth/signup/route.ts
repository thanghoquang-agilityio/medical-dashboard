import { signup } from '@/actions/auth';
import { SignupFormData } from '@/types';

export async function POST(req: Request) {
  const data: SignupFormData = await req.json();

  const { user, error } = await signup(data);

  return Response.json({
    user,
    error,
  });
}
