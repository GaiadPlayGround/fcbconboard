import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Chapter, Task, SubTask } from '@/types/onboarding';
import { initialChapters } from '@/data/onboardingData';
import { FyreKeyBalance } from './FyreKeyBalance';
import { TaskCompletionPopup } from './TaskCompletionPopup';
import { WalletAddressPopup } from './WalletAddressPopup';
import { SnapshotsCustodySection, HowSnapshotsWork, FyreBlindBoxes } from './SnapshotSections';
import { EcosystemProductsSection } from './EcosystemProducts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CosmicBackground from '@/components/backgrounds/CosmicBackground';
import { ArrowLeft, Flame, ChevronDown, Lock, ArrowRight, Info, CheckCircle2, ExternalLink, Wallet, Search, AlertTriangle, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Local storage keys
const STORAGE_KEYS = {
  fyreKeys: 'fcbc_fyre_keys',
  claimedChapters: 'fcbc_claimed_chapters',
  completedBonusTasks: 'fcbc_completed_bonus',
  subTasksCompleted: 'fcbc_subtasks',
  walletAddress: 'fcbc_wallet_address',
  walletConnected: 'fcbc_wallet_connected',
  discordId: 'fcbc_discord_id',
  chapters: 'fcbc_chapters',
};

// Load state from localStorage
function loadPersistedState<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn(`Failed to load ${key} from localStorage`);
  }
  return defaultValue;
}

