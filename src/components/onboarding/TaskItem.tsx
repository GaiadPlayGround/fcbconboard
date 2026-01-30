import { ChevronRight, Info, Lock, Shield, ExternalLink, Edit2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '@/types/onboarding';
import { TaskIcon } from './TaskIcon';
import { TaskProgressBar } from './ProgressBar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface TaskItemProps {
  task: Task;
  onComplete?: (taskId: string) => void;
  canComplete?: boolean;
  onOpenAddressPopup?: () => void;
  walletAddress?: string;
  isChapterLocked?: boolean;
}

export function TaskItem({ 
  task, 
  onComplete, 
  canComplete = true, 
  onOpenAddressPopup,
  walletAddress,
  isChapterLocked = false
}: TaskItemProps) {
  const isDone = task.status === 'done';
  const isActive = task.status === 'active';
  const isLocked = task.status === 'locked' || isChapterLocked;
  const isPending = task.status === 'pending';
  
  const handleActionClick = (action: string) => {
    if (action === 'submit_address') {
      onOpenAddressPopup?.();
    } else if (action === 'security_tips') {
      toast({
        title: "Security Tips",
        description: "Never share your seed phrase. Use hardware wallets for large amounts.",
      });
    }
  };
  
  return (
    <div 
      className={cn(
        "flex flex-col gap-2 py-3 px-1 transition-all duration-200",
        isDone && "task-done",
        isActive && !isChapterLocked && "animate-fade-in"
      )}
    >
      <div className="flex items-center gap-3">
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
                "w-5 h-5 rounded border-2 transition-colors",
                isActive && canComplete 
                  ? "border-primary/60 hover:border-primary cursor-pointer" 
                  : isPending 
                    ? "border-muted-foreground/20" 
                    : "border-muted-foreground/30"
              )}
              onClick={() => isActive && canComplete && onComplete?.(task.id)}
            />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              "text-sm font-title",
              isDone ? "text-muted-foreground" : isLocked || isPending ? "text-muted-foreground/70" : "text-foreground"
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
            
            {/* Warning Label */}
            {task.warningLabel && (
              <span className="warning-label flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {task.warningLabel}
              </span>
            )}
            
            {/* Auto Verify Badge */}
            {task.autoVerify && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/10 text-success border border-success/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Auto-verify
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
          
          {/* Action Buttons */}
          {task.actionButtons && task.actionButtons.length > 0 && isActive && !isChapterLocked && (
            <div className="flex flex-wrap gap-2 mt-3">
              {task.actionButtons.map((btn) => (
                <Button
                  key={btn.action}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1.5 bg-muted/30 border-border/50 hover:bg-primary/10 hover:border-primary/30"
                  onClick={() => handleActionClick(btn.action)}
                >
                  {btn.action === 'submit_address' && <Edit2 className="w-3 h-3" />}
                  {btn.label}
                  {walletAddress && btn.action === 'submit_address' && (
                    <CheckCircle2 className="w-3 h-3 text-success ml-1" />
                  )}
                </Button>
              ))}
            </div>
          )}
          
          {isDone && <TaskProgressBar className="w-24 mt-1" />}
        </div>
        
        {/* Status */}
        <div className="flex-shrink-0 flex items-center gap-2">
          {isDone ? (
            <span className="text-xs text-primary font-cta">DONE</span>
          ) : isActive && canComplete && !isChapterLocked ? (
            <span className="text-xs text-primary/80 font-cta">Next</span>
          ) : isLocked ? (
            <Lock className="w-3.5 h-3.5 text-muted-foreground/40" />
          ) : null}
          <ChevronRight className={cn(
            "w-4 h-4",
            isLocked || isPending ? "text-muted-foreground/30" : "text-muted-foreground/60"
          )} />
        </div>
      </div>
    </div>
  );
}

interface BonusTaskItemProps {
  task: Task;
  onAction?: () => void;
}

export function BonusTaskItem({ task, onAction }: BonusTaskItemProps) {
  const handleClick = () => {
    if (task.link) {
      window.open(task.link, '_blank', 'noopener,noreferrer');
    }
    onAction?.();
  };
  
  return (
    <div className="flex items-center gap-3 py-2 px-1">
      <div className="w-5 h-5 flex items-center justify-center">
        <span className="text-primary text-sm">→</span>
      </div>
      <span className="text-sm text-foreground font-title flex-1">
        {task.title}
      </span>
      <Button
        variant="outline"
        size="sm"
        className="h-7 text-xs gap-1.5 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
        onClick={handleClick}
      >
        <ExternalLink className="w-3 h-3" />
        Open
      </Button>
    </div>
  );
}
