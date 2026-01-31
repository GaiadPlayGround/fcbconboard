import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Chapter } from '@/types/onboarding';
import { initialChapters } from '@/data/onboardingData';
import { ChapterCard } from './ChapterCard';
import { FyreKeyBalance } from './FyreKeyBalance';
import { TaskCompletionPopup } from './TaskCompletionPopup';
import { WalletAddressPopup } from './WalletAddressPopup';
import { SnapshotsCustodySection, HowSnapshotsWork, FyreBlindBoxes } from './SnapshotSections';
import { EcosystemProductsSection } from './EcosystemProducts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft, Flame } from 'lucide-react';

export function OnboardingAccordion() {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [fyreKeys, setFyreKeys] = useState(5);
  const [claimedChapters, setClaimedChapters] = useState<Set<number>>(new Set());
  const [animatingKeys, setAnimatingKeys] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  
  // Popup state
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [completedTaskInfo, setCompletedTaskInfo] = useState({ title: '', keys: 0 });
  
  const handleToggle = useCallback((chapterId: number) => {
    setExpandedChapter(prev => prev === chapterId ? null : chapterId);
  }, []);
  
  const handleCompleteTask = useCallback((taskId: string) => {
    const taskChapter = chapters.find(c => c.tasks.some(t => t.id === taskId));
    const task = taskChapter?.tasks.find(t => t.id === taskId);
    
    if (!task || task.status !== 'active') return;
    
    // Show completion popup
    setCompletedTaskInfo({ title: task.title, keys: 10 });
    setShowCompletionPopup(true);
    
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
    
    // Award 10 Fyre Keys per task with animation
    setAnimatingKeys(true);
    setFyreKeys(prev => prev + 10);
    setTimeout(() => setAnimatingKeys(false), 500);
  }, [chapters]);
  
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
    const chapter = chapters.find(c => c.id === chapterId);
    if (chapter) {
      const activeTask = chapter.tasks.find(t => t.status === 'active');
      if (activeTask) {
        handleCompleteTask(activeTask.id);
      }
    }
  }, [chapters, handleCompleteTask]);
  
  const handleOpenAddressPopup = useCallback(() => {
    setShowAddressPopup(true);
  }, []);
  
  const handleSubmitAddress = useCallback((address: string) => {
    setWalletAddress(address);
    setShowAddressPopup(false);
  }, []);
  
  const scrollToEarnMore = () => {
    document.querySelector('#chapters')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const totalProgress = chapters.reduce((acc, ch) => acc + ch.tasks.filter(t => t.status === 'done').length, 0);
  const totalTasks = chapters.reduce((acc, ch) => acc + ch.tasks.length, 0);
  
  return (
    <div className="min-h-screen pb-20">
      <Header fyreKeys={fyreKeys} />
      
      {/* Header */}
      <header className="pt-20 pb-4 px-4">
        <div className="container max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Title Section */}
            <div className="lg:col-span-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-title text-foreground mb-2">
                How to Participate
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Complete chapters to earn Fyre Keys and unlock access to the FCBC ecosystem. 
                Progress through tasks sequentially to maximize your rewards.
              </p>
              
              {/* Overall Progress - Desktop */}
              <div className="hidden lg:block mt-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-muted-foreground">Overall Progress</span>
                  <span className="text-sm font-title text-foreground">{totalProgress} / {totalTasks} tasks</span>
                </div>
                <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(totalProgress / totalTasks) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Fyre Keys Balance - Sticky on Desktop */}
            <div className="lg:sticky lg:top-20">
              <FyreKeyBalance 
                balance={fyreKeys} 
                isAnimating={animatingKeys}
                onEarnMore={scrollToEarnMore}
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content Grid */}
      <main className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters - Left Column */}
          <div id="chapters" className="lg:col-span-2 space-y-3 pt-4">
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
                onOpenAddressPopup={handleOpenAddressPopup}
                walletAddress={walletAddress}
              />
            ))}
          </div>
          
          {/* Sidebar - Right Column (Desktop Only) */}
          <aside className="hidden lg:block space-y-6 pt-4">
            {/* Quick Stats Card */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-title text-foreground uppercase tracking-wider mb-4">
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Chapters Completed</span>
                  <span className="text-sm font-title text-foreground">{claimedChapters.size} / 5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tasks Done</span>
                  <span className="text-sm font-title text-foreground">{totalProgress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Keys Earned</span>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-primary" />
                    <span className="text-sm font-title text-primary">{fyreKeys}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tips Card */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-title text-foreground uppercase tracking-wider mb-4">
                Pro Tips
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Complete tasks in order to unlock the next chapter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Claim chapter rewards to lock in your progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use Fyre Keys to access exclusive ecosystem features</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        
        {/* Full-width sections */}
        <div className="mt-8">
          {/* Snapshots and Custody Section */}
          <SnapshotsCustodySection />
          
          {/* How Snapshots Work */}
          <HowSnapshotsWork />
          
          {/* Fyre BlindBoxes */}
          <FyreBlindBoxes />
          
          {/* Ecosystem Products */}
          <EcosystemProductsSection />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Task Completion Popup */}
      <TaskCompletionPopup
        isVisible={showCompletionPopup}
        taskTitle={completedTaskInfo.title}
        keysEarned={completedTaskInfo.keys}
        onClose={() => setShowCompletionPopup(false)}
      />
      
      {/* Wallet Address Popup */}
      <WalletAddressPopup
        isOpen={showAddressPopup}
        onClose={() => setShowAddressPopup(false)}
        onSubmit={handleSubmitAddress}
        currentAddress={walletAddress}
      />
    </div>
  );
}
