import { create } from 'zustand';

export interface Dream {
  id: string;
  title: string;
  description: string;
  date: string;
  isLucid: boolean;
  dreamSigns: string[];
  clarity: number;
}

interface DreamStore {
  dreams: Dream[];
  addDream: (dream: Dream) => void;
  updateDream: (id: string, dream: Partial<Dream>) => void;
  deleteDream: (id: string) => void;
}

export const useDreamStore = create<DreamStore>((set) => ({
  dreams: [],
  addDream: (dream) => set((state) => ({ dreams: [...state.dreams, dream] })),
  updateDream: (id, updatedDream) => 
    set((state) => ({
      dreams: state.dreams.map((dream) => 
        dream.id === id ? { ...dream, ...updatedDream } : dream
      ),
    })),
  deleteDream: (id) => 
    set((state) => ({
      dreams: state.dreams.filter((dream) => dream.id !== id),
    })),
}));
