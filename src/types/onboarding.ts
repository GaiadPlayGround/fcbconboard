export type TaskStatus = 'done' | 'active' | 'pending' | 'locked';

export interface SubTask {
  id: string;
  title: string;
  link?: string;
  completed: boolean;
  optional?: boolean;
}

export interface ActionButton {
  label: string;
  action: string;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description?: string;
  hasInfo?: boolean;
  infoText?: string;
  link?: string;
  linkText?: string;
  tags?: { label: string; recommended?: boolean }[];
  subtext?: string;
  isBonus?: boolean;
  isOptional?: boolean;
  comingSoon?: boolean;
  actionButtons?: ActionButton[];
  warningLabel?: string;
  autoVerify?: boolean;
  socialVerify?: boolean;
  linkSubmit?: boolean;
  actionType?: 'connect_wallet' | 'submit_address' | 'scan_balance' | 'scan_warplette' | 'scan_nft' | 'scan_dna_balance' | 'submit_discord' | 'submit_link';
  scanAddress?: string;
  scanCollection?: string;
  subTasks?: SubTask[];
}

export interface Chapter {
  id: number;
  title: string;
  tasks: Task[];
  isLocked: boolean;
  lockMessage?: string;
  bonusTasks?: Task[];
  roadmapItems?: string[];
}

export interface OnboardingState {
  chapters: Chapter[];
  fyreKeys: number;
  expandedChapter: number | null;
}
