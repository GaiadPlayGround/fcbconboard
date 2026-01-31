import { useState } from 'react';
import { ExternalLink, Sparkles, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { fyreApps, communityFyreApps, FyreApp } from '@/data/onboardingData';

const statusColors: Record<string, string> = {
  demo: 'bg-muted/50 text-muted-foreground',
  beta: 'bg-success/20 text-success',
  live: 'bg-success/20 text-success',
  coming: 'bg-muted/30 text-muted-foreground/60',
};

function FyreAppCardExpandable({ app }: { app: FyreApp }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNum, setSelectedNum] = useState<number>(parseInt(app.id) || 0);
  const numbers = [0, 1, 2, 3, 4, 5, 6];
  
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-5 flex items-center justify-between hover:bg-muted/10 transition-colors"
      >
        <div className="flex items-center gap-3 md:gap-4">
          {/* App Number */}
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-title text-lg md:text-xl">{app.id}</span>
          </div>
          
          {/* App Info */}
          <div className="text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm md:text-base font-title text-foreground">{app.name}</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase",
                statusColors[app.status]
              )}>
                {app.status}
              </span>
              {app.isOfficial && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-2.5 h-2.5" />
                  OFFICIAL
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{app.subtitle}</p>
          </div>
        </div>
        
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{app.description}</p>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 mb-4">
            <Button 
              className={cn(
                "flex-1 gap-2",
                app.status === 'coming' 
                  ? "bg-muted text-muted-foreground cursor-not-allowed" 
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              )}
              disabled={app.status === 'coming'}
            >
              {app.status === 'coming' ? 'Coming Soon' : 'View'}
              {app.status !== 'coming' && <ExternalLink className="w-4 h-4" />}
            </Button>
            <Button variant="outline" className="px-4">Base</Button>
            <Button variant="outline" className="px-4">FC</Button>
          </div>
          
          {/* Number Pills */}
          <div className="flex items-center justify-center gap-2">
            {numbers.map((num) => (
              <button
                key={num}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNum(num);
                }}
                className={cn(
                  "w-7 h-7 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-cta transition-all",
                  selectedNum === num 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function EcosystemProductsSection() {
  return (
    <section className="py-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-title text-primary text-center mb-2 uppercase tracking-wider">
        Ecosystem Products
      </h2>
      
      {/* Official FyreApps */}
      <div className="mt-6">
        <h3 className="text-sm font-title text-foreground uppercase tracking-wider mb-4">
          Official FyreApps
        </h3>
        <div className="space-y-3">
          {fyreApps.map((app) => (
            <FyreAppCardExpandable key={app.id} app={app} />
          ))}
        </div>
      </div>
      
      {/* Community FyreApps */}
      <div className="mt-6">
        <h3 className="text-sm font-title text-foreground uppercase tracking-wider mb-4">
          Community FyreApps
        </h3>
        <div className="space-y-3">
          {communityFyreApps.map((app) => (
            <FyreAppCardExpandable key={app.id} app={app} />
          ))}
        </div>
      </div>
      
      {/* Apply Button */}
      <Button variant="outline" size="sm" className="w-full gap-2 mt-6 bg-muted/20 border-border/50 hover:bg-primary/10 hover:border-primary/30">
        <Plus className="w-4 h-4" />
        Apply as a FyreApp/FyreGame builder
      </Button>
    </section>
  );
}
