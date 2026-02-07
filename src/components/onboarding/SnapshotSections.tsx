import { useState, useEffect } from 'react';
import { Clock, History, Info, ChevronDown, Gift, Package, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { lastWeekSnapshots } from '@/data/onboardingData';

export function SnapshotsCustodySection() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 30, seconds: 28 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section id="custody-hunting" className="py-8">
      <h2 className="text-lg md:text-xl lg:text-2xl font-title text-foreground text-center md:text-left mb-4 md:mb-6">
        Custody <span className="text-primary">Hunting</span>
      </h2>
      
      <div className="glass-card rounded-xl p-5 md:p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-title text-foreground uppercase tracking-wide">Next Snapshot In</span>
          </div>
          <button className="p-2 rounded-full bg-muted/30 hover:bg-muted/50 transition-colors">
            <History className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HOURS' },
            { value: timeLeft.minutes, label: 'MIN' },
            { value: timeLeft.seconds, label: 'SEC' },
          ].map((item) => (
            <div key={item.label} className="bg-muted/20 border border-border/30 rounded-xl p-3 md:p-4 text-center">
              <div className="text-2xl md:text-4xl font-title text-primary">{item.value}</div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Last week Snapshots:</span>
          {lastWeekSnapshots.map((token) => (
            <span key={token.id} className="px-3 py-1 rounded-full bg-muted/40 border border-border/30 text-sm text-foreground">
              {token.symbol}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowSnapshotsWork() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <section className="pb-4 max-w-2xl mx-auto">
      <div className="glass-card rounded-xl overflow-hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center gap-3 hover:bg-muted/10 transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Info className="w-5 h-5 text-primary" />
          </div>
          <span className="flex-1 text-left text-base font-title text-foreground">How Snapshots Work</span>
          <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="px-4 pb-4 animate-fade-in">
            <div className="pt-2 space-y-3 text-sm text-muted-foreground">
              <p>A snapshot event is a scheduled moment where the system records blockchain holdings to identify the top holder of randomly selected FCBC Pre-assets.</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Snapshots occur once every week</li>
                <li>Each event selects 3 to 10 random Pre-assets</li>
                <li>Only the top holder of each selected species is recognized as the Custodian</li>
                <li>Selection is random, so users cannot predict which species will be snapped</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface BlindboxPopupProps {
  isOpen: boolean;
  onClose: () => void;
  boxNumber: number;
}

function BlindboxPopup({ isOpen, onClose, boxNumber }: BlindboxPopupProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-2xl p-6 max-w-sm w-full relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted/30 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          
          <h3 className="text-lg font-title text-foreground mb-2">Reveal Hint?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get a clue about which species might be snapped next. Become highest holder and receive its PureBreed NFT.
          </p>
          
          <p className="text-xs text-muted-foreground mb-6">
            Hints cost <span className="text-primary font-semibold">$1</span>
          </p>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Reveal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FyreBlindBoxes() {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  
  return (
    <section className="pb-8 max-w-2xl mx-auto">
      <div className="bg-card/80 border border-border/30 rounded-2xl p-5 md:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-title text-foreground">Fyre Blindboxes</h3>
              <p className="text-xs text-muted-foreground">Tap to reveal species hints</p>
            </div>
          </div>
        </div>
        
        {/* 2 rows of 5 boxes */}
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedBox(num)}
              className={cn(
                "aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all relative",
                "border-border/50 bg-muted/20 hover:border-primary/50"
              )}
            >
              <Package className="w-5 h-5 md:w-6 md:h-6 text-primary mb-0.5" />
              <span className="text-[9px] md:text-[10px] text-muted-foreground">#{num}</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-primary text-primary-foreground text-[8px] md:text-[9px] flex items-center justify-center">?</div>
            </button>
          ))}
        </div>
      </div>
      
      <BlindboxPopup 
        isOpen={selectedBox !== null}
        onClose={() => setSelectedBox(null)}
        boxNumber={selectedBox || 1}
      />
    </section>
  );
}