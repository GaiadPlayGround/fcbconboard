import { ChevronRight, Info, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/types/onboarding';
import { TaskIcon } from './TaskIcon';
import { TaskProgressBar } from './ProgressBar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TaskItemProps {
  task: Task;
  onComplete?: (taskId: string) => void;
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  const isDone = task.status === 'done';
  const isActive = task.status === 'active';
  const isLocked = task.status === 'locked';
  
  return (
    <div 
      className={cn(
        "flex items-center gap-3 py-3 px-1 transition-all duration-200",
        isDone && "task-done",
        isActive && "animate-fade-in"
      )}
    >
      {/* Checkbox area */}
      <div className="flex-shrink-0">
        {isLocked ? (
          <div className="w-5 h-5 rounded border border-muted/50 flex items-center justify-center">
            <Lock className="w-3 h-3 text-muted-foreground/50" />
          </div>
        ) : isDone ? (
          <TaskIcon taskId={task.id} status={task.status} className="w-5 h-5" />
        ) : (
          <div 
            className={cn(
              "w-5 h-5 rounded border-2 cursor-pointer transition-colors",
              isActive ? "border-primary/60 hover:border-primary" : "border-muted-foreground/30"
            )}
            onClick={() => onComplete?.(task.id)}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-sm font-title",
            isDone ? "text-muted-foreground" : "text-foreground"
          )}>
            {task.title}
          </span>
          
          {task.hasInfo && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] bg-card border-border">
                <p className="text-xs">{task.infoText || 'More info coming soon'}</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {task.linkText && (
            <span className="text-xs text-primary font-cta">
              {task.linkText}
            </span>
          )}
          
          {task.comingSoon && (
            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
              coming soon
            </span>
          )}
        </div>
        
        {task.subtext && (
          <p className="text-xs text-muted-foreground mt-0.5">{task.subtext}</p>
        )}
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {task.tags.map((tag) => (
              <span 
                key={tag.label}
                className={cn(
                  "text-xs px-2 py-0.5 rounded-md font-cta",
                  tag.recommended 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted/50 text-muted-foreground"
                )}
              >
                {tag.label}
                {tag.recommended && <span className="ml-1 text-[10px] opacity-70">(recommended)</span>}
              </span>
            ))}
          </div>
        )}
        
        {isDone && <TaskProgressBar className="w-24 mt-1" />}
      </div>
      
      {/* Status */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {isDone ? (
          <span className="text-xs text-primary font-cta">DONE</span>
        ) : isActive ? (
          <span className="text-xs text-primary/80 font-cta">Next</span>
        ) : null}
        <ChevronRight className={cn(
          "w-4 h-4",
          isLocked ? "text-muted-foreground/30" : "text-muted-foreground/60"
        )} />
      </div>
    </div>
  );
}

interface BonusTaskItemProps {
  task: Task;
}

export function BonusTaskItem({ task }: BonusTaskItemProps) {
  return (
    <a 
      href={task.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 py-2 px-1 group transition-colors hover:bg-muted/20 rounded-md"
    >
      <div className="w-5 h-5 flex items-center justify-center">
        <span className="text-primary text-sm">→</span>
      </div>
      <span className="text-sm text-primary font-cta group-hover:underline flex-1">
        {task.title}
      </span>
      {task.link && (
        <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">
          {task.link.replace('https://', '')}
        </span>
      )}
      <ChevronRight className="w-4 h-4 text-muted-foreground/40" />
    </a>
  );
}
