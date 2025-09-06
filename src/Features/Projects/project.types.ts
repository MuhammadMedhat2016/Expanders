export type ProjectMatchesRebuildParams = {
  projectId: string;
};

export interface ProjectSelection {
  id?: boolean;
  country_id?: boolean;
  budget?: boolean;
  status?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
  client?: boolean;
  services:
    | {
        service_id?: boolean;
        project_id?: boolean;
      }
    | boolean;
}

