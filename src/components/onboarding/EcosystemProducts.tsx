import { ExternalLink, FileText, Search, Briefcase, Camera, FlaskConical, Gamepad2, Newspaper, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { fyreApps, communityFyreApps, FyreApp } from '@/data/onboardingData';

const statusColors = {
  demo: 'bg-muted/50 text-muted-foreground',
  beta: 'bg-success/20 text-success',
  live: 'bg-success/20 text-success',
  coming: 'bg-muted/30 text-muted-foreground/60',
};

const statusLabels = {
  demo: 'demo',
  beta: 'beta live',
  live: 'live',
  coming: 'coming',
};

const appIcons: Record<string, React.ReactNode> = {
  '0': <FileText className="w-5 h-5" />,
  '1': <Search className="w-5 h-5" />,
  '2': <Briefcase className="w-5 h-5" />,
  '3': <Camera className="w-5 h-5" />,
  '4': <FlaskConical className="w-5 h-5" />,
  '5': <Gamepad2 className="w-5 h-5" />,
  'c1': <Newspaper className="w-5 h-5" />,
};

function FyreAppCard({ app }: { app: FyreApp }) {
  return (
    <div className="flex items-center gap-3 py-3 px-1 border-b border-border/20 last:border-0">
      <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center text-primary">
        {appIcons[app.id] || <FileText className="w-5 h-5" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-title text-foreground">
            FyreApp {app.id}: {app.name}
          </span>
          {!app.isOfficial && app.creator && (
            <span className="text-xs text-muted-foreground">
              by {app.creator}
            </span>
          )}
        </div>
      </div>
      <span className={cn(
        "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full",
        statusColors[app.status]
      )}>
        {statusLabels[app.status]}
      </span>
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
      <div className="glass-card rounded-xl overflow-hidden mt-6">
        <div className="p-4 border-b border-border/30">
          <h3 className="text-sm font-title text-foreground uppercase tracking-wider">
            Official FyreApps
          </h3>
        </div>
        <div className="px-4">
          {fyreApps.map((app) => (
            <FyreAppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
      
      {/* Community FyreApps */}
      <div className="glass-card rounded-xl overflow-hidden mt-4">
        <div className="p-4 border-b border-border/30">
          <h3 className="text-sm font-title text-foreground uppercase tracking-wider">
            Community FyreApps
          </h3>
        </div>
        <div className="px-4">
          {communityFyreApps.map((app) => (
            <FyreAppCard key={app.id} app={app} />
          ))}
        </div>
        
        {/* Apply Button */}
        <div className="p-4 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 bg-muted/20 border-border/50 hover:bg-primary/10 hover:border-primary/30 text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            Apply as a FyreApp/FyreGame builder
          </Button>
        </div>
      </div>
    </section>
  );
}
