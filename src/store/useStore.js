import { create } from "zustand";

const useModelStore = create((set) => ({
  isLoading: false,
  setIsLoading: (state) => set({ isLoading: state }),
  content: null,
  setContent: (state) => set({ content: state }),
}));

export default useModelStore;
