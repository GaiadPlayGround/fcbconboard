import { Link } from 'react-router-dom';
import { Mail, HelpCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">F</span>
            </div>
            <span className="text-sm font-title text-foreground">FCBC</span>
          </Link>
          
          <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
            <span className="text-border">|</span>
            <Link to="/apps" className="px-2 hover:text-foreground transition-colors">Apps</Link>
            <span className="text-border">|</span>
            <Link to="/buy" className="px-2 hover:text-foreground transition-colors">Buy</Link>
            <span className="text-border">|</span>
            <Link to="/links" className="px-2 hover:text-foreground transition-colors">Links</Link>
          </div>
        </div>
        
        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">Wallet</span>
          <span className="text-border hidden sm:block">|</span>
          <span className="text-xs text-muted-foreground hidden sm:block">Network</span>
          <span className="text-border hidden sm:block">|</span>
          <Mail className="w-4 h-4 text-muted-foreground" />
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/30 text-xs">
            <span className="text-muted-foreground">⚡</span>
            <span className="text-foreground">96 GWEI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
