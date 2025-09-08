import jwt from 'jsonwebtoken';
import { verifyUser } from '../Features/Users/user.service';
import { asyncCatch } from '../Utils/asyncCatch';
import { ApiError } from '../Utils/ApiError';

export const login = asyncCatch(async (req, res) => {
  const user = await verifyUser(req.body.userName, req.body.password);
  if (user) {
    const userJwt = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 1000,
    });
    res.cookie('jwt', userJwt, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({
      status: 'success',
      message: 'logged in',
      data: userJwt,
    });
  } else {
    throw new ApiError(
      'failed to login, please check you credentials or contact admins',
      401,
      'fail'
    );
  }
});
