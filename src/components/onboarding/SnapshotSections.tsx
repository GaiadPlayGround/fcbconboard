import { useState, useEffect } from 'react';
import { Clock, History, Info, ChevronDown, Gift, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { lastWeekSnapshots } from '@/data/onboardingData';

export function SnapshotsCustodySection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 28
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="container max-w-md mx-auto px-4 py-8">
      {/* Section Title */}
      <h2 className="text-2xl font-title text-primary text-center mb-3">
        Snapshots and Custody
      </h2>
      <p className="text-center text-muted-foreground text-sm mb-8 px-4">
        Monitor Snapshot Events and earn custodian rights of the digital genomic signature of endangered species.
      </p>
      
      {/* Epoch Countdown Card */}
      <div className="glass-card rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-title text-foreground uppercase tracking-wide">
              Epoch 1 Ends In
            </span>
          </div>
          <button className="p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors">
            <History className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HOURS' },
            { value: timeLeft.minutes, label: 'MIN' },
            { value: timeLeft.seconds, label: 'SEC' },
          ].map((item) => (
            <div 
              key={item.label}
              className="bg-muted/20 border border-border/30 rounded-xl p-3 text-center"
            >
              <div className="text-3xl font-title text-primary">
                {item.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Last Week Snapshots */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Last week Snapshots:</span>
          {lastWeekSnapshots.map((token) => (
            <span 
              key={token.id}
              className="px-3 py-1 rounded-full bg-muted/40 border border-border/30 text-sm text-foreground"
            >
              {token.symbol}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CollapsibleInfoProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleInfo({ title, icon, children, defaultOpen = false }: CollapsibleInfoProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center gap-3 hover:bg-muted/10 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <span className="flex-1 text-left text-base font-title text-foreground">
          {title}
        </span>
        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

export function HowSnapshotsWork() {
  return (
    <section className="container max-w-md mx-auto px-4 pb-4">
      <CollapsibleInfo 
        title="How Snapshots Work" 
        icon={<Info className="w-5 h-5 text-primary" />}
      >
        <div className="pt-2 space-y-3 text-sm text-muted-foreground">
          <p>
            Snapshots capture the state of your holdings at random intervals during each epoch.
          </p>
          <p>
            Hold eligible tokens during a snapshot to earn custody points and unlock exclusive rewards.
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Snapshots occur randomly within each epoch</li>
            <li>Hold $FCBC tokens to qualify</li>
            <li>More tokens = more custody weight</li>
            <li>Rewards distributed at epoch end</li>
          </ul>
        </div>
      </CollapsibleInfo>
    </section>
  );
}

export function SnapshotBlindBoxes() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const boxes = [1, 2, 3, 4, 5, 6];
  const emptySlots = ['Empty', 'Empty', 'Empty', 'Empty'];
  
  return (
    <section className="container max-w-md mx-auto px-4 pb-8">
      <div className="bg-card/80 border border-border/30 rounded-2xl p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-title text-foreground">Snapshot Hint BlindBoxes</h3>
              <p className="text-xs text-muted-foreground">Tap to reveal species hints</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-cta hover:bg-primary/90 transition-colors">
            Reveal for $1
          </button>
        </div>
        
        {/* Box Grid */}
        <div className="grid grid-cols-5 gap-2 mb-3">
          {boxes.map((num) => (
            <button
              key={num}
              onClick={() => setSelectedBox(num)}
              className={cn(
                "aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all",
                selectedBox === num 
                  ? "border-primary bg-primary/10" 
                  : "border-border/50 bg-muted/20 hover:border-primary/50"
              )}
            >
              <Package className="w-6 h-6 text-primary mb-1" />
              <span className="text-[10px] text-muted-foreground">#{num}</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                ?
              </div>
            </button>
          ))}
        </div>
        
        {/* Empty Slots */}
        <div className="grid grid-cols-5 gap-2">
          <div className="aspect-square rounded-xl border-2 border-border/50 bg-muted/20 flex flex-col items-center justify-center relative">
            <Package className="w-6 h-6 text-primary mb-1" />
            <span className="text-[10px] text-muted-foreground">#6</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
              ?
            </div>
          </div>
          {emptySlots.map((_, idx) => (
            <div 
              key={idx}
              className="aspect-square rounded-xl border-2 border-dashed border-border/30 flex items-center justify-center"
            >
              <span className="text-xs text-muted-foreground/50">Empty</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
