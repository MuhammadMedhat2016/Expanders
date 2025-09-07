import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Client } from './Features/Clients/client.entity';
import { Project } from './Features/Projects/project.entity';
import { Vendor } from './Features/Vendors/vendor.entity';
import { VendorCountries } from './Features/VendorCountries/vendorCountries.entity';
import { VendorServices } from './Features/VendorServices/vendorServices.entity';
import { ProjectServices } from './Features/ProjectServices/projectServices.entity';
import { Service } from './Features/Services/services.entity';
import { Country } from './Features/Countries/country.entity';
import { Match } from './Features/Matches/match.entity';

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
    Service,
    Match,
    Country,
  ],
  migrations: [],
  subscribers: [],
});
