export interface Dream {
  id: string;
  title: string;
  description: string;
  date: string;
  isLucid: boolean;
  clarity: number; // 1-5
  emotions: string[];
  tags: string[];
  dreamSigns: string[];
}

export interface RealityCheck {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  timestamp?: string;
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  steps: string[];
  image: any;
}

export interface MeditationTrack {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  audioFile: string;
  image: any;
}

export interface UserSettings {
  notificationsEnabled: boolean;
  realityCheckCount: number;
  darkMode: 'system' | 'light' | 'dark';
  reminderStartTime: string; // HH:MM format
  reminderEndTime: string; // HH:MM format
  meditationReminders: boolean;
  journalReminders: boolean;
}

export interface DreamSign {
  id: string;
  name: string;
  description: string;
  frequency: number; // 1-5
}
