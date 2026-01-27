import { cn } from '@/lib/utils';

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ completed, total, className, showLabel = true }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <div className={cn("w-full", className)}>
      <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
        <div 
          className="h-full progress-bar rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-end mt-1.5">
          <span className="text-xs text-muted-foreground font-body">
            {completed} / {total} completed
          </span>
        </div>
      )}
    </div>
  );
}

export function TaskProgressBar({ className }: { className?: string }) {
  return (
    <div className={cn("h-0.5 bg-primary/30 rounded-full mt-1", className)}>
      <div className="h-full w-full bg-primary rounded-full" />
    </div>
  );
}
