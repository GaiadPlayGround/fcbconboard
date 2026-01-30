export type TaskStatus = 'done' | 'active' | 'pending' | 'locked';

export interface ActionButton {
  label: string;
  action: string;
}

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
  isOptional?: boolean;
  comingSoon?: boolean;
  actionButtons?: ActionButton[];
  warningLabel?: string;
  autoVerify?: boolean;
  socialVerify?: boolean;
  linkSubmit?: boolean;
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
