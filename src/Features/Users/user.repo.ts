import { AppDataSource } from '../../dataSource';
import { User } from './user.entity';
import { CreateUser } from './user.types';

const userRepository = AppDataSource.getRepository(User);

export function createUser(user: CreateUser) {
  return userRepository.insert({
    ...user,
  });
}

export function getUserByUserName(userName: string) {
  return userRepository.findOne({
    where: { user_name: userName },
    select: {
      password: false,
    },
  });
}

export function getUserById(id: number) {
  return userRepository.findOne({
    where: { id },
    select: {
      role: true,
      id: true,
      user_name: true,
      created_at: true,
      updated_at: true,
    },
  });
}
