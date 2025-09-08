import { asyncCatch } from '../../Utils/asyncCatch';
import { addCountryService } from './country.service';

export const addCountry = asyncCatch(async (req, res) => {
  const data = await addCountryService(req.body);
  res.status(201).json({
    status: 'success',
    message: 'a country is added successfully',
    data: data.generatedMaps,
  });
});
