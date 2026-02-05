import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Wallet, Sun, Moon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  fyreKeys?: number;
  walletConnected?: boolean;
}

export function Header({ fyreKeys, walletConnected }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);
  
  const isParticipate = location.pathname === '/participate';
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-title text-sm">F</span>
            </div>
            <span className="font-title text-foreground hidden sm:block">FCBC.fun</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="https://fcbc.fun/gallery" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Gallery
            </a>
            <Link 
              to="/participate"
              className={cn(
                "text-sm transition-colors",
                isParticipate ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Participate
            </Link>
          </nav>
          
          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Fyre Keys (if on participate page) */}
            {fyreKeys !== undefined && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-sm font-title text-primary">{fyreKeys}</span>
              </div>
            )}
            
            {/* Wallet Status */}
            <Button 
              variant="outline" 
              size="sm"
              className={cn(
                "gap-2 h-8",
                walletConnected 
                  ? "border-success/30 text-success bg-success/10" 
                  : "border-border bg-card"
              )}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">
                {walletConnected ? 'Connected' : 'Connect'}
              </span>
            </Button>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-muted/30 transition-colors"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted/30 transition-colors md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-fade-in">
            <nav className="flex flex-col gap-3">
              <a 
                href="https://fcbc.fun/gallery" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
              <Link 
                to="/participate"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Participate
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
