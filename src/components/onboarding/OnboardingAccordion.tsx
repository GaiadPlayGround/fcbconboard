import { useState, useCallback } from 'react';
import { Chapter } from '@/types/onboarding';
import { initialChapters } from '@/data/onboardingData';
import { ChapterCard } from './ChapterCard';
import { BottomNav } from './BottomNav';
import { Flame } from 'lucide-react';

export function OnboardingAccordion() {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [fyreKeys, setFyreKeys] = useState(5); // Starting with 5 from completed task
  const [claimedChapters, setClaimedChapters] = useState<Set<number>>(new Set());
  
  const handleToggle = useCallback((chapterId: number) => {
    setExpandedChapter(prev => prev === chapterId ? null : chapterId);
  }, []);
  
  const handleCompleteTask = useCallback((taskId: string) => {
    setChapters(prev => {
      const updated = prev.map(chapter => ({
        ...chapter,
        tasks: chapter.tasks.map(task => 
          task.id === taskId && task.status === 'active'
            ? { ...task, status: 'done' as const }
            : task
        ),
      }));
      
      // Update active status for next pending task
      return updated.map(chapter => {
        const hasDone = chapter.tasks.some(t => t.status === 'done');
        const firstPending = chapter.tasks.find(t => t.status === 'pending');
        
        if (firstPending && hasDone) {
          return {
            ...chapter,
            tasks: chapter.tasks.map(t => 
              t.id === firstPending.id 
                ? { ...t, status: 'active' as const }
                : t
            ),
          };
        }
        return chapter;
      });
    });
    
    // Award Fyre Keys
    setFyreKeys(prev => prev + 5);
  }, []);
  
  const isChapterComplete = useCallback((chapter: Chapter) => {
    const allTasks = [...chapter.tasks, ...(chapter.bonusTasks || [])];
    return allTasks.length > 0 && allTasks.every(t => t.status === 'done');
  }, []);
  
  const handleClaim = useCallback((chapterId: number) => {
    if (!claimedChapters.has(chapterId)) {
      setFyreKeys(prev => prev + 100);
      setClaimedChapters(prev => new Set([...prev, chapterId]));
      
      // Unlock next chapter
      setChapters(prev => prev.map((chapter, index) => {
        if (chapter.id === chapterId + 1 && chapter.isLocked) {
          return {
            ...chapter,
            isLocked: false,
            tasks: chapter.tasks.map((task, i) => ({
              ...task,
              status: i === 0 ? 'active' as const : 'pending' as const,
            })),
          };
        }
        return chapter;
      }));
    }
  }, [claimedChapters]);
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-2xl font-title text-foreground">
          How to Participate
        </h1>
        
        {/* Fyre Keys Counter */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/30">
          <Flame className="w-4 h-4 text-primary" />
          <span className="text-sm font-cta text-foreground">
            {fyreKeys} Fyre Keys
          </span>
        </div>
      </header>
      
      {/* Chapters */}
      <main className="container max-w-md mx-auto px-4 space-y-3">
        {chapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            isExpanded={expandedChapter === chapter.id}
            onToggle={() => handleToggle(chapter.id)}
            onCompleteTask={handleCompleteTask}
            canClaim={isChapterComplete(chapter) && !claimedChapters.has(chapter.id)}
            onClaim={() => handleClaim(chapter.id)}
          />
        ))}
      </main>
      
      {/* Bottom Nav */}
      <BottomNav fyreKeys={1} />
    </div>
  );
}
