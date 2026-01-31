import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Mail, Clock, History, ChevronDown, ChevronUp, HelpCircle, TrendingUp, Users } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import DotGrid from '@/components/backgrounds/DotGrid';
import { cn } from '@/lib/utils';

const snapshotTokens = ['$FCBC121', '$FCBC19', '$FCBC56'];

const featuredPurebreeds = [
  {
    id: 1,
    name: 'Nile Crocodile',
    status: 'ENDANGERED',
    region: 'Riverine',
    image: '/placeholder.svg',
    baseSquares: 98942,
    mcap: '$2.4M',
    holders: 1247,
  },
  {
    id: 2,
    name: 'Amur Tiger',
    status: 'ENDANGERED',
    region: 'Primorsky',
    image: '/placeholder.svg',
    baseSquares: 77240,
    mcap: '$1.8M',
    holders: 982,
  },
  {
    id: 3,
    name: 'Amazon Catfish',
    status: 'ENDANGERED',
    region: 'Rainforest',
    image: '/placeholder.svg',
    baseSquares: 21308,
    mcap: '$890K',
    holders: 654,
  },
  {
    id: 4,
    name: 'Snow Leopard',
    status: 'VULNERABLE',
    region: 'Himalayas',
    image: '/placeholder.svg',
    baseSquares: 45120,
    mcap: '$1.2M',
    holders: 823,
  },
  {
    id: 5,
    name: 'Blue Whale',
    status: 'ENDANGERED',
    region: 'Pacific',
    image: '/placeholder.svg',
    baseSquares: 156780,
    mcap: '$4.1M',
    holders: 2156,
  },
];

const howItWorks = [
  {
    title: 'Buy DNA Tokens',
    highlight: 'DNA',
    description: 'Acquire digital genomic signatures backed by real endangered species data from the IUCN Red List. Each token represents a unique bio-digital asset with intrinsic conservation value.',
    icon: '🧬',
  },
  {
    title: 'Assign Base Squares',
    highlight: 'Base Squares',
    description: 'Stake your position and expand your onchain footprint. Signal attention to species you believe in and climb the custody leaderboards.',
    icon: '📐',
  },
  {
    title: 'Custody to Earn',
    highlight: 'to Earn',
    description: 'Participate in weekly snapshots to earn rewards. Hold strategically to maximize custodial returns and gain shared IP exposure across the ecosystem.',
    icon: '📊',
  },
  {
    title: 'Create HYBRIDS',
    highlight: 'HYBRIDS',
    description: 'Combine PureBreeds to create rare Hybrid species. Hyper-deflationary mechanics permanently burn tokens, creating irreversible scarcity and generational rarity.',
    icon: '✨',
  },
];

const fyreAppsData = [
  { 
    id: 0,
    name: 'Fyre Docs', 
    subtitle: 'AI-Native Knowledgebase', 
    status: 'demo',
    description: 'AI-native living knowledgebase. Query in natural language, switch ELI5/Creative/Official modes, learn via games and quizzes, earn Fyre Keys, share pages, execute tasks.',
  },
  { 
    id: 1,
    name: 'PureBreed Explorer', 
    subtitle: 'DNA Markets Gallery', 
    status: 'beta',
    description: 'Fyredex and PureBreed navigator with slideshow discovery, quick links, instant buys, Base Square voting, bulk actions, and community leaderboards.',
  },
  { 
    id: 2,
    name: 'Portfolio Manager', 
    subtitle: 'Holdings Dashboard', 
    status: 'coming',
    description: 'DNA token analytics and control center. Holdings breakdown, asset-level detail, quick buy, and multi-buy execution.',
  },
  { 
    id: 3,
    name: 'Custody & Snapshots', 
    subtitle: 'Snapshot Dashboards', 
    status: 'coming',
    description: 'Weekly custody snapshots, Warplette recommendations, custodian leaderboards, blind boxes, custody hunts, gifting, and performance stats.',
  },
  { 
    id: 4,
    name: 'Fyre Labs', 
    subtitle: 'Breeding Interface', 
    status: 'coming',
    description: 'Breeding interface to combine DNA into Hybrids. Manage PureBreeds and Hybrids, access breeders chatroom, and syndicate rewards.',
  },
  { 
    id: 5,
    name: 'Fyre Arena', 
    subtitle: 'Competitive Layer', 
    status: 'coming',
    description: 'Competitive layer with free-to-high-stakes contests—hybrid showcases, tournaments, PvP battles, death matches. Play as breeder or earn as spectator via predictions.',
  },
];

const communityApps = [
  {
    name: 'FyreHerald',
    builder: 'HawkNode',
    status: 'live',
    description: 'Ecosystem intelligence hub for announcements, roadmap updates, events, and what\'s next.',
  },
];

