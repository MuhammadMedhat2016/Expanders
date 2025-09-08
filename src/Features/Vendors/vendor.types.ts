import { VendorCountriesSelection } from '../VendorCountries/vendorCountries.types';
import { VendorServicesSelection } from '../VendorServices/vendorServices.types';

export interface VendorSelection {
  id?: boolean;
  name?: boolean;
  rating?: boolean;
  response_sla_hours?: boolean;
  countries?: boolean;
  services?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
}
