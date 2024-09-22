import { EmptyTask } from "@/lib/constants";
import { Task } from "@/types/types";
import { create } from "zustand";


export type State = {
  tasks: Task[];
  newTask: Task;
  taskToDelete: string;
};

export type Actions = {
  setNewTask: (task: Task) => void;
  setTaskToDelete: (_id: string) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
};
export const useTaskStore = create<State & Actions>((set) => ({
  tasks: [],
  newTask: EmptyTask,
  taskToDelete: "",
  setTasks: (tasks: Task[]) => set({ tasks }),
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
