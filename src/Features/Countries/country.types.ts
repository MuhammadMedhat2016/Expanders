import { ProjectSelection } from '../Projects/project.types';

export interface CountrySelection {
  id?: boolean;
  name?: boolean;
  project?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
}

export interface CountryCreation {
  name: string;
}