// Save state to localStorage
function persistState(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save ${key} to localStorage`);
  }
}

export function OnboardingAccordion() {
  const location = useLocation();
  
  // Initialize with persisted state
  const [chapters, setChapters] = useState<Chapter[]>(() => 
    loadPersistedState(STORAGE_KEYS.chapters, initialChapters)
  );
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);
  const [fyreKeys, setFyreKeys] = useState(() => 
    loadPersistedState(STORAGE_KEYS.fyreKeys, 0)
  );
  const [claimedChapters, setClaimedChapters] = useState<Set<number>>(() => 
    new Set(loadPersistedState(STORAGE_KEYS.claimedChapters, []))
  );
  const [animatingKeys, setAnimatingKeys] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>(() => 
    loadPersistedState(STORAGE_KEYS.walletAddress, '')
  );
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [walletConnected, setWalletConnected] = useState(() => 
    loadPersistedState(STORAGE_KEYS.walletConnected, false)
  );
  const [walletBalance, setWalletBalance] = useState<{ usdc: number; eth: number } | null>(null);
  const [completedBonusTasks, setCompletedBonusTasks] = useState<Set<string>>(() => 
    new Set(loadPersistedState(STORAGE_KEYS.completedBonusTasks, []))
  );
  const [subTasksCompleted, setSubTasksCompleted] = useState<Set<string>>(() => 
    new Set(loadPersistedState(STORAGE_KEYS.subTasksCompleted, []))
  );
  const [discordId, setDiscordId] = useState(() => 
    loadPersistedState(STORAGE_KEYS.discordId, '')
  );
  
  // Popup state
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [completedTaskInfo, setCompletedTaskInfo] = useState({ title: '', keys: 0, showSafetyTip: false });
  
  // Persist state changes
  useEffect(() => {
    persistState(STORAGE_KEYS.fyreKeys, fyreKeys);
  }, [fyreKeys]);
  
  useEffect(() => {
    persistState(STORAGE_KEYS.claimedChapters, Array.from(claimedChapters));
  }, [claimedChapters]);
  
  useEffect(() => {
    persistState(STORAGE_KEYS.completedBonusTasks, Array.from(completedBonusTasks));
  }, [completedBonusTasks]);
  
  useEffect(() => {
    persistState(STORAGE_KEYS.subTasksCompleted, Array.from(subTasksCompleted));
  }, [subTasksCompleted]);
  
  useEffect(() => {
    persistState(STORAGE_KEYS.walletAddress, walletAddress);
  }, [walletAddress]);
  
  useEffect(() => {
    persistState(STORAGE_KEYS.walletConnected, walletConnected);
  }, [walletConnected]);
  
  useEffect(() => {
    persistState(STORAGE_KEYS.discordId, discordId);
  }, [discordId]);
  
  useEffect(() => {
    persistState(STORAGE_KEYS.chapters, chapters);
  }, [chapters]);
  
  // Scroll to custody-hunting section if hash is present
  useEffect(() => {
    if (location.hash === '#custody-hunting') {
      setTimeout(() => {
        document.getElementById('custody-hunting')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [location.hash]);
  
  const handleToggle = useCallback((chapterId: number) => {
    const chapter = chapters.find(c => c.id === chapterId);
    // Allow viewing all chapters except locked ones beyond the next chapter
    if (chapter && !chapter.isLocked) {
      setExpandedChapter(prev => prev === chapterId ? null : chapterId);
    } else if (chapter && chapter.isLocked) {
      // Allow viewing locked chapter content (but not completing tasks)
      setExpandedChapter(prev => prev === chapterId ? null : chapterId);
    }
  }, [chapters]);
  
  const showRewardAnimation = useCallback((title: string, keys: number, showSafetyTip = false) => {
    setCompletedTaskInfo({ title, keys, showSafetyTip });
    setShowCompletionPopup(true);
    setAnimatingKeys(true);
    setFyreKeys(prev => prev + keys);
    setTimeout(() => setAnimatingKeys(false), 500);
  }, []);
  
  const handleCompleteTask = useCallback((taskId: string) => {
    const taskChapter = chapters.find(c => c.tasks.some(t => t.id === taskId));
    const task = taskChapter?.tasks.find(t => t.id === taskId);
    
    if (!task || task.status !== 'active') return;
    
    setChapters(prev => {
      const updated = prev.map(chapter => ({
        ...chapter,
        tasks: chapter.tasks.map(t => 
          t.id === taskId && t.status === 'active'
            ? { ...t, status: 'done' as const }
            : t
        ),
      }));
      
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
    
    // Show reward based on task
    const showSafetyTip = task.actionType === 'submit_address';
    showRewardAnimation(task.title, 10, showSafetyTip);
  }, [chapters, showRewardAnimation]);
  
  const handleConnectWallet = useCallback(() => {
    // Simulate wallet connection
    setWalletConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected!",
    });
    handleCompleteTask('1-1');
  }, [handleCompleteTask]);
  
  const handleScanBalance = useCallback(() => {
    // Simulate balance scan
    const mockBalance = { usdc: 150.50, eth: 0.05 };
    setWalletBalance(mockBalance);
    
    if (mockBalance.usdc > 0 || mockBalance.eth > 0) {
      toast({
        title: "Balance Found!",
        description: `USDC: $${mockBalance.usdc.toFixed(2)} | ETH: ${mockBalance.eth.toFixed(4)}`,
      });
      handleCompleteTask('1-3');
    } else {
      toast({
        title: "No Balance Detected",
        description: "Please fund your wallet with USDC or ETH on Base.",
        variant: "destructive",
      });
    }
  }, [handleCompleteTask]);
  
  const handleSubmitAddress = useCallback((address: string) => {
    setWalletAddress(address);
    setShowAddressPopup(false);
    handleCompleteTask('1-2');
  }, [handleCompleteTask]);
  
  const handleBonusTaskComplete = useCallback((taskId: string) => {
    setCompletedBonusTasks(prev => new Set([...prev, taskId]));
    showRewardAnimation('Bonus Task', 10);
  }, [showRewardAnimation]);
  
  const handleSubTaskToggle = useCallback((subTaskId: string, taskId: string) => {
    setSubTasksCompleted(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subTaskId)) {
        newSet.delete(subTaskId);
      } else {
        newSet.add(subTaskId);
      }
      return newSet;
    });
  }, []);
  
  const handleSubmitDiscord = useCallback((id: string) => {
    setDiscordId(id);
    handleCompleteTask('3-2');
  }, [handleCompleteTask]);
  
  const isChapterMainComplete = useCallback((chapter: Chapter) => {
    return chapter.tasks.length > 0 && chapter.tasks.every(t => t.status === 'done');
  }, []);
  
  const isChapterBonusComplete = useCallback((chapter: Chapter) => {
    if (!chapter.bonusTasks || chapter.bonusTasks.length === 0) return true;
    return chapter.bonusTasks.every(t => completedBonusTasks.has(t.id));
  }, [completedBonusTasks]);
  
  const handleClaim = useCallback((chapterId: number) => {
    if (!claimedChapters.has(chapterId)) {
      showRewardAnimation(`Chapter ${chapterId} Complete!`, 100);
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
  }, [claimedChapters, showRewardAnimation]);
  
  const scrollToEarnMore = () => {
    document.querySelector('#chapters')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const totalProgress = chapters.reduce((acc, ch) => acc + ch.tasks.filter(t => t.status === 'done').length, 0);
  const totalTasks = chapters.reduce((acc, ch) => acc + ch.tasks.length, 0);
  
  return (
    <div className="min-h-screen pb-20 relative">
      <CosmicBackground starCount={60} />
      <Header fyreKeys={fyreKeys} walletConnected={walletConnected} />
      
      {/* Header */}
      <header className="pt-20 pb-4 px-4 relative z-10">
        <div className="container max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-title text-foreground mb-2">
                How to Participate
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Complete chapters to earn Fyre Keys and unlock access to the FCBC ecosystem.
              </p>
              
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
      
      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div id="chapters" className="lg:col-span-2 space-y-3 pt-4">
            {chapters.map((chapter) => (
              <div key={chapter.id}>
                {/* Phase 2 Indicator before Chapter 5 */}
                {chapter.id === 5 && (
                  <div className="flex items-center gap-3 py-4 mb-3">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <span className="text-xs font-title text-primary uppercase tracking-wider px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
                      Phase 2
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  </div>
                )}
                <ChapterCardNew
                  chapter={chapter}
                  isExpanded={expandedChapter === chapter.id}
                  onToggle={() => handleToggle(chapter.id)}
                  onCompleteTask={handleCompleteTask}
                  canClaim={isChapterMainComplete(chapter) && isChapterBonusComplete(chapter) && !claimedChapters.has(chapter.id)}
                  canClaimWithoutBonus={isChapterMainComplete(chapter) && !isChapterBonusComplete(chapter) && !claimedChapters.has(chapter.id) && chapter.id === 1}
                  onClaim={() => handleClaim(chapter.id)}
                  isClaimed={claimedChapters.has(chapter.id)}
                  walletConnected={walletConnected}
                  walletBalance={walletBalance}
                  onConnectWallet={handleConnectWallet}
                  onScanBalance={handleScanBalance}
                  onOpenAddressPopup={() => setShowAddressPopup(true)}
                  walletAddress={walletAddress}
                  completedBonusTasks={completedBonusTasks}
                  onBonusComplete={handleBonusTaskComplete}
                  subTasksCompleted={subTasksCompleted}
                  onSubTaskToggle={handleSubTaskToggle}
                  discordId={discordId}
                  onSubmitDiscord={handleSubmitDiscord}
                  fyreKeys={fyreKeys}
                />
              </div>
            ))}
          </div>
          
          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6 pt-4">
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
                  <span>Complete bonus tasks to claim chapter rewards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use Fyre Keys to access exclusive ecosystem features</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
        
        {/* Additional Sections */}
        <div className="mt-12 space-y-6">
          
          {/* Snapshots and Custody */}
          <SnapshotsCustodySection />
          
          {/* How Snapshots Work */}
          <HowSnapshotsWork />
          
          {/* Fyre Blindboxes */}
          <FyreBlindBoxes />
          
          {/* Ecosystem Products */}
          <EcosystemProductsSection />
        </div>
      </main>
      
      <Footer />
      
      <TaskCompletionPopup
        isVisible={showCompletionPopup}
        taskTitle={completedTaskInfo.title}
        keysEarned={completedTaskInfo.keys}
        onClose={() => setShowCompletionPopup(false)}
        showSafetyTip={completedTaskInfo.showSafetyTip}
      />
      
      <WalletAddressPopup
        isOpen={showAddressPopup}
        onClose={() => setShowAddressPopup(false)}
        onSubmit={handleSubmitAddress}
        currentAddress={walletAddress}
      />
    </div>
  );
}

interface ChapterCardNewProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onCompleteTask: (taskId: string) => void;
  canClaim: boolean;
  canClaimWithoutBonus: boolean;
  onClaim: () => void;
  isClaimed: boolean;
  walletConnected: boolean;
  walletBalance: { usdc: number; eth: number } | null;
  onConnectWallet: () => void;
  onScanBalance: () => void;
  onOpenAddressPopup: () => void;
  walletAddress: string;
  completedBonusTasks: Set<string>;
  onBonusComplete: (taskId: string) => void;
  subTasksCompleted: Set<string>;
  onSubTaskToggle: (subTaskId: string, taskId: string) => void;
  discordId: string;
  onSubmitDiscord: (id: string) => void;
  fyreKeys: number;
}

function ChapterCardNew({
  chapter,
  isExpanded,
  onToggle,
  onCompleteTask,
  canClaim,
  canClaimWithoutBonus,
  onClaim,
  isClaimed,
  walletConnected,
  walletBalance,
  onConnectWallet,
  onScanBalance,
  onOpenAddressPopup,
  walletAddress,
  completedBonusTasks,
  onBonusComplete,
  subTasksCompleted,
  onSubTaskToggle,
  discordId,
  onSubmitDiscord,
  fyreKeys,
}: ChapterCardNewProps) {
  const [showClaimAnimation, setShowClaimAnimation] = useState(false);
  const [discordInput, setDiscordInput] = useState('');
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  
  const mainTasks = chapter.tasks;
  const completedMain = mainTasks.filter(t => t.status === 'done').length;
  const totalMain = mainTasks.length;
  const allMainComplete = completedMain === totalMain && totalMain > 0;
  const activeTask = mainTasks.find(t => t.status === 'active');
  
  const handleClaim = () => {
    setShowClaimAnimation(true);
    setTimeout(() => {
      onClaim();
      setShowClaimAnimation(false);
    }, 600);
  };
  
  const getTaskActionButton = (task: Task) => {
    if (task.status !== 'active' || chapter.isLocked) return null;
    
    switch (task.actionType) {
      case 'connect_wallet':
        return (
          <Button 
            onClick={onConnectWallet}
            className="w-full animate-rainbow-glow bg-primary hover:bg-primary/90"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        );
      case 'submit_address':
        return (
          <Button 
            onClick={onOpenAddressPopup}
            variant="outline"
            className={cn(
              "w-full",
              walletAddress ? "border-success text-success" : "animate-rainbow-glow"
            )}
          >
            {walletAddress ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Address Submitted
              </>
            ) : (
              'Submit USDC Address'
            )}
          </Button>
        );
      case 'scan_balance':
        return (
          <Button 
            onClick={onScanBalance}
            className="w-full animate-rainbow-glow bg-primary hover:bg-primary/90"
          >
            <Search className="w-4 h-4 mr-2" />
            Scan Balance
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300 relative",
        chapter.isLocked ? "glass-card-locked opacity-70" : "glass-card",
        isExpanded && !chapter.isLocked && "ring-1 ring-primary/20"
      )}
    >
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
        className="w-full p-4 flex flex-col gap-3 text-left hover:bg-muted/10 transition-colors"
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
                <span className="text-xs text-muted-foreground/50">{chapter.lockMessage}</span>
              </div>
            )}
            
            {isClaimed && (
              <div className="flex items-center gap-1.5 mt-1">
                <Flame className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary">Chapter Complete!</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {totalMain > 0 && (
              <span className="text-xs text-muted-foreground">{completedMain} / {totalMain}</span>
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
        
        {totalMain > 0 && (
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(completedMain / totalMain) * 100}%` }}
            />
          </div>
        )}
      </button>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 animate-fade-in">
          {/* Tasks */}
          {chapter.tasks.length > 0 && (
            <div className="space-y-2 border-t border-border/30 pt-3">
              {chapter.tasks.map((task) => (
                <TaskItemNew
                  key={task.id}
                  task={task}
                  isChapterLocked={chapter.isLocked}
                  isExpanded={expandedTask === task.id}
                  onToggleExpand={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                  actionButton={getTaskActionButton(task)}
                  subTasksCompleted={subTasksCompleted}
                  onSubTaskToggle={(subTaskId) => onSubTaskToggle(subTaskId, task.id)}
                  discordInput={discordInput}
                  setDiscordInput={setDiscordInput}
                  onSubmitDiscord={() => {
                    if (discordInput.trim()) {
                      onSubmitDiscord(discordInput);
                    }
                  }}
                  walletBalance={walletBalance}
                />
              ))}
            </div>
          )}
          
          {/* Bonus Tasks - Collapsed by default for Chapter 1 */}
          {chapter.bonusTasks && chapter.bonusTasks.length > 0 && !chapter.isLocked && (
            <BonusTasksSection
              chapter={chapter}
              completedBonusTasks={completedBonusTasks}
              onBonusComplete={onBonusComplete}
            />
          )}
          
          {/* Roadmap Items */}
          {chapter.roadmapItems && chapter.roadmapItems.length > 0 && (
            <div className="space-y-3 border-t border-border/30 pt-3">
              {chapter.roadmapItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 py-1">
                  <span className="w-6 h-6 rounded-full bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Chapter 1 Special: Two CTAs */}
          {chapter.id === 1 && canClaimWithoutBonus && (
            <div className="mt-4 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setExpandedTask(null)}
                className="flex-1"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Next
              </Button>
              <Button
                onClick={handleClaim}
                className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Flame className="w-4 h-4 mr-2" />
                Claim 100 Keys (Complete Bonus First)
              </Button>
            </div>
          )}
          
          {/* Claim Reward */}
          {canClaim && !isClaimed && !chapter.isLocked && (
            <button
              onClick={handleClaim}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all animate-rainbow-glow"
            >
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-cta text-primary">Claim 100 Fyre Keys</span>
            </button>
          )}
          
          {/* Locked message */}
          {chapter.isLocked && (
            <div className="mt-4 text-center py-3 bg-muted/10 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Complete the previous chapter to unlock these tasks
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface TaskItemNewProps {
  task: Task;
  isChapterLocked: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  actionButton: React.ReactNode;
  subTasksCompleted: Set<string>;
  onSubTaskToggle: (subTaskId: string) => void;
  discordInput: string;
  setDiscordInput: (value: string) => void;
  onSubmitDiscord: () => void;
  walletBalance: { usdc: number; eth: number } | null;
}

function TaskItemNew({
  task,
  isChapterLocked,
  isExpanded,
  onToggleExpand,
  actionButton,
  subTasksCompleted,
  onSubTaskToggle,
  discordInput,
  setDiscordInput,
  onSubmitDiscord,
  walletBalance,
}: TaskItemNewProps) {
  const isDone = task.status === 'done';
  const isActive = task.status === 'active' && !isChapterLocked;
  const isLocked = task.status === 'locked' || isChapterLocked;
  
  const hasExpandableContent = task.description || task.subTasks || task.actionType === 'submit_discord' || actionButton;
  
  return (
    <div className={cn(
      "rounded-lg transition-all",
      isDone && "opacity-50",
      isActive && "bg-muted/10"
    )}>
      <button
        onClick={hasExpandableContent ? onToggleExpand : undefined}
        className={cn(
          "w-full p-3 flex items-center gap-3 text-left",
          hasExpandableContent && "hover:bg-muted/10 cursor-pointer"
        )}
      >
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {isDone ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : isLocked ? (
            <Lock className="w-5 h-5 text-muted-foreground/40" />
          ) : (
            <div className={cn(
              "w-5 h-5 rounded-full border-2",
              isActive ? "border-primary" : "border-muted-foreground/30"
            )} />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              "text-sm font-title",
              isDone ? "text-muted-foreground line-through" : isLocked ? "text-muted-foreground/60" : "text-foreground"
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
                    "text-xs px-2 py-0.5 rounded-md",
                    tag.recommended 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted/50 text-muted-foreground"
                  )}
                >
                  {tag.label}
                  {tag.recommended && <span className="ml-1 text-[10px] opacity-70">✓</span>}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Right Arrow/Status */}
        {hasExpandableContent && (
          <ChevronDown className={cn(
            "w-4 h-4 text-muted-foreground/60 transition-transform",
            isExpanded && "rotate-180"
          )} />
        )}
      </button>
      
      {/* Expanded Content */}
      {isExpanded && hasExpandableContent && (
        <div className="px-3 pb-3 animate-fade-in">
          {task.description && (
            <p className="text-xs text-muted-foreground mb-3 pl-8">{task.description}</p>
          )}
          
          {/* Link */}
          {task.link && task.linkText && (
            <a 
              href={task.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mb-3 pl-8"
            >
              {task.linkText}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          
          {/* Sub Tasks */}
          {task.subTasks && task.subTasks.length > 0 && (
            <div className="space-y-2 pl-8 mb-3">
              {task.subTasks.map((subTask) => (
                <label 
                  key={subTask.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={subTasksCompleted.has(subTask.id)}
                    onChange={() => onSubTaskToggle(subTask.id)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className={cn(
                    "text-sm",
                    subTasksCompleted.has(subTask.id) ? "text-muted-foreground line-through" : "text-foreground"
                  )}>
                    {subTask.title}
                  </span>
                  {subTask.optional && (
                    <span className="text-[10px] text-muted-foreground">(optional)</span>
                  )}
                  {subTask.link && (
                    <a 
                      href={subTask.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
              ))}
            </div>
          )}
          
          {/* Discord Input */}
          {task.actionType === 'submit_discord' && isActive && (
            <div className="flex gap-2 pl-8 mb-3">
              <input
                type="text"
                placeholder="Enter Discord ID (e.g., user#1234)"
                value={discordInput}
                onChange={(e) => setDiscordInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-muted/30 border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button onClick={onSubmitDiscord} size="sm">
                Submit
              </Button>
            </div>
          )}
          
          {/* Balance Display */}
          {walletBalance && task.actionType === 'scan_balance' && (
            <div className="flex gap-4 pl-8 mb-3 text-sm">
              <span className="text-muted-foreground">
                USDC: <span className="text-success font-title">${walletBalance.usdc.toFixed(2)}</span>
              </span>
              <span className="text-muted-foreground">
                ETH: <span className="text-foreground font-title">{walletBalance.eth.toFixed(4)}</span>
              </span>
            </div>
          )}
          
          {/* Action Button */}
          {actionButton && (
            <div className="pl-8">
              {actionButton}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface BonusTaskItemNewProps {
  task: Task;
  isCompleted: boolean;
  onComplete: () => void;
}

function BonusTaskItemNew({ task, isCompleted, onComplete }: BonusTaskItemNewProps) {
  const handleClick = () => {
    if (task.link) {
      window.open(task.link, '_blank', 'noopener,noreferrer');
    }
    if (!isCompleted) {
      onComplete();
    }
  };
  
  return (
    <div className={cn(
      "flex items-center gap-3 py-2 px-1",
      isCompleted && "opacity-50"
    )}>
      <div className="w-5 h-5 flex items-center justify-center">
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4 text-success" />
        ) : (
          <span className="text-primary text-sm">→</span>
        )}
      </div>
      <span className={cn(
        "text-sm font-title flex-1",
        isCompleted ? "text-muted-foreground line-through" : "text-foreground"
      )}>
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

interface BonusTasksSectionProps {
  chapter: Chapter;
  completedBonusTasks: Set<string>;
  onBonusComplete: (taskId: string) => void;
}

function BonusTasksSection({ chapter, completedBonusTasks, onBonusComplete }: BonusTasksSectionProps) {
  const [isExpanded, setIsExpanded] = useState(chapter.id !== 1); // Collapsed by default for Chapter 1
  
  const completedCount = chapter.bonusTasks?.filter(t => completedBonusTasks.has(t.id)).length || 0;
  const totalCount = chapter.bonusTasks?.length || 0;
  
  return (
    <div className="mt-4 pt-3 border-t border-border/20">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-1 hover:bg-muted/10 rounded transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Bonus
          </span>
          <span className="text-xs text-muted-foreground/60">(optional)</span>
          {totalCount > 0 && (
            <span className="text-[10px] text-muted-foreground">
              {completedCount}/{totalCount}
            </span>
          )}
        </div>
        <ChevronDown className={cn(
          "w-4 h-4 text-muted-foreground transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>
      
      {isExpanded && chapter.bonusTasks && (
        <div className="mt-2 animate-fade-in">
          {chapter.bonusTasks.map((task) => (
            <BonusTaskItemNew 
              key={task.id} 
              task={task} 
              isCompleted={completedBonusTasks.has(task.id)}
              onComplete={() => onBonusComplete(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
