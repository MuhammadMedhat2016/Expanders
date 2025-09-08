import { asyncCatch } from '../../Utils/asyncCatch';
import {
  addVendorCountryService,
  addVendorServiceService,
  createVendorService,
} from './vendor.service';

export const addVendor = asyncCatch(async (req, res) => {
  const data = await createVendorService(req.body);
  res.status(201).json({
    status: 'success',
    message: 'a new vendor has been added successfully',
    data: data.generatedMaps,
  });
});

export const addVendorCountry = asyncCatch<{
  vendorId: string;
  countryId: string;
}>(async (req, res) => {
  const data = await addVendorCountryService(
    Number(req.params.vendorId),
    Number(req.params.countryId)
  );
  res.status(201).json({
    status: 'success',
    message: 'a new country is added to the vendor successfully',
    data: data.generatedMaps,
  });
});

export const addVendorSerivce = asyncCatch<{
  vendorId: string;
  serviceId: string;
}>(async (req, res) => {
  const data = await addVendorServiceService(
    Number(req.params.vendorId),
    Number(req.params.serviceId)
  );

  res.status(201).json({
    status: 'success',
    message:
      'a new services is add to services provided by this vendor successfully',
    data: data.generatedMaps,
  });
});
