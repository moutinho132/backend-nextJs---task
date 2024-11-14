import express from 'express';
import { TasksController } from '../../interfaces/controllers/TasksController';

const router = express.Router();
const tasksController = new TasksController();

router.post('/', tasksController.createTask);
router.patch('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);
router.get('/', tasksController.searchTasks);
router.get('/all', tasksController.getAllTasks);

export { router };
