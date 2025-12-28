
export enum GrowthStage {
  SEED = 'Ziarenko',
  SPROUT = 'Pęd',
  LEAVES = 'Liście',
  BUSH = 'Krzew',
  TREE = 'Drzewko',
  BLOOM = 'Kwitnienie',
  FRUIT = 'Owocowanie'
}

export interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  type: 'missions' | 'offline' | 'streak' | 'custom';
  status: 'draft' | 'pending' | 'active' | 'completed';
  reward: string;
}

export interface Mission {
  id: string;
  type: 'quiz' | 'logic' | 'language' | 'creative' | 'offline' | 'daily';
  title: string;
  description: string;
  questions?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  rewardMinutes: number;
}

export interface OfflineChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rewardText: string;
}

export interface UserStats {
  petName: string;
  xp: number;
  level: number;
  screenTimeMinutes: number;
  educationTimeMinutes: number;
  missionsCompleted: number;
  currentStage: GrowthStage;
  vitality: number;
  badges: string[];
  dewdrops: number;
  fertilizer: number;
  streak: number;
  activeGoals: WeeklyGoal[];
  pendingOfflineMission?: OfflineChallenge;
}

export interface CoachSignal {
  id: string;
  title: string;
  description: string;
  category: 'celebration' | 'suggestion' | 'insight';
}
