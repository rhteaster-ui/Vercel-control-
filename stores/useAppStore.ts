'use client';

import { create } from 'zustand';

type AppState = {
  isLoading: boolean;
  activeProjectId: string | null;
  setLoading: (value: boolean) => void;
  setActiveProjectId: (id: string | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  activeProjectId: null,
  setLoading: (value) => set({ isLoading: value }),
  setActiveProjectId: (id) => set({ activeProjectId: id })
}));
