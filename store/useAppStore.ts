import { create } from 'zustand';

type AppState = {
  activeProjectId: string | null;
  isLoading: boolean;
  setActiveProjectId: (id: string | null) => void;
  setLoading: (next: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeProjectId: null,
  isLoading: false,
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  setLoading: (next) => set({ isLoading: next })
}));
