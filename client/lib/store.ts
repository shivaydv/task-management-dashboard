// import { BoardView, Task, TaskPriority, User } from "@/types/types";
// import { create } from "zustand";
// import { EmptyTask } from "./constants";




// export type State = {
//   boardView: BoardView;
//   tasks: Task[];
//   newTask: Task;
//   taskToDelete: string;
//   isDeleteModalOpen: boolean;
//   isAddModalOpen: boolean;
//   user: User | null;

// };

// export type Actions = {
//   setBoardView: (boardView: BoardView) => void;
//   setIsDeleteModalOpen: (value: boolean) => void;
//   setIsAddModalOpen: (value: boolean) => void;
//   setNewTask: (task: Task) => void;
//   setTaskToDelete: (_id: string) => void;
//   addTask: (task: Task) => void;
//   deleteTask: (id: string) => void;
//   updateTask: (task: Task) => void;
//   setUser: (user: User | null) => void;
//   setTasks: (tasks: Task[]) => void;

// };
// export const useStore = create<State & Actions>((set) => ({
//   boardView: "list",
//   tasks: [],
//   newTask: EmptyTask,
//   taskToDelete: "",
//   isDeleteModalOpen: false,
//   isAddModalOpen: false,
//   user: null,

//   setTasks: (tasks: Task[]) => set({ tasks }),
//   setUser: (user: User | null) => set({ user }),
//   setBoardView: (boardView: BoardView) => set({ boardView }),
//   setIsDeleteModalOpen: (value: boolean) => set({ isDeleteModalOpen: value }),
//   setIsAddModalOpen: (value: boolean) => set({ isAddModalOpen: value }),
//   setNewTask: (task: Task) => set({ newTask: task }),
//   setTaskToDelete: (_id: string) => set({ taskToDelete: _id }),
//   addTask: (task: Task) => {
//     set((state) => ({ tasks: [...state.tasks, { ...task }] }));
//   },
//   deleteTask: (_id: string) =>
//     set((state) => ({ tasks: state.tasks.filter((task) => task._id !== _id) })),
//   updateTask: (task: Task) => {
//     set((state) => ({
//       tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
//     }));
//   },
// }));
