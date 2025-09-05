import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Client } from './Entities/Client';
import { Project } from './Entities/Projects';
import { Vendor } from './Entities/Vendors';
import { VendorCountries } from './Entities/VendorCountries';
import { VendorServices } from './Entities/VendorServices';
import { ProjectServices } from './Entities/ProjectServices';
import { Match } from './Entities/Match';
import { Service } from './Entities/Services';
import { Country } from './Entities/Country';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.SQL_HOST,
  port: 3306,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [
    Client,
    Project,
    Vendor,
    VendorCountries,
    VendorServices,
    ProjectServices,
    Match,
    Service,
    Country,
  ],
  migrations: [],
  subscribers: [],
});
