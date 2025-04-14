import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRoutes = Router();
const controller = new AuthController();

authRoutes.get('/login', async (req, res) => {
	try {
		await controller.login(req, res);
	} catch (error) {
		res.status(500).send({ error: 'Internal Server Error' });
	}
});

export default authRoutes;
