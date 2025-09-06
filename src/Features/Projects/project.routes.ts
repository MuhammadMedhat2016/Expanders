import express from 'express';
import { buildProjectMatches } from './project.controller';

const router = express.Router({ mergeParams: true });

router.put('/:projectId/matches/rebuild', buildProjectMatches);

export const projectRouter = router;
