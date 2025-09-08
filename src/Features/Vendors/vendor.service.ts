import { ApiError } from '../../Utils/ApiError';
import { VendorCreation } from '../VendorCountries/vendorCountries.types';
import {
  addVendor,
  addVendorCountry,
  addVendorService,
  getTopThreeVendorsPerCountry,
} from './vendor.repo';

export async function getTopThreeVendorsPerCountryService() {
  return await getTopThreeVendorsPerCountry();
}

export function createVendorService(vendorData: VendorCreation) {
  return addVendor(vendorData);
}

export async function addVendorCountryService(
  vendorId: number,
  countryId: number
) {
  try {
    return await addVendorCountry(vendorId, countryId);
  } catch (error: any) {
    if (error.errno === 1062) {
      throw new ApiError(
        'this country already is covered by this vendor',
        400,
        'fail'
      );
    } else if (error.errno == 1452) {
      throw new ApiError('no country/vendor exists with this id', 400, 'fail');
    }
    throw error;
  }
}

export async function addVendorServiceService(
  vendorId: number,
  serviceId: number
) {
  try {
    return await addVendorService(vendorId, serviceId);
  } catch (error: any) {
    if (error.errno === 1062) {
      throw new ApiError(
        'this service already is provided by this vendor',
        400,
        'fail'
      );
    } else if (error.errno == 1452) {
      throw new ApiError('no serive/vendor exists with this id', 400, 'fail');
    }
    throw error;
  }
}
