import express from 'express';
import { getTopThreeVendorsPerCountry } from './analytics.controller';

const router = express.Router();

router.get('/top-vendors', getTopThreeVendorsPerCountry);

export const analyticsRouter = router;
