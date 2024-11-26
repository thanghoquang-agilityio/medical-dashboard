import { updatePublishUser } from '@/services';
import { UserModel } from '@/types';

export async function PUT(req: Request) {
  const data: string = await req.json();

  const result: {
    user: UserModel | null;
    error: string | null;
  } = await updatePublishUser(data);

  return Response.json(result);
}
