import express from 'express';
import { buildProjectMatches } from './project.controller';

const router = express.Router({ mergeParams: true });

router.get('/:projectId/matches/rebuild', buildProjectMatches);

export const projectRouter = router;
