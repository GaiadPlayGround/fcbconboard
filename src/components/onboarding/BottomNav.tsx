import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  fyreKeys: number;
}

export function BottomNav({ fyreKeys }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/30">
      <div className="container max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-lg font-title tracking-tight">FCBC</span>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <button className="px-3 py-1.5 hover:text-foreground transition-colors font-cta">
            Apps
          </button>
          <span className="text-border">|</span>
          <button className="px-3 py-1.5 hover:text-foreground transition-colors font-cta">
            Buy
          </button>
          <span className="text-border">|</span>
          <button className="px-3 py-1.5 hover:text-foreground transition-colors font-cta">
            Links
          </button>
        </div>
        
        <button className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
          "bg-primary/20 text-primary text-sm font-cta",
          "hover:bg-primary/30 transition-colors"
        )}>
          <span>$ {fyreKeys} USDC</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}
