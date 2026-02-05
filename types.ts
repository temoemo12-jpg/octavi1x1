
export enum MatchStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION'
}

export type VipTier = 'NONE' | 'STARTER' | 'PRO' | 'ELITE' | 'ULTIMATE';

export interface LinkedGame {
  game: string;
  playerName: string;
  playerId: string;
  status: 'verified' | 'rejected' | 'pending';
  verifiedAt: string;
  screenshotUrl?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  referralEarnings: number; // الأرباح المجمعة من دعوة الأصدقاء
  referredBy?: string;      // كود الشخص الذي دعا هذا المستخدم
  avatar: string;
  level: number;
  vipTier: VipTier;
  referralCode: string;
  referralCount: number;
  linkedGames: LinkedGame[];
  stats: {
    wins: number;
    matches: number;
    winRate: string;
  };
}

export interface Match {
  id: string;
  game: string;
  playerA: string;
  playerB?: string;
  entryFee: number;
  prizePool: number;
  status: MatchStatus;
  startTime: string;
}

export interface Tournament {
  id: string;
  title: string;
  game: string;
  prize: string;
  participants: number;
  maxParticipants: number;
  status: 'Upcoming' | 'Live' | 'Finished';
  image: string;
}
