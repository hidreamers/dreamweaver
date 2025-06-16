import { create } from 'zustand';

export interface RealityCheck {
  id: string;
  type: string;
  timestamp: string;
  completed: boolean;
}

interface RealityCheckStore {
  realityChecks: RealityCheck[];
  addRealityCheck: (check: RealityCheck) => void;
  completeRealityCheck: (id: string) => void;
  clearRealityChecks: () => void;
}

export const useRealityCheckStore = create<RealityCheckStore>((set) => ({
  realityChecks: [],
  addRealityCheck: (check) => 
    set((state) => ({ 
      realityChecks: [...state.realityChecks, check] 
    })),
  completeRealityCheck: (id) => 
    set((state) => ({
      realityChecks: state.realityChecks.map((check) => 
        check.id === id ? { ...check, completed: true } : check
      ),
    })),
  clearRealityChecks: () => set({ realityChecks: [] }),
}));

export async function scheduleRealityCheckNotifications(prompt: string, times: number) {
  const hours = 12; // e.g., notifications between 8am and 8pm
  const interval = Math.floor((hours * 60) / times); // minutes between reminders

  for (let i = 0; i < times; i++) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reality Check',
        body: prompt,
      },
      trigger: {
        seconds: (i + 1) * interval * 60, // schedule at intervals
      },
    });
  }
}
