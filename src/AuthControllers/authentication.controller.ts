import jwt from 'jsonwebtoken';

import { asyncCatch } from '../Utils/asyncCatch';
import { getUserById } from '../Features/Users/user.repo';
import { ApiError } from '../Utils/ApiError';

export const authenticateUser = asyncCatch(async (req, res, next) => {
  if (req.headers.authorization) {
    const userToken = req.headers.authorization.substring('Bearer '.length);
    console.log(userToken);
    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(userToken, process.env.JWT_SECRET) as jwt.JwtPayload;
    } catch (error) {
      throw new ApiError(
        'invalid token, please login again to continue',
        401,
        'fail'
      );
    }

    const user = await getUserById(payload.id);
    if (user) {
      req.user = user;
    } else {
      throw new ApiError(
        "No User found with this id, may be it's deleted afterwards",
        400,
        'fail'
      );
    }

    return next();
  } else {
    throw new ApiError(
      'you are not logged in, please login to continue',
      401,
      'fail'
    );
  }
});
