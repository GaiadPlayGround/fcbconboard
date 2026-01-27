import { useState, useCallback } from 'react';
import { Chapter } from '@/types/onboarding';
import { initialChapters } from '@/data/onboardingData';
import { ChapterCard } from './ChapterCard';
import { BottomNav } from './BottomNav';
import { SnapshotsCustodySection, HowSnapshotsWork, SnapshotBlindBoxes } from './SnapshotSections';
import { EcosystemProductsSection } from './EcosystemProducts';
import { Flame } from 'lucide-react';

export function OnboardingAccordion() {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [fyreKeys, setFyreKeys] = useState(5);
  const [claimedChapters, setClaimedChapters] = useState<Set<number>>(new Set());
  const [animatingKeys, setAnimatingKeys] = useState(false);
  
  const handleToggle = useCallback((chapterId: number) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter?.isLocked) return;
    setExpandedChapter(prev => prev === chapterId ? null : chapterId);
  }, [chapters]);
  
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
    
    // Award Fyre Keys with animation
    setAnimatingKeys(true);
    setFyreKeys(prev => prev + 5);
    setTimeout(() => setAnimatingKeys(false), 500);
  }, []);
  
  const isChapterMainComplete = useCallback((chapter: Chapter) => {
    return chapter.tasks.length > 0 && chapter.tasks.every(t => t.status === 'done');
  }, []);
  
  const handleClaim = useCallback((chapterId: number) => {
    if (!claimedChapters.has(chapterId)) {
      setFyreKeys(prev => prev + 100);
      setClaimedChapters(prev => new Set([...prev, chapterId]));
      
      // Unlock next chapter
      setChapters(prev => prev.map((chapter) => {
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
  
  const handleNextUp = useCallback((chapterId: number) => {
    // Find the active task and scroll to it or highlight it
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter) {
      const activeTask = chapter.tasks.find(t => t.status === 'active');
      if (activeTask) {
        // Complete the active task
        handleCompleteTask(activeTask.id);
      }
    }
  }, [chapters, handleCompleteTask]);
  
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center">
        <h1 className="text-2xl font-title text-foreground">
          How to Participate
        </h1>
        
        {/* Fyre Keys Counter */}
        <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/30 transition-all duration-300 ${animatingKeys ? 'scale-110 ring-2 ring-primary' : ''}`}>
          <Flame className={`w-4 h-4 text-primary ${animatingKeys ? 'animate-pulse' : ''}`} />
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
            canClaim={isChapterMainComplete(chapter) && !claimedChapters.has(chapter.id)}
            onClaim={() => handleClaim(chapter.id)}
            isClaimed={claimedChapters.has(chapter.id)}
            onNextUp={() => handleNextUp(chapter.id)}
          />
        ))}
      </main>
      
      {/* Snapshots and Custody Section */}
      <SnapshotsCustodySection />
      
      {/* How Snapshots Work */}
      <HowSnapshotsWork />
      
      {/* Snapshot Hint BlindBoxes */}
      <SnapshotBlindBoxes />
      
      {/* Ecosystem Products */}
      <EcosystemProductsSection />
      
      {/* Bottom Nav */}
      <BottomNav fyreKeys={fyreKeys} />
    </div>
  );
}
