import { addUserToChemists } from '@/services';
import { ChemistDataResponse, ChemistPayload } from '@/types';

export async function POST(req: Request) {
  const data: ChemistPayload = await req.json();

  const result: ChemistDataResponse = await addUserToChemists(data);

  return Response.json(result);
}
