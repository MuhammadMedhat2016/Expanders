import { AppDataSource } from '../../dataSource';
import { Service } from './services.entity';
import { ServiceCreation } from './services.types';

const serviceRepository = AppDataSource.getRepository(Service);

export async function addService(serviceData: ServiceCreation) {
  return serviceRepository.insert({
    name: serviceData.name,
  });
}
