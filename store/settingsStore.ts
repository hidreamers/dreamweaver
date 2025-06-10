import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings } from '../types';
import { useEffect } from 'react';

interface SettingsState {
  settings: UserSettings;
  isLoading: boolean;
  error: string | null;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  loadSettings: () => Promise<void>;
}

const SETTINGS_KEY = 'user_settings';

const defaultSettings: UserSettings = {
  notificationsEnabled: true,
  realityCheckCount: 10,
  darkMode: 'system',
  reminderStartTime: '08:00',
  reminderEndTime: '22:00',
  meditationReminders: true,
  journalReminders: true,
  autoRealityCheck: false, // add this if needed
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: defaultSettings,
  isLoading: false,
  error: null,

  updateSettings: async (newSettings) => {
    try {
      set({ isLoading: true, error: null });
      const updatedSettings = { ...get().settings, ...newSettings };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updatedSettings));
      set({ settings: updatedSettings, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  loadSettings: async () => {
    try {
      set({ isLoading: true, error: null });
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        set({ settings: JSON.parse(stored), isLoading: false });
      } else {
        set({ settings: defaultSettings, isLoading: false });
      }
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
}));

// Custom hook to load settings on component mount
export function useSettings() {
  const { settings, loadSettings, updateSettings, isLoading, error } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return { settings, updateSettings, isLoading, error };
}
