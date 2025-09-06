import {
  DocumentMetadata,
  QueryStringDocuments,
} from './document.types';

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

export function getDocumentsService(query: QueryStringDocuments) {
  if (query.text) {
    return searchDocumentsByText(query);
  } else {
    return searchDocuments(query);
  }
}

export async function downloadDocumentsService(query: QueryStringDocuments) {
  let documents = [];
  if (query.text) {
    documents = await searchDocumentsByText(query);
  } else {
    documents = await searchDocuments(query);
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
