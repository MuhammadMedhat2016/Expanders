import { upsertMatchesService } from '../Matches/match.service';
import { getProjectMatchesScores } from './project.repo';

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
    console.log(matches);
    await upsertMatchesService(matches);
  } while (matches.length > 0);
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
