import { ProjectSelection } from '../Projects/project.types';

export interface ClientSelection {
  id?: boolean;
  copmany_name?: boolean;
  contact_email?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
  projects?: ProjectSelection | boolean;
}
