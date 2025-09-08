import { AppDataSource } from '../../dataSource';
import { Project } from '../Projects/project.entity';
import { ProjectSelection } from '../Projects/project.types';
import { Country } from './country.entity';
import { CountryCreation } from './country.types';

const countryRepository = AppDataSource.getRepository(Country);
const projectRepository = AppDataSource.getRepository(Project);
export async function getCountryProjects(
  countryId: number,
  projectSelectionOptions: ProjectSelection
) {
  return projectRepository.find({
    where: {
      country_id: countryId,
    },
    select: projectSelectionOptions,
  });
}

export async function addCountry(countryData: CountryCreation) {
  return countryRepository.insert({ name: countryData.name });
}
