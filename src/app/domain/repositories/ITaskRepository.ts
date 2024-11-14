import { TaskDTO } from "@/app/interfaces/dtos/TaskDTO";

export interface ITaskRepository {
  saveTask(task: { title: string, description: string, isCompleted: boolean }): Promise<TaskDTO>;
  updateTask(id: string, updates: Partial<TaskDTO>): Promise<TaskDTO | null>;
  deleteTask(id: string): Promise<boolean>;
  searchTask(criteria: { title?: string, isCompleted?: boolean }): Promise<TaskDTO[]>;
  getAllTasks(): Promise<TaskDTO[]>;  
}
