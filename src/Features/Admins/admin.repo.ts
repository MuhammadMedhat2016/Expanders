import { AppDataSource } from '../../dataSource';
import { User } from '../Users/user.entity';
import { Admin } from './admin.entity';
import { CreateAdmin } from './admin.types';

export async function createAdmin(adminData: CreateAdmin) {
  const transactionQr = AppDataSource.createQueryRunner();
  await transactionQr.connect();
  await transactionQr.startTransaction();
  try {
    const user = transactionQr.manager.create(User, adminData);
    const userEntity = await transactionQr.manager.save(user);
    adminData.user_id = userEntity.id;
    const admin = transactionQr.manager.create(Admin, adminData);
    const adminEntity = await transactionQr.manager.save(admin);
    await transactionQr.commitTransaction();
    return adminEntity;
  } catch (error) {
    transactionQr.rollbackTransaction();
    throw error;
  }
}
