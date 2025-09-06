import express from 'express';
import {
  downloadDocuments,
  getDocuments,
  uploadDocument,
  uploadDocumentMulter,
} from './document.controller';

const router = express.Router();

router.get('/downloads', downloadDocuments);
router.post('/', uploadDocumentMulter.single('document'), uploadDocument);
router.get('/', getDocuments);

export const documentsRouter = router;
