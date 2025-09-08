export interface IDocument {
  projectId: number;
  tags: string[];
  size: number;
  mimeType: string;
  name: string;
}

export type DocumentMetadata = IDocument & {
  size: number;
  mimeType: string;
  path: string;
};

export interface UploadDocumentBody {
  title: string;
  tags: string;
}

export interface QueryStringDocuments {
  title?: string;
  tags?: string;
  text?: string;
  project?: string;
  skip?: string;
  limit?: string;
}
