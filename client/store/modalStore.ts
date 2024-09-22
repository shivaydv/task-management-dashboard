import { create } from "zustand";

export type State = {
  isDeleteModalOpen: boolean;
  isAddModalOpen: boolean;
};

export type Actions = {
  setIsDeleteModalOpen: (value: boolean) => void;
  setIsAddModalOpen: (value: boolean) => void;
};
export const useModalStore = create<State & Actions>((set) => ({
  isDeleteModalOpen: false,
  isAddModalOpen: false,

  setIsDeleteModalOpen: (value: boolean) => set({ isDeleteModalOpen: value }),
  setIsAddModalOpen: (value: boolean) => set({ isAddModalOpen: value }),
}));
