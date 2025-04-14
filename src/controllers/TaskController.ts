import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';

export class TaskController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    const taskRepo = AppDataSource.getRepository(Task);

    const task = taskRepo.create({
      title,
      description,
      user: { id: req.user.id },
    });

    await taskRepo.save(task);

    return res.status(201).json(task);
  }

  async list(req: Request, res: Response) {
    const taskRepo = AppDataSource.getRepository(Task);
    const tasks = await taskRepo.find({
      where: {
        user: { id: req.user.id }
      }
    });

    return res.json(tasks);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const taskRepo = AppDataSource.getRepository(Task);
    const task = await taskRepo.findOne({
      where: { id: Number(id), user: { id: req.user.id } }
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;

    await taskRepo.save(task);

    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOne({
      where: { id: Number(id), user: { id: req.user.id } }
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    await taskRepo.remove(task);

    return res.status(204).send();
  }
}
