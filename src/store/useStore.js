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
    { name: "brain", color: "#FF5252", position: [0, 0, 0] },
    { name: "heart", color: "#D81B60", position: [0, 0, -20] },
    { name: "lungs", color: "#5C6BC0", position: [5, 0, -30] },
    { name: "liver", color: "#8D6E63", position: [10, 0, -40] },
    { name: "kidney", color: "#7B1FA2", position: [15, 0, -50] },
  ],
  currentModel: { name: "brain", color: "#FF6F61", bg: "#FFE0E0" },

  jumpToModel: (modelName) =>
    set((state) => {
      const model = state.models.find((m) => m.name === modelName);
      return {
        cameraPosition: {
          position: [
            model.position[0] + 3,
            model.position[1] + 1.5,
            model.position[2] + 4,
          ],
          target: model.position,
        },
        content: null,
        spread: 0,
      };
    }),
}));

export default useModelStore;
