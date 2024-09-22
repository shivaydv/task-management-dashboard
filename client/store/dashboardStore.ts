import { BoardView, User } from "@/types/types";
import { create } from "zustand";

export type State = {
  boardView: BoardView;
  user: User | null;
};

export type Actions = {
  setBoardView: (boardView: BoardView) => void;
  setUser: (user: User | null) => void;
};
export const useDashboardStore = create<State & Actions>((set) => ({
  boardView: "list",
  user: null,
  setUser: (user: User | null) => set({ user }),
  setBoardView: (boardView: BoardView) => set({ boardView }),
}));
