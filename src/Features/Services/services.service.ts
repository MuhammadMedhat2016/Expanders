import { addService } from './services.repo';
import { ServiceCreation } from './services.types';

export async function addServiceService(serviceData: ServiceCreation) {
  return  addService(serviceData);
}
