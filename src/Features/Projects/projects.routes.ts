import express from 'express';
import { projectRouter } from './project.routes';
import { allProjectDocumentsRouter } from '../Documents/documents.routes';

const router = express.Router({ mergeParams: true });

// https://localhost:3000/projects/

router.use('/documents', allProjectDocumentsRouter);

router.use('/:projectId', projectRouter);

export const projectsRouter = router;
