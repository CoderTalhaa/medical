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
  models: [
    { name: "brain", color: "#FF5252", bg: "#FFE0E0" }, // Bright Red & Light Pink
    { name: "heart", color: "#D81B60", bg: "#FCE4EC" }, // Magenta & Pale Pink
    { name: "lungs", color: "#5C6BC0", bg: "#E8EAF6" }, // Indigo & Light Lavender
    { name: "liver", color: "#8D6E63", bg: "#EFEBE9" }, // Brown & Cream
    { name: "kidney", color: "#7B1FA2", bg: "#F3E5F5" }, // Purple & Pale Lavender
  ],
  currentModel: { name: "brain", color: "#FF6F61", bg: "#FFE0E0" }, // Default Model

  setCurrentModel: (modelName) =>
    set((state) => ({
      currentModel: state.models.find((model) => model.name === modelName),
      content: null,
      spread: 0,
      cameraPosition: { position: [3, 1.5, 4], target: [0, 0.5, 0] },
    })),
}));

export default useModelStore;
