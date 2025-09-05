import mongoose from 'mongoose';
import { IDocument } from './document.types';

const documentSchema = new mongoose.Schema<IDocument>(
  {
    projectId: {
      type: String,
      required: true,
    },
    mimeType: String,
    name: {
      type: String,
      required: true,
    },
    size: Number,
    tags: {
      type: [String],
      index: true,
      default: [],
    },
  },
  { timestamps: true }
);

documentSchema.index({ projetId: 1, title: 1 });

export const Document = mongoose.model<IDocument>('Document', documentSchema);
