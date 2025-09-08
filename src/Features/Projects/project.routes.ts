import express from 'express';
import {
  addProjectService,
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

router.post('/services/:serviceId', addProjectService);

export const projectRouter = router;
