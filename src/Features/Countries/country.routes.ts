import express from 'express';
import { addCountry } from './country.controller';

const router = express.Router();

router.post('/', addCountry);

export const countriesRouter = router;
