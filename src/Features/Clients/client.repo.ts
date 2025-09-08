import { AppDataSource } from '../../dataSource';
import { User } from '../Users/user.entity';
import { Client } from './client.entity';
import { CreateClient } from './client.types';


export async function createClient(clientData: CreateClient) {
  const transactionQr = AppDataSource.createQueryRunner();
  await transactionQr.connect();
  await transactionQr.startTransaction();
  try {
    const user = transactionQr.manager.create(User, clientData);
    const userEntity = await transactionQr.manager.save(user);
    clientData.user_id = userEntity.id;
    const client = transactionQr.manager.create(Client, clientData);
    const clientEntity = await transactionQr.manager.save(client);
    await transactionQr.commitTransaction();
    return clientEntity;
  } catch (error) {
    transactionQr.rollbackTransaction();
    throw error;
  }
}
