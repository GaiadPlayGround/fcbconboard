import { useState } from 'react';
import { ExternalLink, Sparkles, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { fyreApps, communityFyreApps, FyreApp } from '@/data/onboardingData';

const statusColors = {
  demo: 'bg-muted/50 text-muted-foreground',
  beta: 'bg-success/20 text-success',
  live: 'bg-success/20 text-success',
  coming: 'bg-muted/30 text-muted-foreground/60',
};

function FyreAppCardNew({ app, index }: { app: FyreApp; index: number }) {
  const [selectedNum, setSelectedNum] = useState(0);
  const numbers = [0, 1, 2, 3, 4, 5, 6];
  
  return (
    <div className="glass-card rounded-2xl p-5 mb-4">
      {/* Badge */}
      <div className="mb-3">
        <span className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cta",
          app.isOfficial ? "bg-primary/10 text-primary border border-primary/20" : "bg-success/10 text-success border border-success/20"
        )}>
          <Sparkles className="w-3 h-3" />
          {app.isOfficial ? 'OFFICIAL' : 'COMMUNITY'}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-title text-foreground mb-1">FyreApp {app.id}</h3>
      <p className="text-primary font-cta mb-2">{app.name}</p>
      <p className="text-sm text-muted-foreground mb-4">{app.description}</p>
      
      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          View <ExternalLink className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="px-4">Base</Button>
        <Button variant="outline" className="px-4">FC</Button>
      </div>
      
      {/* Number Pills */}
      <div className="flex items-center justify-center gap-2">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => setSelectedNum(num)}
            className={cn(
              "w-8 h-8 rounded-full text-sm font-cta transition-all",
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
  );
}

export function EcosystemProductsSection() {
  return (
    <section className="container max-w-md mx-auto px-4 py-8">
      <h2 className="text-xl font-title text-primary text-center mb-2 uppercase tracking-wider">
        Ecosystem Products
      </h2>
      
      {/* Official FyreApps */}
      <div className="mt-6">
        <h3 className="text-sm font-title text-foreground uppercase tracking-wider mb-4">
          Official FyreApps
        </h3>
        {fyreApps.slice(0, 2).map((app, index) => (
          <FyreAppCardNew key={app.id} app={app} index={index} />
        ))}
      </div>
      
      {/* Community FyreApps */}
      <div className="mt-6">
        <h3 className="text-sm font-title text-foreground uppercase tracking-wider mb-4">
          Community FyreApps
        </h3>
        {communityFyreApps.map((app, index) => (
          <FyreAppCardNew key={app.id} app={app} index={index} />
        ))}
      </div>
      
      {/* Apply Button */}
      <Button variant="outline" size="sm" className="w-full gap-2 mt-4 bg-muted/20 border-border/50 hover:bg-primary/10 hover:border-primary/30">
        <Plus className="w-4 h-4" />
        Apply as a FyreApp/FyreGame builder
      </Button>
    </section>
  );
}
