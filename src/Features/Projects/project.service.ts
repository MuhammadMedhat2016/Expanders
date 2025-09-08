import { upsertMatchesService } from '../Matches/match.service';
import {
  addProjectRequiredService,
  createProject,
  getActiveProjects,
  getClientProject,
  getClientProjects,
  getProjectMatchesScores,
} from './project.repo';
import { ApiError } from '../../Utils/ApiError';

import {
  defaultProjectPaginationOptions,
  defaultProjectRelationPopulation,
  defualtProjectSelectionOptions,
  ProjectCreation,
} from './project.types';

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
  paginationOptions = defaultProjectPaginationOptions,
  relationPopulation = defaultProjectRelationPopulation,
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

export async function createProjectService(projectData: ProjectCreation) {
  return createProject(projectData);
}

export async function addProjectRequiredServiceService(
  projectId: number,
  serviceId: number
) {
  try {
    return await addProjectRequiredService(projectId, serviceId);
  } catch (error: any) {
    if (error.errno === 1062) {
      throw new ApiError(
        'this service already exists on this project',
        400,
        'fail'
      );
    } else if (error.errno == 1452) {
      throw new ApiError('no service exists with this id', 400, 'fail');
    }
    throw error;
  }
}
