import { CreateUser } from '../Users/user.types';

export interface CreateAdmin extends CreateUser {
  name: string;
  contact_email: string;
  user_id: number;
}
