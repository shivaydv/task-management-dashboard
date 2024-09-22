import { Task, TaskPriority } from "@/types/types";

export const EmptyTask: Task = {
    _id: "",
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    dueDate: undefined,
  };
  export const priorityColor = (priority: TaskPriority) => {
    if (priority === "Low") {
      return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-300 ";
    } else if (priority === "Medium") {
      return "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-300 ";
    } else if (priority === "High") {
      return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-300 ";
    }
  };