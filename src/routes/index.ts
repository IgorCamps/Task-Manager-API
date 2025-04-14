import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import taskRoutes from './task.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

routes.use('/users', userRoutes);
routes.use(authRoutes);


routes.use('/tasks', taskRoutes);

export default routes;
