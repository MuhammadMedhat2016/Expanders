import { asyncCatch } from '../../Utils/asyncCatch';
import { createAdminService } from './admin.service';
import { CreateAdmin } from './admin.types';

export const createAdmin = asyncCatch<{}, {}, CreateAdmin>(async (req, res) => {
  req.body.role = 'admin';
  const admin = await createAdminService(req.body);
  res.status(201).json({
    status: 'success',
    message: 'a new admin is created successfully',
    data: admin,
  });
});
