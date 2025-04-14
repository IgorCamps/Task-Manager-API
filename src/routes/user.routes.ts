import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();

export function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  // Middleware logic
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

const controller = new UserController();

userRoutes.post('/', async (req, res) => {
  try {
    await controller.create(req, res);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

userRoutes.get('/me', ensureAuth, (req, res) => {
  console.log('Logado com sucesso!');
  res.json({ message: 'Acesso liberado para usuário autenticado!' });
});

export default userRoutes;


