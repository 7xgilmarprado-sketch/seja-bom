export interface User {
  id: string;
  name: string;
  avatar_url: string;
  streak: number;
  total_missions: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'kindness' | 'gratitude' | 'connection' | 'self-care';
  xp: number;
}

export interface FeedPost {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  mission_title: string;
  reflection?: string;
  timestamp: Date;
  reactions: number;
  is_reacted_by_me: boolean;
}

export enum AppScreen {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  FEED = 'FEED',
  PROFILE = 'PROFILE',
  COMPLETE_MISSION = 'COMPLETE_MISSION'
}