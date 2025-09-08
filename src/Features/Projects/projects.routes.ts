import express from 'express';
import { projectRouter } from './project.routes';
import { allProjectDocumentsRouter } from '../Documents/documents.routes';
import { createProject } from './project.controller';

const router = express.Router({ mergeParams: true });

// https://localhost:3000/projects/

router.use('/documents', allProjectDocumentsRouter);

router.use('/:projectId', projectRouter);

router.post('/', createProject);

export const projectsRouter = router;
