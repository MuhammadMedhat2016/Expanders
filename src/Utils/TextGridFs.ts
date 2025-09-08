import { Readable } from 'node:stream';
import mongoose from 'mongoose';
import { IDocument } from '../Features/Documents/document.types';
import { createReadStream } from 'node:fs';
import { Chunk } from '../Features/Chunks/chunks.model';
import { IChunk } from '../Features/Chunks/chunks.types';

import { DocumentMetadata } from '../Features/Documents/document.types';
import { Document } from '../Features/Documents/document.model';

interface StreamState {
  chunksLoaded: number;
  chunksRead: number;
  buffer: Buffer;
}

export class GridFS {
  private static BATCH_SIZE = 20;
  private static CHUNCK_SIZE = 256 * 1024;
  public static async uploadDocument(docMetadata: DocumentMetadata) {
    // Transaction Maybe here
    try {
      const document = await GridFS.uploadDocumentMetadata(docMetadata);
      const readStream = createReadStream(docMetadata.path, {
        highWaterMark: 20 * 256 * 1024,
      });
      await GridFS.uploadChunkedDocument(document.id, readStream);
      return document;
    } catch (error: any) {
      throw new Error(`Error uploading file, ${error.message}`);
    }
  }

  private static async uploadDocumentMetadata(docMetadata: DocumentMetadata) {
    const document: mongoose.HydratedDocument<IDocument> = new Document(
      docMetadata
    );
    return document.save();
  }
  private static async uploadChunkedDocument(
    documentId: string,
    readFileStream: Readable
  ) {
    return new Promise<string>(async (resolve, reject) => {
      const CHUNCK_SIZE = 256 * 1024;

      let n = 1;

      readFileStream.on('error', (error) => {
        reject(error.message);
      });

      readFileStream.on('end', () => {
        resolve('success');
      });

      readFileStream.on('data', async (chunk) => {
        const chunksPromises: Promise<mongoose.HydratedDocument<IChunk>>[] = [];

        const buffer = Buffer.from(chunk);

        for (let i = 0; i < Math.ceil(buffer.length / CHUNCK_SIZE); ++i) {
          const content = buffer
            .subarray(i * CHUNCK_SIZE, (i + 1) * CHUNCK_SIZE)
            .toString('utf-8');
          const chunk: mongoose.HydratedDocument<IChunk> = new Chunk({
            documentId,
            content,
            n: n++,
          });
          chunksPromises.push(chunk.save());
        }
        await Promise.all(chunksPromises);
      });
    });
  }
  private static getDocumentChunksCount(documentId: string) {
    const Chunks = mongoose.connection.model('Chunk');

    return Chunks.countDocuments({ documentId });
  }

  private static async readChunksBatch(documentId: string, index: number) {
    console.log(documentId);
    const pipeline: any[] = [
      {
        $match: {
          documentId: new mongoose.Types.ObjectId(documentId),
          n: { $gte: index, $lt: index + GridFS.BATCH_SIZE },
        },
      },
      {
        $sort: { n: 1 },
      },
      {
        $group: {
          _id: '$documentId',
          contentArray: { $push: '$content' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          documentId: '$_id',
          batchSize: '$count',
          content: {
            $reduce: {
              input: '$contentArray',
              initialValue: '',
              in: {
                $concat: ['$$value', '$$this'],
              },
            },
          },
        },
      },
    ];
    const data = await Chunk.aggregate(pipeline);
    console.log(data);
    if (data.length !== 0) {
      return {
        chunksRead: 0,
        buffer: Buffer.from(data[0].content),
        chunksLoaded: data[0].batchSize,
      };
    } else {
      return {
        chunksRead: -1,
        buffer: Buffer.alloc(0),
        chunksLoaded: -1,
      };
    }
  }

  public static async streamDocument(documentId: string): Promise<Readable> {
    let index = 1;

    let streamState: StreamState = {
      chunksLoaded: 0,
      chunksRead: 0,
      buffer: Buffer.alloc(0),
    };

    function isStreamValid() {
      if (streamState.chunksRead == streamState.chunksLoaded) return false;
      else if (streamState.chunksRead < streamState.chunksLoaded) return true;
      else console.error();
    }

    const readable = new Readable({
      highWaterMark: 2 * GridFS.CHUNCK_SIZE, // 2 chunks/read
      async read() {
        console.log(streamState);
        if (!isStreamValid()) {
          streamState = await GridFS.readChunksBatch(documentId, index);
          console.log(streamState);
          index += GridFS.BATCH_SIZE;
        }
        if (isStreamValid()) {
          const chunk = streamState.buffer.subarray(
            streamState.chunksRead * GridFS.CHUNCK_SIZE,
            (streamState.chunksRead + 1) * GridFS.CHUNCK_SIZE
          );
          streamState.chunksRead += 1;
          this.push(chunk);
        } else {
          this.push(null);
        }
      },
    });

    return readable;
  }
}
