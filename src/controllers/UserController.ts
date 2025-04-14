import { Request, Response} from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';

export class UserController  {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required.'
            });
        };

        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOne({
            where: { email }
        });

        if(existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepository.save(user);

        return res.status(201).json({
            message: 'User created successfully.'
        });
    }
}