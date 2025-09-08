import { createClientService } from '../Features/Clients/client.service';
import { CreateClient } from '../Features/Clients/client.types';
import { asyncCatch } from '../Utils/asyncCatch';

export const signup = asyncCatch<{}, {}, CreateClient>(async (req, res) => {
  req.body.role = 'client';
  const client = await createClientService(req.body);
  res.status(201).json({
    status: 'Success',
    message: 'a new client has been created',
    data: client,
  });
});
