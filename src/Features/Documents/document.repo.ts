import mongoose from 'mongoose';
import { Document } from './document.schema';
import { QueryStringDocuments } from './document.types';

export function getDocument(documentId: string) {
  return Document.findById(documentId);
}

export function getDocuments() {
  return Document.find();
}

export function getProjectDocuments(projectId: string) {
  return Document.findOne({ projectId });
}

export function getProjectDocument(projectId: string, documentId: string) {
  return Document.findOne({ projectId, _id: documentId });
}

export function getDocumentChunks(documentId: string) {
  return Document.aggregate([
    {
      $match: {
        _id: documentId,
      },
    },
    {
      $lookup: {
        from: 'chunks',
        let: { docId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$fileId', '$$docId'] } } },
          { $project: { _id: 1, n: 1 } },
          { $sort: { n: 1 } },
        ],
        as: 'chunks',
      },
    },
    {
      $project: {
        _id: 0,
        documentId: '$_id',
        chunks: '$chunks',
        chunksCount: {
          $size: '$chunks',
        },
      },
    },
  ]);
}

export async function searchDocumentsByText({
  project,
  tags,
  title,
  text,
  skip,
  limit,
}: QueryStringDocuments) {
  const Chunk = mongoose.connection.model('Chunk');

  let matchStage: any = {};

  if (project) matchStage['doc.projectId'] = project;

  if (tags)
    matchStage['doc.tags'] = {
      $all: tags?.split(',').map((val) => val.trim()),
    };
  if (title) matchStage['doc.name'] = title;

  const pipeline: any[] = [
    {
      $match: {
        $text: { $search: text },
      },
    },
    { $addFields: { score: { $meta: 'textScore' } } },
    {
      $lookup: {
        from: 'documents',
        localField: 'documentId',
        foreignField: '_id',
        as: 'doc',
      },
    },
    { $unwind: '$doc' },
    { $match: matchStage },
    {
      $group: {
        _id: '$documentId',
        doc: { $first: '$doc' },
        bestScore: { $max: '$score' },
        chunksCount: { $max: '$n' },
      },
    },
    {
      $project: {
        _id: 0,
        documentId: '$_id',
        projectId: '$doc.projectId',
        name: '$doc.name',
        tags: '$doc.tags',
        score: '$bestScore',
        chunksCount: '$chunksCount',
      },
    },
    { $sort: { score: -1 } },
    { $skip: Number(skip) ? Number(skip) : 0 },
    { $limit: Number(limit) ? Number(limit) : 10 },
  ];

  return Chunk.aggregate(pipeline);
}

export function searchDocuments({
  project,
  tags,
  title,
  skip,
  limit,
}: QueryStringDocuments) {
  let matchStage: any = {};

  if (project) matchStage['projectId'] = project;

  if (tags)
    matchStage['tags'] = {
      $all: tags?.split(',').map((val) => val.trim()),
    };
  if (title) matchStage['name'] = title;
  const pipeline = [
    {
      $match: matchStage,
    },
    {
      $lookup: {
        from: 'chunks',
        localField: '_id',
        foreignField: 'documentId',
        let: {
          docId: '$_id',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$$docId', '$documentId'],
              },
            },
          },
          {
            $count: 'chunkCount',
          },
        ],
        as: 'chunks',
      },
    },
    {
      $project: {
        documentId: '$_id',
        projectId: '$projectId',
        name: '$name',
        tags: '$tags',
        chunkCount: {
          $getField: {
            field: 'chunkCount',
            input: {
              $arrayElemAt: ['$chunks', 0],
            },
          },
        },
      },
    },
    { $skip: Number(skip) ? Number(skip) : 0 },
    { $limit: Number(limit) ? Number(limit) : 10 },
  ];

  return Document.aggregate(pipeline);
}
