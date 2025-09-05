import mongoose, { Schema } from 'mongoose';
import { IChunk } from './chunks.types';

const chunkSchema = new mongoose.Schema<IChunk>({
  documentId: {
    type: Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  n: {
    type: Number,
    required: true,
  },
});

chunkSchema.index({ fileId: 1, n: 1 });
chunkSchema.index({ content: 'text' });

export const Chunk = mongoose.model<IChunk>('Chunk', chunkSchema);
