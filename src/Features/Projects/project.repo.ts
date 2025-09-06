import { AppDataSource } from '../../dataSource';
import { Vendor } from '../Vendors/vendors.entity';
import { Project } from './project.entity';

export function getProject(projectId: number) {
  const projectRepository = AppDataSource.getRepository(Project);
  return projectRepository.findOne({
    where: { id: projectId },
    relations: {
      services: true,
    },
  });
}

export function getProjectMatchesScores(
  projectId: number,
  offset: number,
  limit: number
) {
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
    .orderBy('score')
    .limit(limit)
    .offset(offset)
    .getRawMany();
}
