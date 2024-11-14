export class Task {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: string,
      title: string,
      description: string,
      isCompleted: boolean = false,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.isCompleted = isCompleted;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  
    markAsCompleted() {
      this.isCompleted = true;
      this.updatedAt = new Date();
    }
  
    updateDetails(title: string, description: string) {
      this.title = title;
      this.description = description;
      this.updatedAt = new Date();
    }
  }
  