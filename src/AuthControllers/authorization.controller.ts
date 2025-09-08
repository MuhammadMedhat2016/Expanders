import { CreateUser } from '../Features/Users/user.types';
import { ApiError } from '../Utils/ApiError';
import { asyncCatch } from '../Utils/asyncCatch';

export const protect = function (role: CreateUser['role']) {
  return asyncCatch((req, res, next) => {
    if (req.user?.role === role) return next();
    else {
      throw new ApiError(
        'You are not allowed to perform such action',
        401,
        'unauthorized'
      );
    }
  });
};
