import { asyncCatch } from '../../Utils/asyncCatch';
import { addServiceService } from './services.service';
import { ServiceCreation } from './services.types';

export const addService = asyncCatch<{}, {}, ServiceCreation>(
  async (req, res) => {
    const data = await addServiceService(req.body);

    res.status(201).json({
      status: 'success',
      message: 'a serivce is added successfully',
      data: data.generatedMaps,
    });
  }
);
