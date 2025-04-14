import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user: { id: number };
    }
  }
}

export function ensureAuth(req: Request, res: Response, next: NextFunction): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, 'secret_jwt_key') as { id: number };
    req.user = { id: decoded.id }; // Adiciona o usuário decodificado à requisição
    next(); // Continua para o próximo middleware ou controller
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
