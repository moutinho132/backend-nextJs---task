import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from './Task.model'; 
import { TaskDTO } from '../../interfaces/dtos/TaskDTO';  

class TaskRepository implements ITaskRepository {
  async saveTask(task: { title: string, description: string, isCompleted: boolean }): Promise<TaskDTO> {
    const newTask = new Task(task);
    await newTask.save();
    return new TaskDTO(newTask.id,newTask.title, newTask.description, newTask.isCompleted, newTask.createdAt);
  }

  async updateTask(id: string, updates: Partial<TaskDTO>): Promise<TaskDTO> {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedTask) {
      throw new Error('Task not found');
    }

    return new TaskDTO(updatedTask.id,updatedTask.title, updatedTask.description, updatedTask.isCompleted, updatedTask.createdAt);
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await Task.findByIdAndDelete(id);
    return result !== null;
  }

  async searchTask(criteria: { title?: string, isCompleted?: boolean }): Promise<TaskDTO[]> {
    const tasks = await Task.find(criteria);
    return tasks.map(task => new TaskDTO(task.id,task.title, task.description, task.isCompleted, task.createdAt));
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    const tasks = await Task.find();
    return tasks.map(task => new TaskDTO(task.id,task.title, task.description, task.isCompleted, task.createdAt));
  }
}

export { TaskRepository };
