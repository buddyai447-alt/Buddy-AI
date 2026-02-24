export enum AppView {
  LANDING = 'LANDING',
  BUDDY_HOME = 'BUDDY_HOME',
  BUDDY_CHAT = 'BUDDY_CHAT',
  HEALTH_LANDING = 'HEALTH_LANDING',
  HEALTH_PATIENT = 'HEALTH_PATIENT',
  HEALTH_CONSULTANT = 'HEALTH_CONSULTANT',
  HEALTH_PHARMACY = 'HEALTH_PHARMACY',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  type?: 'text' | 'audio'; // New field for voice notes
  text: string;           // Optional or transcript
  audioUrl?: string;      // Base64 or blob URL
  timestamp: number;
}

export type DiaryCategory = 'PERSONAL' | 'PREFERENCE' | 'EVENT' | 'WORK' | 'OTHER';
export type DiarySentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export interface DiaryEntry {
  id: string;
  content: string;
  category: DiaryCategory;
  sentiment: DiarySentiment;
  timestamp: number;
}

export interface Bot {
  id: string;
  name: string;
  gender: string;
  hobbies: string;
  personality: string; // New field
  avatar: string | null; // New field (Base64 or URL)
  theme?: {
    backgroundImage?: string;
    bubbleColor?: string;
  };
  messages: ChatMessage[];
  diaryEntries: DiaryEntry[];
  createdAt: number;
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  disease: string;
  phone: string;
}

export interface ConsultantProfile {
  firstName: string;
  secondName: string;
  surname?: string;
  name: string; // Combined name for display
  phone: string;
  id: string;
  age: number;
  gender: string;
  specialty: string;
  verified: boolean;
}

export interface PharmacyProfile {
  name: string;
  age: number;
  id: string;
  licenseVerified: boolean;
}

export interface Medicine {
  name: string;
  description: string;
  price: string;
  usage: string;
}