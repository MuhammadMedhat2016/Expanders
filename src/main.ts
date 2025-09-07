import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sql from 'mysql2/promise';
import mongoose from 'mongoose';
import { AppDataSource } from './dataSource';
import { documentsRouter } from './Features/Documents/document.routes';
import { projectRouter } from './Features/Projects/project.routes';
import { vendorRouter } from './Features/Vendors/vendor.routes';
import './Utils/matchScheduledJob';
async function connectMySQL() {
  try {
    const sqlConnection = await sql.createConnection({
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASS,
      database: process.env.SQL_DATABASE_NAME,
    });
    console.log(
      `Connected Successfully to MYSQL ${process.env.SQL_HOST}@${process.env.SQL_USER}`
    );
    return sqlConnection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function connectMongoDB() {
  try {
    const mongoConnection = await mongoose.connect(
      `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`
    );
    console.log(
      `Connected Successfully to MongoDB ${process.env.MONGO_HOST}@${process.env.MONGO_PORT}`
    );
    return mongoConnection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function main() {
  await Promise.all([AppDataSource.initialize(), connectMongoDB()]);
  const app = express();

  app.use(express.json());

  app.use('/documents', documentsRouter);
  app.use('/projects', projectRouter);
  app.use('/vendors', vendorRouter);
  // app.use('')

  app.listen(process.env.PORT, () => {
    console.log(`server has started on port ${process.env.PORT}`);
  });
}

main();
