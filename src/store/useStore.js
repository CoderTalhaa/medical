import { create } from "zustand";

const useModelStore = create((set) => ({
  isLoading: false,
  setIsLoading: (state) => set({ isLoading: state }),
  content: null,
  setContent: (state) => set({ content: state }),
  spread: 0,
  setSpread: (value) => set({ spread: value }),
  cameraPosition: null,
  setCameraPosition: (position, target) =>
    set({ cameraPosition: { position, target } }),
}));

export default useModelStore;
