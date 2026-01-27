export type TaskStatus = 'done' | 'active' | 'pending' | 'locked';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  hasInfo?: boolean;
  infoText?: string;
  link?: string;
  linkText?: string;
  tags?: { label: string; recommended?: boolean }[];
  subtext?: string;
  isBonus?: boolean;
  comingSoon?: boolean;
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
