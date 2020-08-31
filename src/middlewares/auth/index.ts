import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../config/auth';

interface TokenPayoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('JWT token is missinng');
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, auth.secret);

    const { sub } = decoded as TokenPayoad;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('invalid JWT token ');
  }
}
