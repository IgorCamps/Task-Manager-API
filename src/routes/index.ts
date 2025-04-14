import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

routes.use('/users', userRoutes);
routes.use(authRoutes);

export default routes;
