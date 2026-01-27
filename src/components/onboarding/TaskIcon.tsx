import { 
  Wallet, 
  Send, 
  Link2, 
  Download, 
  Users, 
  Coins, 
  Sparkles, 
  MessageCircle,
  Zap,
  Camera,
  Share2,
  UserPlus,
  Rocket,
  ChartLine,
  Box,
  FlaskConical,
  Code,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TaskStatus } from '@/types/onboarding';

interface TaskIconProps {
  taskId: string;
  status: TaskStatus;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '1-1': Rocket,
  '1-2': Wallet,
  '1-3': Send,
  '1-4': Link2,
  '1-b1': Download,
  '1-b2': Users,
  '2-1': Coins,
  '2-2': Sparkles,
  '2-3': Sparkles,
  '2-4': Sparkles,
  '3-1': Users,
  '3-2': MessageCircle,
  '4-1': Zap,
  '4-2': Camera,
  '4-3': Zap,
  '4-4': Share2,
  '4-5': UserPlus,
};

export function TaskIcon({ taskId, status, className }: TaskIconProps) {
  const Icon = iconMap[taskId] || Sparkles;
  
  if (status === 'done') {
    return (
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center bg-primary/20",
        className
      )}>
        <CheckCircle2 className="w-5 h-5 text-primary" />
      </div>
    );
  }
  
  return (
    <div className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center",
      status === 'active' ? "bg-primary/10" : "bg-muted/50",
      status === 'locked' && "opacity-40",
      className
    )}>
      <Icon className={cn(
        "w-5 h-5",
        status === 'active' ? "text-primary" : "text-muted-foreground"
      )} />
    </div>
  );
}

export function RoadmapIcon({ index }: { index: number }) {
  const icons = [ChartLine, Box, FlaskConical, Code, Rocket];
  const Icon = icons[index % icons.length];
  
  return (
    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-muted/30">
      <Icon className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}
