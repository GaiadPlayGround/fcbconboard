import { Flame, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FyreKeyBalanceProps {
  balance: number;
  isAnimating?: boolean;
  onEarnMore?: () => void;
}

export function FyreKeyBalance({ balance, isAnimating = false, onEarnMore }: FyreKeyBalanceProps) {
  return (
    <div className={cn(
      "relative glass-card rounded-2xl p-4 transition-all duration-300",
      isAnimating && "ring-2 ring-primary animate-key-pop"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center",
            isAnimating && "animate-pulse"
          )}>
            <Flame className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Fyre Key Balance</p>
            <p className={cn(
              "text-2xl font-title text-foreground",
              isAnimating && "text-primary"
            )}>
              {balance.toLocaleString()}
            </p>
          </div>
        </div>
        
        {/* Earn More Button */}
        <button
          onClick={onEarnMore}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors group"
        >
          <Sparkles className="w-4 h-4 text-primary group-hover:animate-pulse" />
          <span className="text-xs font-cta text-primary">Earn more</span>
        </button>
      </div>
    </div>
  );
}
