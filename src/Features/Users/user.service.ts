import bcrypt from 'bcrypt';

import { getUserById, getUserByUserName } from './user.repo';

export async function getUserByUserNameService(userName: string) {
  return getUserByUserName(userName);
}

export async function verifyUser(userName: string, password: string) {
  const user = await getUserByUserNameService(userName);
  if (user) {
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) return user;
  }
}

export function getUserByIdService(id: number) {
  return getUserById(id);
}
