export type TaskStatus = "To Do" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";
export type BoardView = "list" | "kanban";

export type User = {
  name: string;
  email: string;
  token: string;
};

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
};

