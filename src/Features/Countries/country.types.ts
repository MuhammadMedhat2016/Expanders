import { ProjectSelection } from '../Projects/project.types';

export interface CountrySelection {
  id?: boolean;
  name?: boolean;
  project?: ProjectSelection | boolean;
  created_at?: boolean;
  updated_at?: boolean;
}
