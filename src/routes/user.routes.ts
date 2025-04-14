import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { ensureAuth } from '../middlewares/ensureAuth';

const userRoutes = Router();

const controller = new UserController();
userRoutes.post('/', async (req, res) => {
	try {
		await controller.create(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
});

export default userRoutes;

 
userRoutes.get('/me', ensureAuth, (req, res) => {
  	console.log('Logado com sucesso!');
	res.json({ message: 'Acesso liberado para usuário autenticado!' });
});
