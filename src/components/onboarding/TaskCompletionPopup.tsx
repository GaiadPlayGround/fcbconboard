import { useEffect, useState } from 'react';
import { Flame, Rocket, PartyPopper, Sparkles, Zap, Trophy, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCompletionPopupProps {
  isVisible: boolean;
  taskTitle: string;
  keysEarned: number;
  onClose: () => void;
  showSafetyTip?: boolean;
}

const funnyMessages = [
  { icon: Rocket, message: "Blast off! 🚀", subtext: "You're going places!" },
  { icon: PartyPopper, message: "Party time! 🎉", subtext: "Dance like nobody's watching!" },
  { icon: Sparkles, message: "Magical! ✨", subtext: "You make it look easy!" },
  { icon: Zap, message: "Zapped it! ⚡", subtext: "Lightning fast completion!" },
  { icon: Trophy, message: "Champion! 🏆", subtext: "Victory is yours!" },
  { icon: CheckCircle2, message: "Nailed it! ✅", subtext: "Perfection achieved!" },
];

export function TaskCompletionPopup({ isVisible, taskTitle, keysEarned, onClose, showSafetyTip }: TaskCompletionPopupProps) {
  const [randomMessage] = useState(() => 
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)]
  );
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, showSafetyTip ? 5000 : 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, showSafetyTip]);
  
  if (!isVisible) return null;
  
  const IconComponent = randomMessage.icon;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="glass-card rounded-2xl p-6 text-center animate-scale-in max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
          <IconComponent className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-xl font-title text-foreground mb-1">
          {randomMessage.message}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {randomMessage.subtext}
        </p>
        
        <div className="bg-primary/10 rounded-lg p-3 mb-4">
          <p className="text-xs text-muted-foreground mb-1 truncate">
            Completed: {taskTitle}
          </p>
          <div className="flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-lg font-title text-primary">+{keysEarned} Fyre Keys</span>
          </div>
        </div>
        
        {/* Safety Tip - Only show for wallet address submission */}
        {showSafetyTip && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4 text-left">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-title text-destructive mb-1">Keep your login safe!</p>
                <p className="text-[10px] text-muted-foreground">
                  Never share your seed phrase or private keys. Use hardware wallets for large amounts.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Tap to close
        </button>
      </div>
    </div>
  );
}
