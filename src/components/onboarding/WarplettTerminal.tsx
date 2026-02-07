import { useState } from 'react';
import { Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const quickPrompts = [
  '[ what is fcbc? ]',
  '[ explain dna markets like i\'m 5 ]',
  '[ how does species ip work? ]',
  '[ show onchain DNA assets ]',
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
    // Remove brackets and send
    const cleanPrompt = prompt.replace(/[\[\]]/g, '').trim();
    window.open(`https://00.fcbc.fun/get-started?q=${encodeURIComponent(cleanPrompt)}`, '_blank');
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden border border-border/50">
      {/* Header - Compact */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveMode('container')}
            className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs transition-colors",
              activeMode === 'container' 
                ? "bg-success/20 text-success" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            AI Container
          </button>
          <button
            onClick={() => setActiveMode('eli5')}
            className={cn(
              "text-xs transition-colors",
              activeMode === 'eli5' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            eli5
          </button>
          <span className="text-muted-foreground/30">|</span>
          <button
            onClick={() => setActiveMode('limited')}
            className={cn(
              "text-xs transition-colors",
              activeMode === 'limited' 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Limited
          </button>
        </div>
        
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-[10px] font-cta">
          • Base
        </span>
      </div>
      
      {/* Content - Compact */}
      <div className="px-3 py-2">
        <div className="space-y-0.5 text-xs text-muted-foreground font-mono">
          <p><span className="text-foreground">#</span> answers everything about <span className="text-foreground font-semibold">fcbc club</span> and <span className="text-foreground font-semibold">dna markets</span>.</p>
        </div>
      </div>
      
      {/* Input - Compact */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-muted/10">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about FCBC, DNA markets, species IP..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-foreground placeholder:text-muted-foreground"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button 
            size="sm" 
            onClick={handleSend}
            className="gap-1 text-[10px] h-6 px-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            <Send className="w-2.5 h-2.5" />
            Send
          </Button>
        </div>
        
        {/* Quick Prompts */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleQuickPrompt(prompt)}
              className="px-2 py-1 rounded-md border border-border/50 text-[10px] text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      
      {/* Footer - Compact */}
      <div className="px-3 py-2 border-t border-border/30">
        <p className="text-[10px] text-muted-foreground">
          Powered by <span className="font-semibold text-foreground">Warplette AI</span>. Automated by <span className="font-semibold text-foreground">OpenClaw</span>.
        </p>
      </div>
    </div>
  );
}