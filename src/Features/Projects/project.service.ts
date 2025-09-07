import { upsertMatchesService } from '../Matches/match.service';
import { getActiveProjects, getProjectMatchesScores } from './project.repo';
import { PaginationOptions, ProjectSelection } from './project.types';

const defualtProjectSelectionOptions: ProjectSelection = {
  id: true,
  budget: true,
  status: true,
  created_at: true,
  updated_at: true,
  client: true,
  client_id: true,
  country: true,
  country_id: true,
  services: true,
};

const defaultPaginationOptions: PaginationOptions = {
  offset: 0,
  limit: 100,
};

export async function buildProjectMatchesService(projectId: number) {
  let matches: any[] = [];
  let offset = 0;
  const LIMIT = 100;

  do {
    matches = await getProjectMatchesScores(projectId, offset, LIMIT);
    offset += LIMIT;

    matches = matches.map((match) => {
      match.project_id = projectId;
      return match;
    });
    console.log(await upsertMatchesService(matches));
  } while (matches.length > 0);
}

export async function getActiveProjectsSerivce(
  projectSelection = defaultPaginationOptions,
  selectionOptions = defualtProjectSelectionOptions
) {
  return getActiveProjects(projectSelection, selectionOptions);
}






//const project = await getProject(projectId);

// const projectCountryId = project?.country_id;

// const projectRequiredServiceIds =
//   project?.services.map((service) => {
//     return service.service_id;
//   }) || [];

// const vendorRepository = AppDataSource.getRepository(Vendor);

// const vendors = await vendorRepository.find({
//   skip: 0,
//   take: 10,
//   relations: {
//     services: true,
//     countries: true,
//   },
//   where: {
//     services: {
//       service_id: In(projectRequiredServiceIds),
//     },
//     countries: {
//       country_id: projectCountryId,
//     },
//   },
// });
