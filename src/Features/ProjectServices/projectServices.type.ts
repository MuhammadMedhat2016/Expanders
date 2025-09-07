import { ProjectSelection } from '../Projects/project.types';
import { ServiceSelection } from '../Services/services.types';

export interface ProjectServicesSelection {
  service_id?: boolean;
  project_id?: boolean;
  project?: boolean | ProjectSelection;
  service?: boolean | ServiceSelection;
}
