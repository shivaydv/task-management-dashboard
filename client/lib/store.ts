import { create } from "zustand";

export type TaskStatus = "To Do" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";
export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
};

export type BoardView = "list" | "kanban";





export const EmptyTask: Task = {
  _id: "",
  title: "",
  description: "",
  status: "To Do",
  priority: "Medium",
  dueDate: undefined,
};
export const priorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case "Low":
      return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-300 ";
    case "Medium":
      return "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-300 ";
    case "High":
      return "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-300 hover:bg-red-300 ";
  }
};

export type User = {
  name: string;
  email: string;
  token: string;
};

export type State = {
  boardView: BoardView;
  tasks: Task[];
  newTask: Task;
  taskToDelete: string;
  isDeleteModalOpen: boolean;
  isAddModalOpen: boolean;
  user: User | null;
};

export type Actions = {
  setBoardView: (boardView: BoardView) => void;
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsAddModalOpen: (value: boolean) => void;
  setNewTask: (task: Task) => void;
  setTaskToDelete: (_id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
  setUser: (user: User  | null) => void;
  setTasks: (tasks: Task[]) => void;
};
export const useStore = create<State & Actions>((set) => ({
  boardView: "list",
  tasks: [],
  newTask: EmptyTask,
  taskToDelete: "",
  isDeleteModalOpen: false,
  isAddModalOpen: false,
  user: null,
  setTasks: (tasks: Task[]) => set({ tasks }),
  setUser: (user: User | null) => set({ user }),
  setBoardView: (boardView: BoardView) => set({ boardView }),
  setIsDeleteModalOpen: (value: boolean) => set({ isDeleteModalOpen: value }),
  setIsAddModalOpen: (value: boolean) => set({ isAddModalOpen: value }),
  setNewTask: (task: Task) => set({ newTask: task }),
  setTaskToDelete: (_id: string) => set({ taskToDelete: _id }),
  addTask: (task: Task) => {
    set((state) => ({ tasks: [...state.tasks, { ...task }] }));
  },
  deleteTask: (_id: string) =>
    set((state) => ({ tasks: state.tasks.filter((task) => task._id !== _id) })),
  updateTask: (task: Task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
    }));
  },
}));
