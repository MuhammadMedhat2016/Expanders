import { AppDataSource } from '../../dataSource';
import { Match } from './match.entity';

export function upsertMatches(matches: any[]) {
  console.log(matches);
  return AppDataSource.getRepository(Match)
    .createQueryBuilder()
    .insert()
    .into(Match)
    .values(matches)
    .orUpdate(['score'], ['project_id', 'vendor_id'])
    .updateEntity(false);
}
