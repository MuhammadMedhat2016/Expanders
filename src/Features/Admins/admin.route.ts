import express from 'express';
import { createAdmin } from './admin.controller';

const router = express.Router();

router.post('/', createAdmin);

export const adminRouter = router;
