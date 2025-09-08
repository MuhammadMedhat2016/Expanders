import { ProjectSelection } from '../Projects/project.types';
import { CreateUser } from '../Users/user.types';

export interface ClientSelection {
  id?: boolean;
  copmany_name?: boolean;
  contact_email?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
  projects?: ProjectSelection | boolean;
}

export interface CreateClient extends CreateUser {
  company_name: string;
  contact_email: string;
  user_id: number;
}
