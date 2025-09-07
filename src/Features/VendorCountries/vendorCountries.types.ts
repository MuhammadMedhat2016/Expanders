import { CountrySelection } from '../Countries/country.types';
import { VendorSelection } from '../Vendors/vendor.types';

export interface VendorCountriesSelection {
  vendor_id?: boolean;
  country_id?: boolean;
  vendor?: VendorSelection | boolean;
  country?: CountrySelection | boolean;
}
