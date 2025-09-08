import express from 'express';
import {
  downloadDocuments,
  getDocuments,
} from './document.controller';

const router = express.Router({ mergeParams: true });
// https://localhost:3000/projects/docuements
router.get('/downloads', downloadDocuments);
router.get('/', getDocuments);

export const allProjectDocumentsRouter = router;
