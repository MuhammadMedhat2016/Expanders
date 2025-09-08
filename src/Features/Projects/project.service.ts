import { ApiError } from '../../Utils/ApiError';
import { upsertMatchesService } from '../Matches/match.service';
import {
  getActiveProjects,
  getClientProject,
  getClientProjects,
  getProjectMatchesScores,
} from './project.repo';
import {
  PaginationOptions,
  ProjectPopulationOptions,
  ProjectSelection,
} from './project.types';

const defualtProjectSelectionOptions: ProjectSelection = {
  id: true,
  budget: true,
  status: true,
  created_at: true,
  updated_at: true,
  client_id: true,
  country_id: true,
};

const defaultPaginationOptions: PaginationOptions = {
  offset: 0,
  limit: 100,
};

const defaultRelationPopulation: ProjectPopulationOptions = {
  client: false,
  country: false,
  services: false,
};

export async function buildProjectMatchesService(projectId: number) {
  let matches: any[] = [];
  let offset = 0;
  const LIMIT = 100;
  let anyRowsInserted = false;
  do {
    if (matches.length != 0) {
      const upsertionResult = await upsertMatchesService(matches);
      console.log(upsertionResult);
      anyRowsInserted =
        upsertionResult.raw.insertId != 0 ? true : anyRowsInserted;
    }

    matches = await getProjectMatchesScores(projectId)
      .limit(LIMIT)
      .offset(offset)
      .getRawMany();

    offset += matches.length;

    matches = matches.map((match) => {
      match.project_id = projectId;
      return match;
    });
  } while (matches.length > 0);

  return anyRowsInserted;
}

export function getProjectMatchesCountService(projectId: number) {
  return getProjectMatchesScores(projectId).getCount();
}

export async function getActiveProjectsSerivce(
  paginationOptions = defaultPaginationOptions,
  relationPopulation = defaultRelationPopulation,
  selectionOptions = defualtProjectSelectionOptions
) {
  return getActiveProjects(
    paginationOptions,
    relationPopulation,
    selectionOptions
  );
}

export async function getClientProjectService(
  clientId: number,
  projectId: number,
  projectSelectionOptions = defualtProjectSelectionOptions
) {
  const project = await getClientProject(
    clientId,
    projectId,
    projectSelectionOptions
  );
  return project;
}

export async function getClientProjectsService(
  clientId: number,
  projectSelectionOptions = defualtProjectSelectionOptions
) {
  return getClientProjects(clientId, projectSelectionOptions);
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
