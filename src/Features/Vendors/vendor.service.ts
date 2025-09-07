import { getTopThreeVendorsPerCountry } from './vendor.repo';

export async function getTopThreeVendorsPerCountryService() {
  return await getTopThreeVendorsPerCountry();
}
