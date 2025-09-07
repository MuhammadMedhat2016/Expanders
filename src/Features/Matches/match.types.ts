import { ProjectSelection } from '../Projects/project.types';
import { VendorSelection } from '../Vendors/vendor.types';

export interface MatchSelection {
  id?: boolean;
  project_id?: boolean;
  vendor_id?: boolean;
  project: boolean | ProjectSelection;
  vendor: boolean | VendorSelection;
  score: boolean;
  created_at: boolean;
  updated_at: boolean;
}
