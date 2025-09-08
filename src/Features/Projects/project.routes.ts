import express from 'express';
import {
  authorizeClientProject,
  buildProjectMatches,
} from './project.controller';
import { projectDocumentRouter } from '../Documents/document.routes';
// https://localhost:3000/projects/:projectId
const router = express.Router({ mergeParams: true });

router.use(authorizeClientProject('projectId', 'params'));

router.use('/documents', projectDocumentRouter);

router.put(
  '/matches/rebuild',
  authorizeClientProject('projectId', 'params'),
  buildProjectMatches
);

export const projectRouter = router;
