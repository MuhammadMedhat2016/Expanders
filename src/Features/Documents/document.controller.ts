import path from 'path';
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
import { ApiError } from '../../Utils/ApiError';
import { getClientProjectsService } from '../Projects/project.service';

export const uploadDocument = asyncCatch<
  { projectId: string },
  { status: string; message: string; data?: any },
  UploadDocumentBody
>(async (req, res) => {
  if (req.file) {
    const documentMetadata: DocumentMetadata = {
      name: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      path: req.file.path,
      projectId: Number(req.params.projectId),
      tags: req.body.tags.split(',').map((val) => val.trim()),
    };
    const document = await uploadDocumentService(documentMetadata);
    res.status(201).json({
      status: 'success',
      message: 'Document has been Uploaded Successfully',
      data: document,
    });
  } else {
    throw new ApiError(
      'Docuement has not been uploaded successfully',
      400,
      'error'
    );
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

export const getDocuments = asyncCatch<
  { projectId: string },
  {},
  {},
  QueryStringDocuments
>(async (req, res) => {
  let projectIds: number[] = [];
  if (!req.params.projectId) {
    projectIds = (
      await getClientProjectsService(req.user?.id!, {
        id: true,
      })
    ).map((project) => project.id);
  } else {
    projectIds.push(Number(req.params.projectId));
  }
  const data = await getDocumentsService(projectIds, req.query);
  res.json({
    status: 'success',
    message: 'data retrieved successfully',
    data,
  });
});

export const downloadDocuments = asyncCatch<
  { projectId: string },
  {},
  {},
  QueryStringDocuments
>(async (req, res) => {
  let projectIds: number[] = [];
  if (!req.params.projectId) {
    projectIds = (
      await getClientProjectsService(req.user?.id!, {
        id: true,
      })
    ).map((project) => project.id);
  } else {
    projectIds.push(Number(req.params.projectId));
  }
  const zip = await downloadDocumentsService(projectIds, req.query);
  zip.pipe(res);
  await zip.finalize();
});

export const uploadDocumentMulter = multer({ storage: diskStorage });
