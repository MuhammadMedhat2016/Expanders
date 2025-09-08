import { ClientSelection } from '../Clients/client.types';
import { CountrySelection } from '../Countries/country.types';
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
  client?: ClientSelection;
  client_id?: boolean;
  country?: CountrySelection;
  country_id?: boolean;
  services?: ProjectServicesSelection;
}

export interface PaginationOptions {
  offset: number;
  limit: number;
}

export interface ProjectPopulationOptions {
  country?: boolean;
  client?: boolean;
  services?: boolean;
}
