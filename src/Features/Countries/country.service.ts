import { addCountry, getCountryProjects } from './country.repo';
import { CountryCreation } from './country.types';

export async function getCountryProjectsIdsService(countryId: number) {
  return getCountryProjects(countryId, { country_id: true, id: true });
}

export async function addCountryService(countryData: CountryCreation) {
  return addCountry(countryData);
}
