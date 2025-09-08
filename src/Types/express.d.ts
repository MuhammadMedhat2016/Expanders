import 'express';
import { User } from '../Features/Users/user.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

import { IncomingHttpHeaders } from 'http';

declare module 'http' {
  interface IncomingHttpHeaders {
    jwt?: string;
  }
}
