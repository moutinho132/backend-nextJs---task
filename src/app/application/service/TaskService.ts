import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskDTO } from '../../interfaces/dtos/TaskDTO';

class TaskService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async createTask(title: string, description: string): Promise<TaskDTO> {
    const newTask = await this.taskRepository.saveTask({ title, description, isCompleted: false });
    return new TaskDTO(newTask.id,newTask.title, newTask.description, newTask.isCompleted, newTask.createdAt);
  }

  async updateTask(id: string, updates: Partial<TaskDTO>): Promise<TaskDTO> {
    const updatedTask = await this.taskRepository.updateTask(id, updates);
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return new TaskDTO(updatedTask.id,updatedTask.title, updatedTask.description, updatedTask.isCompleted, updatedTask.createdAt);
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await this.taskRepository.deleteTask(id);
    return result != null; 
  }

  async searchTasks(criteria: { title?: string, isCompleted?: boolean }): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.searchTask(criteria);
    return tasks.map(task => new TaskDTO(task.id, task.title, task.description, task.isCompleted, task.createdAt));
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    const tasks = await this.taskRepository.getAllTasks();
    return tasks.map(task => new TaskDTO(task.id,task.title, task.description, task.isCompleted, task.createdAt));
  }
}

export { TaskService };
