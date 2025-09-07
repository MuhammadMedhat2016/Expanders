import { ProjectServicesSelection } from '../ProjectServices/projectServices.type';

export type ProjectMatchesRebuildParams = {
  projectId: string;
};

export interface ProjectSelection {
  id?: boolean;
  budget?: boolean;
  status?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
  client?: boolean;
  client_id?: boolean;
  country?: boolean;
  country_id?: boolean;
  services?: ProjectServicesSelection | boolean;
}

export interface PaginationOptions {
  offset: number;
  limit: number;
}