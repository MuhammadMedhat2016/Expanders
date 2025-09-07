import express from 'express';
import { getTopThreeVendorsPerCountry } from './vendor.controller';

const router = express.Router();

router.get('/test', getTopThreeVendorsPerCountry);

export const vendorRouter = router;
