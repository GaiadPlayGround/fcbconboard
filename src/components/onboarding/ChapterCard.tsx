import { ChevronDown, Lock, Flame } from 'lucide-react';
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
}

export function ChapterCard({ 
  chapter, 
  isExpanded, 
  onToggle, 
  onCompleteTask,
  canClaim,
  onClaim 
}: ChapterCardProps) {
  const allTasks = [...chapter.tasks, ...(chapter.bonusTasks || [])];
  const completedCount = allTasks.filter(t => t.status === 'done').length;
  const totalCount = allTasks.length;
  const isComplete = completedCount === totalCount && totalCount > 0;
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300",
        chapter.isLocked ? "glass-card-locked" : "glass-card",
        isExpanded && "ring-1 ring-primary/20"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        disabled={chapter.isLocked}
        className={cn(
          "w-full p-4 flex flex-col gap-3 text-left transition-colors",
          !chapter.isLocked && "hover:bg-muted/10",
          chapter.isLocked && "cursor-not-allowed"
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
          </div>
          
          <div className="flex items-center gap-3">
            {!chapter.isLocked && totalCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {completedCount} / {totalCount} Tasks Done
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
        
        {!chapter.isLocked && totalCount > 0 && (
          <ProgressBar 
            completed={completedCount} 
            total={totalCount} 
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
                />
              ))}
            </div>
          )}
          
          {/* Bonus Tasks */}
          {chapter.bonusTasks && chapter.bonusTasks.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  Bonus
                </span>
                <span className="text-xs text-primary">→ Download & Setup Zora</span>
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
          {canClaim && (
            <button
              onClick={onClaim}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
            >
              <Flame className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-cta text-primary">
                Claim 100 Fyre Keys
              </span>
            </button>
          )}
          
          {/* Next Up CTA */}
          {!isComplete && chapter.tasks.some(t => t.status === 'active') && (
            <div className="mt-4 text-right">
              <span className="text-xs text-primary font-cta cursor-pointer hover:underline">
                Next up →
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
