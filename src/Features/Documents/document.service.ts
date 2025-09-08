import { DocumentMetadata, QueryStringDocuments } from './document.types';

import archiver from 'archiver';
import { GridFS } from '../../Utils/TextGridFs';
import { Readable } from 'node:stream';
import { searchDocuments, searchDocumentsByText } from './document.repo';

export function uploadDocumentService(documentMetadata: DocumentMetadata) {
  return GridFS.uploadDocument(documentMetadata);
}

export function streamDocumentService(documentId: string): Promise<Readable> {
  return GridFS.streamDocument(documentId);
}

export function getDocumentsService(
  projects: number[],
  query: QueryStringDocuments
) {
  if (query.text) {
    return searchDocumentsByText(projects, query);
  } else {
    return searchDocuments(projects, query);
  }
}

export async function downloadDocumentsService(
  projects: number[],
  query: QueryStringDocuments
) {
  let documents = [];
  if (query.text) {
    documents = await searchDocumentsByText(projects, query);
  } else {
    documents = await searchDocuments(projects, query);
  }
  const zib = archiver('zip', { zlib: { level: 9 } });

  const readableStreams = await Promise.all(
    documents.map(async (document) => {
      console.log(document);
      return GridFS.streamDocument(document.documentId);
    })
  );

  documents.forEach((document, idx) => {
    zib.append(readableStreams[idx], { name: document.name });
  });

  return zib;
}
