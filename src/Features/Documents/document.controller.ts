import path from 'path';
import { Request, Response } from 'express';
import multer from 'multer';
import {
  downloadDocumentsService,
  getDocumentsService,
  uploadDocumentService,
} from './document.service';
import {
  DocumentMetadata,
  QueryStringDocuments,
  UploadDocumentBody,
} from './document.types';
import { asyncCatch } from '../../Utils/asyncCatch';

export const uploadDocument = asyncCatch(async function (
  req: Request<{}, {}, UploadDocumentBody>,
  res: Response
) {
  if (req.file) {
    const documentMetadata: DocumentMetadata = {
      name: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      path: req.file.path,
      projectId: req.body.projectId,
      tags: req.body.tags.split(',').map((val) => val.trim()),
    };
    const document = await uploadDocumentService(documentMetadata);
    res.status(201).json({
      status: 'success',
      message: 'File Uploaded Successfully',
      data: document,
    });
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'document have not been uploaded successfully',
    });
  }
});

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}`;
    const extName = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extName);
  },
});

export const getDocuments = asyncCatch(
  async (req: Request<{}, QueryStringDocuments>, res: Response) => {
    const data = await getDocumentsService(req.query);
    res.json({
      status: 'success',
      message: 'data retrieved successfully',
      data,
    });
  }
);

export const downloadDocuments = asyncCatch(
  async (req: Request<{}, QueryStringDocuments>, res: Response) => {
    const zip = await downloadDocumentsService(req.query);
    zip.pipe(res);
    await zip.finalize();
  }
);

export const uploadDocumentMulter = multer({ storage: diskStorage });
