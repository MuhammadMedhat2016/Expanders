import { ApiError } from '../../Utils/ApiError';
import { hashPassword } from '../../Utils/passwordManagements';
import { createClient } from './client.repo';
import { CreateClient } from './client.types';

export async function createClientService(client: CreateClient) {
  try {
    client.password = await hashPassword(client.password);
    return await createClient(client);
  } catch (error: any) {
    if (error.errno === 1364) {
      throw new ApiError(error.sqlMessage, 400, 'fail');
    } else if (error.errno === 1062) {
      throw new ApiError(error.sqlMessage, 400, 'fail');
    } else {
      throw error;
    }
  }
}
