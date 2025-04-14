import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: object;
    }
  }
}
import jwt from 'jsonwebtoken';

export function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token not provided' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, 'secret_jwt_key');
    req.user = decoded as object; // você pode digitar isso melhor se quiser
    next(); // ✅ segue pro controller
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
}
