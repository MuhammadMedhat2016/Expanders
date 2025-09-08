import { ApiError } from '../../Utils/ApiError';
import { hashPassword } from '../../Utils/passwordManagements';
import { createAdmin } from './admin.repo';
import { CreateAdmin } from './admin.types';

export async function createAdminService(admin: CreateAdmin) {
  try {
    admin.password = await hashPassword(admin.password);
    return await createAdmin(admin);
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