const statusColors: Record<string, string> = {
  demo: 'bg-muted/50 text-muted-foreground',
  beta: 'bg-success/20 text-success',
  live: 'bg-success/20 text-success',
  coming: 'bg-muted/30 text-muted-foreground/60',
};

export default function Home() {
  const [expandedApp, setExpandedApp] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* DotGrid Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <DotGrid
          dotSize={4}
          gap={14}
          baseColor="#302f42"
          activeColor="#5227FF"
          proximity={140}
          shockRadius={260}
          shockStrength={12}
          resistance={400}
          returnDuration={3.4}
        />
      </div>
      
      <Header />
      
      {/* Hero Section */}
      <main className="pt-20 pb-12 relative z-10">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Hero */}
          <section className="text-center py-12 md:py-20">
            <p className="text-xs md:text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
              Open Attention Markets for Endangered Species
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-title text-foreground leading-tight mb-6">
              OPEN ATTENTION MARKETS<br />
              <span className="text-primary">FOR ENDANGERED SPECIES.</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-8">
              DNA-based bio-digital resources for community-driven IP generation on Base.
            </p>
            
            {/* CTAs - Side by Side */}
            <div className="flex flex-row items-center justify-center gap-3 mb-8">
              <Button 
                variant="outline" 
                className="gap-2 px-6 py-2.5 border-border bg-card hover:bg-muted/50"
              >
                Explore Gallery
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link to="/participate">
                <Button 
                  variant="outline" 
                  className="gap-2 px-6 py-2.5 border-border bg-card hover:bg-muted/50"
                >
                  Join Club
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">
              DNA markets are a new frontier. All species are based on real-world data.{' '}
              <span className="text-primary underline cursor-pointer">Digital</span>
            </p>
          </section>
          
          {/* Stats Announcement Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-xl" />
            <div className="relative glass-card rounded-xl py-4 px-6 border-t-2 border-b-2 border-primary/30">
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-title text-primary">234</span>
                  <span className="text-xs text-muted-foreground uppercase">Markets</span>
                </div>
                <div className="w-px h-8 bg-border hidden md:block" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-title text-foreground">362,782</span>
                  <span className="text-xs text-muted-foreground uppercase">Base Squares</span>
                </div>
                <div className="w-px h-8 bg-border hidden md:block" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-title text-success">$72M</span>
                  <span className="text-xs text-muted-foreground uppercase">Market Cap</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Purebreeds - Marquee */}
          <section className="py-8">
            <h2 className="text-lg font-title text-foreground uppercase tracking-wider mb-2">
              Featured Purebreeds
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              High signal species with active custody and hybrid potential.
            </p>
            
            {/* Marquee Container */}
            <div className="relative overflow-hidden">
              <div className="flex gap-4 animate-marquee">
                {[...featuredPurebreeds, ...featuredPurebreeds].map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`}
                    className="glass-card rounded-xl overflow-hidden group flex-shrink-0 w-[280px]"
                  >
                    <div className="aspect-[16/10] bg-muted/30 relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-title text-foreground mb-1">{item.name}</h3>
                      <div className="flex items-center gap-2 text-xs mb-3">
                        <span className="text-destructive font-medium">{item.status}</span>
                        <span className="text-muted-foreground">{item.region}</span>
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                        <div className="glass-card rounded-lg p-2">
                          <span className="text-[10px] text-muted-foreground block">Base Squares</span>
                          <span className="text-xs font-title text-foreground">{item.baseSquares.toLocaleString()}</span>
                        </div>
                        <div className="glass-card rounded-lg p-2">
                          <TrendingUp className="w-3 h-3 text-success mx-auto mb-0.5" />
                          <span className="text-xs font-title text-foreground">{item.mcap}</span>
                        </div>
                        <div className="glass-card rounded-lg p-2">
                          <Users className="w-3 h-3 text-primary mx-auto mb-0.5" />
                          <span className="text-xs font-title text-foreground">{item.holders}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-9">
                        Signal Attention
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* How DNA Markets Work - 2x2 on mobile */}
          <section className="py-8">
            <h2 className="text-lg font-title text-foreground uppercase tracking-wider mb-6">
              How DNA Markets <span className="text-muted-foreground font-normal">Work</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {howItWorks.map((item, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-4 md:p-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-title text-foreground">
                      {item.title.replace(item.highlight, '')}
                      <span className="text-primary">{item.highlight}</span>
                    </h3>
                    <span className="text-xl md:text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Link to="/participate">
                <Button className="bg-secondary hover:bg-secondary/80 text-foreground px-8 animate-rainbow-glow">
                  BEGIN
                </Button>
              </Link>
            </div>
          </section>
          
          {/* Snapshots and Custody Section */}
          <SnapshotsAndCustodySection />
          
          {/* FyreApps Spotlight - Expandable */}
          <section className="py-8">
            <h2 className="text-lg font-title text-foreground uppercase tracking-wider mb-2">
              FyreApps <span className="text-muted-foreground font-normal">Spotlight</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Integrated apps powering the DNA ecosystem experience.
            </p>
            
            {/* Official FyreApps */}
            <div className="space-y-3 mb-6">
              {fyreAppsData.map((app) => (
                <div 
                  key={app.id}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-title text-sm">{app.id}</span>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-title text-foreground">{app.name}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase",
                            statusColors[app.status]
                          )}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{app.subtitle}</p>
                      </div>
                    </div>
                    {expandedApp === app.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {expandedApp === app.id && (
                    <div className="px-4 pb-4 animate-fade-in">
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {app.description}
                      </p>
                      <Button 
                        size="sm" 
                        className={cn(
                          "text-xs",
                          app.status === 'coming' 
                            ? "bg-muted text-muted-foreground cursor-not-allowed" 
                            : "bg-primary hover:bg-primary/90 text-primary-foreground"
                        )}
                        disabled={app.status === 'coming'}
                      >
                        {app.status === 'coming' ? 'Coming Soon' : 'Enter App'}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Community FyreApps */}
            <h3 className="text-sm font-title text-muted-foreground uppercase tracking-wider mb-3">
              Community FyreApps
            </h3>
            <div className="space-y-3 mb-4">
              {communityApps.map((app, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-title text-foreground">{app.name}</span>
                      <span className="text-xs text-muted-foreground">by {app.builder}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase",
                        statusColors[app.status]
                      )}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{app.description}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    View
                  </Button>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2 bg-muted/20 border-border/50 hover:bg-primary/10 hover:border-primary/30"
            >
              <Plus className="w-4 h-4" />
              Apply as a FyreApp/FyreGame builder
            </Button>
          </section>
          
          {/* Fyre PureBreed Index */}
          <FyrePureBreedIndex />
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            DNA Markets is the first onchain genete ecosystem for bio RWAs.
          </p>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Built on Zora by <Mail className="w-3 h-3 inline" /> <span className="text-primary">awarpfoate</span>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function SnapshotsAndCustodySection() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 29, seconds: 55 });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section className="py-8">
      {/* Title */}
      <h2 className="text-lg font-title uppercase tracking-wider mb-3">
        <span className="text-primary">SNAPSHOTS</span>
        <span className="text-muted-foreground font-normal"> AND CUSTODY</span>
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Monitor snapshot events and earn custial participation over species-level digital genomic signatures.
      </p>
      
      {/* Countdown Card */}
      <div className="glass-card rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-title text-foreground uppercase tracking-wide">
              Epoch 1 Ends In
            </span>
          </div>
          <button className="p-2 rounded-full hover:bg-muted/30 transition-colors">
            <History className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        
        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { value: timeLeft.days, label: 'DAYS' },
            { value: timeLeft.hours, label: 'HOURS' },
            { value: timeLeft.minutes, label: 'MIN' },
            { value: timeLeft.seconds, label: 'SEC' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl md:text-4xl font-title text-primary mb-1">
                {item.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Last Snapshot Signals */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Last Snapshot Signals</p>
            <div className="flex flex-wrap gap-2">
              {snapshotTokens.map((token) => (
                <span 
                  key={token}
                  className="px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 text-sm text-foreground font-cta"
                >
                  {token}
                </span>
              ))}
            </div>
          </div>
          
          {/* View Hint */}
          <div className="text-right">
            <Button className="bg-secondary hover:bg-secondary/80 text-foreground px-6 mb-2">
              VIEW HINT
            </Button>
            <p className="text-xs text-muted-foreground max-w-[200px]">
              Hints reveal upcoming snapshot mechanics and custody conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FyrePureBreedIndex() {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <section className="py-8">
      <h2 className="text-lg font-title text-foreground uppercase tracking-wider mb-4">
        Fyre <span className="text-primary">PureBreed</span> Index
      </h2>
      
      {/* Balance Card - Credit Card Style */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Total Ecosystem Value</p>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-full hover:bg-muted/30 transition-colors"
            >
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="text-4xl md:text-5xl lg:text-6xl font-title text-foreground mb-2">
            $236,678.25
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-success">+12.4%</span>
            <span className="text-muted-foreground">past 24h</span>
          </div>
          
          {showInfo && (
            <div className="mt-4 p-4 rounded-lg bg-background/50 backdrop-blur-sm animate-fade-in">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">How it's calculated:</strong> The Fyre PureBreed Index 
                aggregates the total market value of all active DNA tokens, weighted by Base Square 
                assignments and custody participation rates across all 234 species markets.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
