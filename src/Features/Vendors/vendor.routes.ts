import express from 'express';
import {
  addVendor,
  addVendorCountry,
  addVendorSerivce,
  getTopThreeVendorsPerCountry,
} from './vendor.controller';

const router = express.Router();

router.get('/top-vendors', getTopThreeVendorsPerCountry);

router.post('/', addVendor);
router.post('/:vendorId/countries/:countryId', addVendorCountry);
router.post('/:vendorId/services/:serviceId', addVendorSerivce);
export const vendorsRouter = router;
