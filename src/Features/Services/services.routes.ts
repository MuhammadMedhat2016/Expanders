import express from 'express';
import { addService } from './services.controller';

const router = express.Router();

router.post('/', addService);

export const servicesRouter = router;
