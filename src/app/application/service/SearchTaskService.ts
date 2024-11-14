import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class SearchTaskService {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async search(criteria: { title?: string; isCompleted?: boolean }) {
    return await this.taskRepository.searchTask(criteria);
  }
}
