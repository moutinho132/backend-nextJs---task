import { Request, Response } from 'express';
import { TaskRepository } from '../../infrastructure/database/TaskRepository';
import { TaskService } from '../../application/service/TaskService';

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);

class TasksController {
  async createTask(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const task = await taskService.createTask(title, description);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof Error) {  
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred." });
      }
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const task = await taskService.updateTask(id, updates);
      res.json(task);
    } catch (error) {
      if (error instanceof Error) {  
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred." });
      }
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {  
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred." });
      }
    }
  }

  async searchTasks(req: Request, res: Response) {
    try {
      const criteria = req.query;
      const tasks = await taskService.searchTasks(criteria);
      res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {  
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred." });
      }
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      if (error instanceof Error) {  
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "Unknown error occurred." });
      }
    }
  }
}

export { TasksController };
