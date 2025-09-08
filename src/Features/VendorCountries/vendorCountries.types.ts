import { CountrySelection } from '../Countries/country.types';
import { VendorSelection } from '../Vendors/vendor.types';

export interface VendorCountriesSelection {
  vendor_id?: boolean;
  country_id?: boolean;
  vendor?: boolean;
  country?: boolean;
}

export interface VendorCreation {
  name: string;
  rating: number;
  responseSlaHours: number;
}
