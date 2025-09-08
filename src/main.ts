import dotenv from 'dotenv';
dotenv.config();
import './Utils/matchScheduledJob';
import express from 'express';
import sql from 'mysql2/promise';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './dataSource';
import { projectsRouter } from './Features/Projects/projects.routes';
import { vendorsRouter } from './Features/Vendors/vendor.routes';
import { signup } from './AuthControllers/signup.controller';
import { login } from './AuthControllers/login.controller';
import { authenticateUser } from './AuthControllers/authentication.controller';
import { protect } from './AuthControllers/authorization.controller';
import { errorHandler } from './Utils/globalErrorHandler';
import { adminRouter } from './Features/Admins/admin.route';
import { addCountry } from './Features/Countries/country.controller';
import { servicesRouter } from './Features/Services/services.routes';
import { analyticsRouter } from './Features/Analytics/analytics.routes';

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
  app.use(cookieParser());

  app.post('/login', login);
  app.post('/signup', signup);
  app.use(authenticateUser);
  app.use('/admins', adminRouter);
  app.use('/projects', protect('client'), projectsRouter);
  app.use('/vendors', protect('admin'), vendorsRouter);
  app.use('/countries', protect('admin'), addCountry);
  app.use('/services', protect('admin'), servicesRouter);
  app.use('/analytics', protect('admin'), analyticsRouter);

  app.use(errorHandler);
  app.listen(process.env.PORT, () => {
    console.log(`server has started on port ${process.env.PORT}`);
  });
}

main();
