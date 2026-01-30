import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wallet, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  fyreKeys?: number;
  showWallet?: boolean;
}

export function Header({ fyreKeys, showWallet = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };
  
  const navLinks = [
    { label: 'Gallery', href: '/' },
    { label: 'Apps', href: '/apps' },
    { label: 'Buy', href: '/buy' },
    { label: 'Links', href: '/links' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <span className="text-lg font-title text-foreground tracking-tight hidden sm:block">FCBC</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-1.5 text-sm font-cta transition-colors rounded-md",
                location.pathname === link.href 
                  ? "text-foreground bg-muted/30" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted/30 transition-colors"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Moon className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {/* Wallet */}
          {showWallet && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConnected(!isConnected)}
              className={cn(
                "gap-2 text-xs h-8",
                isConnected 
                  ? "bg-success/10 border-success/30 text-success" 
                  : "bg-muted/20 border-border"
              )}
            >
              <Wallet className="w-3.5 h-3.5" />
              {isConnected ? '$ 5 USDC' : 'Connect'}
            </Button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-muted/30 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/30 animate-fade-in">
          <nav className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "px-4 py-2 text-sm font-cta transition-colors rounded-lg",
                  location.pathname === link.href 
                    ? "text-foreground bg-muted/30" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
