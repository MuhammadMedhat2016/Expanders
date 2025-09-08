export type ProjectMatchesRebuildParams = {
  projectId: string;
};

export interface ProjectCreation {
  budget: number;
  status: 'active' | 'inactive';
  clientId: number;
  countryId: number;
}


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
  services?: boolean;
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

export const defualtProjectSelectionOptions: ProjectSelection = {
  id: true,
  budget: true,
  status: true,
  created_at: true,
  updated_at: true,
  client_id: true,
  country_id: true,
};

export const defaultProjectPaginationOptions: PaginationOptions = {
  offset: 0,
  limit: 100,
};

export const defaultProjectRelationPopulation: ProjectPopulationOptions = {
  client: false,
  country: false,
  services: false,
};
