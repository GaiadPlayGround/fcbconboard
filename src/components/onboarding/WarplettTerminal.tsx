import { useState } from 'react';
import { Copy, Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const quickPrompts = [
  '[ what is fcbc? ]',
  '[ explain dna markets like i\'m 5 ]',
  '[ how does species ip work? ]',
  '[ show onchain DNA assets ]',
];

export function WarplettTerminal() {
  const [query, setQuery] = useState('');
  const [activeMode, setActiveMode] = useState<'eli5' | 'hackable' | 'container'>('container');
  
  const handleCopy = () => {
    navigator.clipboard.writeText(query || 'Ask anything about FCBC, DNA markets, species IP, bioRWAs...');
    toast({ title: 'Copied to clipboard!' });
  };
  
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
    <section className="py-8">
      <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveMode('container')}
              className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors",
                activeMode === 'container' 
                  ? "bg-success/20 text-success" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-success" />
              Container
            </button>
            <button
              onClick={() => setActiveMode('eli5')}
              className={cn(
                "text-sm transition-colors",
                activeMode === 'eli5' 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              eli5
            </button>
            <span className="text-muted-foreground/30">|</span>
            <button
              onClick={() => setActiveMode('hackable')}
              className={cn(
                "text-sm transition-colors",
                activeMode === 'hackable' 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Hackable
            </button>
          </div>
          
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/20 text-destructive text-sm font-cta">
            • Base
          </span>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-muted-foreground mb-4">
            DNA-based bio-digital resources<br />
            for community-driven IP generation on Base
          </p>
          
          <div className="border-t border-dashed border-border/50 my-4" />
          
          <div className="space-y-1 text-sm text-muted-foreground font-mono">
            <p><span className="text-foreground">#</span> answers everything.</p>
            <p><span className="text-foreground">#</span> knows all about <span className="text-foreground font-semibold">fcbc club</span> and <span className="text-foreground font-semibold">dna markets</span>.</p>
            <p><span className="text-foreground">#</span> can explain to any comprehension level.</p>
          </div>
        </div>
        
        {/* Input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-border/50 bg-muted/10">
            <Terminal className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about FCBC, DNA markets, species IP, bioRWAs..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCopy}
              className="gap-1 text-xs"
            >
              <Copy className="w-3 h-3" />
              Copy
            </Button>
            <Button 
              size="sm" 
              onClick={handleSend}
              className="gap-1 text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              <Send className="w-3 h-3" />
              Send
            </Button>
          </div>
          
          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mt-3">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-3 py-1.5 rounded-md border border-border/50 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-4 py-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Works onchain & bio-digitality. Powered by <span className="font-semibold text-foreground">Clawd</span> 🔥
          </p>
        </div>
      </div>
    </section>
  );
}
