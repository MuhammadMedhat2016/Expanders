import { AppDataSource } from '../../dataSource';
import { ProjectServices } from '../ProjectServices/projectServices.entity';
import { Vendor } from '../Vendors/vendor.entity';
import { Project } from './project.entity';
import {
  PaginationOptions,
  ProjectCreation,
  ProjectPopulationOptions,
  ProjectSelection,
} from './project.types';

const projectRepository = AppDataSource.getRepository(Project);
const projectServiceRepository = AppDataSource.getRepository(ProjectServices);
export function getProjectMatchesScores(projectId: number) {
  const vendorRepository = AppDataSource.getRepository(Vendor);
  const query = vendorRepository.createQueryBuilder('v');
  return query
    .select('v.id as vendor_id')
    .addSelect(
      'CAST(COUNT(*) AS UNSIGNED) * 2 + v.rating + v.response_sla_hours as score'
    )
    .innerJoin('v.countries', 'vc')
    .innerJoin('v.services', 'vs')
    .where((query) => {
      const sub = query
        .subQuery()
        .select('p.country_id')
        .addSelect('ps.service_id')
        .from('project', 'p')
        .innerJoin('p.services', 'ps')
        .where('p.id = :id', { id: projectId })
        .getQuery();
      return `(vc.country_id, vs.service_id) in ` + sub;
    })
    .groupBy('v.id')
    .orderBy('score');
}

export function getActiveProjects(
  paginationOptions: PaginationOptions,
  relationPopulation: ProjectPopulationOptions,
  selectionOptions: ProjectSelection
) {
  return projectRepository.find({
    where: {
      status: 'active',
    },
    order: {
      created_at: 'ASC',
    },
    relations: relationPopulation,
    select: selectionOptions,
    take: paginationOptions.limit,
    skip: paginationOptions.offset,
  });
  //   projectRepository
  //     .createQueryBuilder('p')
  //     .where('p.status = "active"')
  //     .offset(offset)
  //     .limit(limit);
}

export function getClientProject(
  clientId: number,
  projectId: number,
  projectSelectionOptions: ProjectSelection
) {
  return projectRepository.findOne({
    where: { client_id: clientId, id: projectId },
    select: projectSelectionOptions,
  });
}

export function getClientProjects(
  clientId: number,
  projectSelectionOptions: ProjectSelection
) {
  return projectRepository.find({
    where: { client_id: clientId },
    select: projectSelectionOptions,
  });
}

export function createProject(projectData: ProjectCreation) {
  return projectRepository.insert({
    client_id: projectData.clientId,
    budget: projectData.budget,
    country_id: projectData.countryId,
    status: projectData.status,
  });
}

export function addProjectRequiredService(
  projectId: number,
  serviceId: number
) {
  return projectServiceRepository.insert({
    service_id: serviceId,
    project_id: projectId,
  });
}
