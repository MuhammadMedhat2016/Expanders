import express from 'express';
import {
  addVendor,
  addVendorCountry,
  addVendorSerivce,
} from './vendor.controller';

const router = express.Router();


router.post('/', addVendor);
router.post('/:vendorId/countries/:countryId', addVendorCountry);
router.post('/:vendorId/services/:serviceId', addVendorSerivce);
export const vendorsRouter = router;
