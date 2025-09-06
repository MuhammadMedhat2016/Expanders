import { upsertMatches } from './match.repo';

export function upsertMatchesService(matches: any[]) {
  return upsertMatches(matches).execute();
}
