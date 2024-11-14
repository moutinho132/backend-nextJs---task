import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export type { ITask };
export { Task };
