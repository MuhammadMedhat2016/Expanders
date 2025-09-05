import mongoose from 'mongoose';
export interface IChunk {
  documentId: mongoose.Schema.Types.ObjectId;
  content: string;
  n: number;
}
