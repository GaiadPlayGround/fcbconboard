import { useState, useCallback, useEffect } from 'react';
import { ChevronDown, Lock, Flame, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Chapter } from '@/types/onboarding';
import { ProgressBar } from './ProgressBar';
import { TaskItem, BonusTaskItem } from './TaskItem';
import { RoadmapIcon } from './TaskIcon';

interface ChapterCardProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onCompleteTask: (taskId: string) => void;
  canClaim: boolean;
  onClaim: () => void;
  isClaimed: boolean;
  onNextUp?: () => void;
}

export function ChapterCard({ 
  chapter, 
  isExpanded, 
  onToggle, 
  onCompleteTask,
  canClaim,
  onClaim,
  isClaimed,
  onNextUp
}: ChapterCardProps) {
  const [showClaimAnimation, setShowClaimAnimation] = useState(false);
  const [isClaimingKeys, setIsClaimingKeys] = useState(false);
  
  const mainTasks = chapter.tasks;
  const completedMain = mainTasks.filter(t => t.status === 'done').length;
  const totalMain = mainTasks.length;
  const allMainComplete = completedMain === totalMain && totalMain > 0;
  
  const handleClaim = () => {
    setIsClaimingKeys(true);
    setShowClaimAnimation(true);
    
    setTimeout(() => {
      onClaim();
      setIsClaimingKeys(false);
    }, 600);
    
    setTimeout(() => {
      setShowClaimAnimation(false);
    }, 1500);
  };
  
  const handleNextUp = () => {
    onNextUp?.();
  };
  
  // Find active task to determine if user can complete tasks
  const activeTask = mainTasks.find(t => t.status === 'active');
  const canCompleteNextTask = !!activeTask;
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 relative",
        chapter.isLocked ? "glass-card-locked" : "glass-card",
        isExpanded && "ring-1 ring-primary/20"
      )}
    >
      {/* Claim Animation Overlay */}
      {showClaimAnimation && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="flex items-center gap-2 text-primary animate-scale-in">
            <Flame className="w-8 h-8 animate-pulse" />
            <span className="text-2xl font-title">+100 Fyre Keys!</span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full p-4 flex flex-col gap-3 text-left transition-colors",
          !chapter.isLocked && "hover:bg-muted/10",
          chapter.isLocked && "cursor-not-allowed opacity-60"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className={cn(
              "text-base font-title",
              chapter.isLocked ? "text-muted-foreground/60" : "text-foreground"
            )}>
              Chapter {chapter.id} · {chapter.title}
            </h3>
            
            {chapter.isLocked && chapter.lockMessage && (
              <div className="flex items-center gap-1.5 mt-1">
                <Lock className="w-3 h-3 text-muted-foreground/50" />
                <span className="text-xs text-muted-foreground/50">
                  {chapter.lockMessage}
                </span>
              </div>
            )}
            
            {isClaimed && !chapter.isLocked && (
              <div className="flex items-center gap-1.5 mt-1">
                <Flame className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary">Chapter Complete!</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {!chapter.isLocked && totalMain > 0 && (
              <span className="text-xs text-muted-foreground">
                {completedMain} / {totalMain}
              </span>
            )}
            
            {chapter.isLocked ? (
              <Lock className="w-5 h-5 text-muted-foreground/40" />
            ) : (
              <ChevronDown className={cn(
                "w-5 h-5 text-muted-foreground transition-transform duration-200",
                isExpanded && "rotate-180"
              )} />
            )}
          </div>
        </div>
        
        {!chapter.isLocked && totalMain > 0 && (
          <ProgressBar 
            completed={completedMain} 
            total={totalMain} 
            showLabel={false}
          />
        )}
      </button>
      
      {/* Expanded Content */}
      {isExpanded && !chapter.isLocked && (
        <div className="px-4 pb-4 animate-fade-in">
          {/* Tasks */}
          {chapter.tasks.length > 0 && (
            <div className="space-y-1 border-t border-border/30 pt-3">
              {chapter.tasks.map((task) => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onComplete={onCompleteTask}
                  canComplete={task.status === 'active'}
                />
              ))}
            </div>
          )}
          
          {/* Bonus Tasks - Optional */}
          {chapter.bonusTasks && chapter.bonusTasks.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Bonus
                </span>
                <span className="text-[10px] text-muted-foreground/50 uppercase">
                  (Optional)
                </span>
              </div>
              {chapter.bonusTasks.map((task) => (
                <BonusTaskItem key={task.id} task={task} />
              ))}
            </div>
          )}
          
          {/* Roadmap Items (Chapter 5) */}
          {chapter.roadmapItems && chapter.roadmapItems.length > 0 && (
            <div className="space-y-3 border-t border-border/30 pt-3">
              {chapter.roadmapItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-1">
                  <RoadmapIcon index={index} />
                  <span className="text-sm text-muted-foreground">{item}</span>
                  <span className="text-[10px] text-muted-foreground/60 uppercase ml-auto">
                    demo
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {/* Claim Reward */}
          {canClaim && !isClaimed && (
            <button
              onClick={handleClaim}
              disabled={isClaimingKeys}
              className={cn(
                "mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all group",
                isClaimingKeys 
                  ? "bg-primary/30 cursor-wait" 
                  : "bg-primary/10 hover:bg-primary/20"
              )}
            >
              <Flame className={cn(
                "w-4 h-4 text-primary transition-transform",
                isClaimingKeys ? "animate-pulse" : "group-hover:scale-110"
              )} />
              <span className="text-sm font-cta text-primary">
                Claim 100 Fyre Keys
              </span>
            </button>
          )}
          
          {/* Next Up CTA */}
          {!allMainComplete && activeTask && (
            <button
              onClick={handleNextUp}
              className="mt-4 w-full flex items-center justify-end gap-1.5 py-2 group"
            >
              <span className="text-xs text-primary font-cta group-hover:underline transition-all">
                Next up
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
