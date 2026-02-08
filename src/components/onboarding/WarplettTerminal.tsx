import { useState } from 'react';
import { Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const quickPrompts = [
  '[ fcbc? ]',
  '[ dna markets ]',
  '[ species ip ]',
  '[ assets ]',
];

export function WarplettTerminal() {
  const [query, setQuery] = useState('');
  const [activeMode, setActiveMode] = useState<'eli5' | 'limited' | 'container'>('container');
  
  const handleSend = () => {
    if (query.trim()) {
      window.open(`https://00.fcbc.fun/get-started?q=${encodeURIComponent(query)}`, '_blank');
    } else {
      window.open('https://00.fcbc.fun/get-started', '_blank');
    }
  };
  
  const handleQuickPrompt = (prompt: string) => {
    const cleanPrompt = prompt.replace(/[\[\]]/g, '').trim();
    window.open(`https://00.fcbc.fun/get-started?q=${encodeURIComponent(cleanPrompt)}`, '_blank');
  };
  
  return (
    <div className="glass-card rounded-lg overflow-hidden border border-border/50">
      {/* Header - Compact */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveMode('container')}
            className={cn(
              "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-colors",
              activeMode === 'container' 
                ? "bg-success/20 text-success" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="w-1 h-1 rounded-full bg-success" />
            AI Container
          </button>
          <span className="text-muted-foreground/30 text-xs">|</span>
          <button
            onClick={() => setActiveMode('eli5')}
            className={cn(
              "text-[10px] transition-colors",
              activeMode === 'eli5' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            eli5
          </button>
          <span className="text-muted-foreground/30 text-xs">|</span>
          <button
            onClick={() => setActiveMode('limited')}
            className={cn(
              "text-[10px] transition-colors",
              activeMode === 'limited' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Limited
          </button>
        </div>
        
        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-destructive/20 text-destructive text-[9px] font-cta">
          • Base
        </span>
      </div>
      
      {/* Content - Inline Comment Style */}
      <div className="px-3 py-2">
        <p className="text-[10px] text-muted-foreground font-mono">
          <span className="text-muted-foreground/60">#</span>{' '}
          <span className="text-muted-foreground/80">answers everything about</span>{' '}
          <span className="text-foreground">fcbc club</span>{' '}
          <span className="text-muted-foreground/80">and</span>{' '}
          <span className="text-foreground">dna markets</span>
        </p>
      </div>
      
      {/* Quick Prompts - Smaller */}
      <div className="px-3 pb-2">
        <div className="flex flex-wrap gap-1">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleQuickPrompt(prompt)}
              className="px-1.5 py-0.5 rounded border border-border/40 text-[9px] text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input - Above Footer */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded border border-border/50 bg-muted/10">
          <Terminal className="w-3 h-3 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about FCBC, DNA markets..."
            className="flex-1 bg-transparent border-none outline-none text-[11px] text-foreground placeholder:text-muted-foreground min-w-0"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            size="sm" 
            onClick={handleSend}
            className="gap-1 text-[9px] h-5 px-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground flex-shrink-0"
          >
            <Send className="w-2 h-2" />
            Send
          </Button>
        </div>
      </div>
      
      {/* Footer - Compact */}
      <div className="px-3 py-1.5 border-t border-border/30 bg-muted/5">
        <p className="text-[9px] text-muted-foreground">
          Powered by <span className="font-semibold text-foreground">Warplette AI</span>. Automated by <span className="font-semibold text-foreground">OpenClaw</span>.
        </p>
      </div>
    </div>
  );
}
