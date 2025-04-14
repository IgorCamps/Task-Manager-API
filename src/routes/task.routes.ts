import { Router, Request, Response, NextFunction } from 'express';
import { TaskController } from '../controllers/TaskController';

export function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  // Middleware logic
}

const taskRoutes = Router();
const controller = new TaskController();

taskRoutes.use(ensureAuth); // protege todas as rotas abaixo

taskRoutes.post('/', async (req, res, next) => {
  try {
    await controller.create(req, res);
  } catch (error) {
    next(error); // delega o erro para o middleware de tratamento de erros
  }
});

taskRoutes.get('/', async (req, res, next) => {
  try {
    await controller.list(req, res);
  } catch (error) {
    next(error);
  }
});

taskRoutes.put('/:id', async (req, res, next) => {
  try {
    await controller.update(req, res);
  } catch (error) {
    next(error);
  }
});

taskRoutes.delete('/:id', async (req, res, next) => {
  try {
    await controller.delete(req, res);
  } catch (error) {
    next(error);
  }
});

export default taskRoutes;
