import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, History, HelpCircle, TrendingUp, Users, Sparkles, ExternalLink, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { WarplettTerminal } from '@/components/onboarding/WarplettTerminal';
import Galaxy from '@/components/backgrounds/Galaxy';
import CosmicBackground from '@/components/backgrounds/CosmicBackground';
import { cn } from '@/lib/utils';

const snapshotTokens = ['$FCBC121', '$FCBC19', '$FCBC56', '$FCBC2'];

const featuredPurebreeds = [
  { id: 1, name: 'Nile Crocodile', status: 'ENDANGERED', baseSquares: 98842, mcap: '$2.4M', holders: 1247 },
  { id: 2, name: 'Amur Tiger', status: 'ENDANGERED', baseSquares: 77240, mcap: '$1.8M', holders: 982 },
  { id: 3, name: 'Amazon Catfish', status: 'ENDANGERED', baseSquares: 21308, mcap: '$890K', holders: 654 },
  { id: 4, name: 'Snow Leopard', status: 'VULNERABLE', baseSquares: 45120, mcap: '$1.2M', holders: 823 },
  { id: 5, name: 'Blue Whale', status: 'ENDANGERED', baseSquares: 156780, mcap: '$4.1M', holders: 2156 },
  { id: 6, name: 'Giant Panda', status: 'VULNERABLE', baseSquares: 89450, mcap: '$2.1M', holders: 1432 },
  { id: 7, name: 'African Elephant', status: 'ENDANGERED', baseSquares: 134560, mcap: '$3.5M', holders: 1890 },
  { id: 8, name: 'Komodo Dragon', status: 'ENDANGERED', baseSquares: 34210, mcap: '$980K', holders: 567 },
  { id: 9, name: 'Hawksbill Turtle', status: 'CRITICALLY', baseSquares: 28940, mcap: '$750K', holders: 445 },
  { id: 10, name: 'Red Panda', status: 'ENDANGERED', baseSquares: 67890, mcap: '$1.6M', holders: 912 },
  { id: 11, name: 'Sumatran Rhino', status: 'CRITICALLY', baseSquares: 18450, mcap: '$520K', holders: 312 },
  { id: 12, name: 'Mountain Gorilla', status: 'ENDANGERED', baseSquares: 112340, mcap: '$2.9M', holders: 1567 },
  { id: 13, name: 'Sea Otter', status: 'ENDANGERED', baseSquares: 42300, mcap: '$1.1M', holders: 698 },
  { id: 14, name: 'Bengal Tiger', status: 'ENDANGERED', baseSquares: 89100, mcap: '$2.2M', holders: 1123 },
];

const marqueeStats = [
  { label: 'Markets', value: '234' },
  { label: 'Total Base Squares', value: '362,782' },
  { label: 'Market Cap', value: '$72M' },
  { label: 'Total Holders', value: '1501' },
  { label: 'Fyre Custodians', value: '0' },
  { label: 'Fyre PureBreed Index', value: '6290151' },
];

const howItWorks = [
  {
    title: 'Buy DNA Tokens',
    highlight: 'DNA',
    description: 'Based on real species data. Line with IUCN Red List. Digital genomes for community-driven IP.',
    icon: '🧬',
  },
  {
    title: 'Assign Base Squares',
    highlight: 'Base Squares',
    description: 'Expand onchain footprint. Promote what you signal.',
    icon: '▦',
  },
  {
    title: 'Custody to Earn',
    highlight: 'to Earn',
    description: 'Snapshot participation, shared IP exposure. Syndicated upside.',
    icon: '📡',
  },
  {
    title: 'Create HYBRIDS',
    highlight: 'HYBRIDS',
    description: 'Hyper-deflationary combine-and-burn mechanics that irreversibly generate genetic rarity.',
    icon: '✧',
  },
];

const ecosystemProducts = [
  { 
    id: 0,
    name: 'Fyre Docs', 
    subtitle: 'AI-Native Knowledgebase', 
    status: 'demo',
    description: 'AI-native living knowledgebase. Ask anything in natural language. Learn via games and quizzes. Earn Fyre Keys. Share pages. Execute tasks.',
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
  {
    id: 6,
    name: 'Fyre DEX',
    subtitle: 'Bio-RWA Exchange',
    status: 'coming',
    description: 'Uniswap-style exchange exclusively for bio-RWAs on Base. Earn 5x the Fyre Keys rewards and contest for weekly prizes.',
  },
];

const communityApps = [
  {
    name: 'FyreHerald',
    builder: 'HawkNode',
    status: 'live',
    description: 'Ecosystem intelligence hub for announcements, roadmap updates, events, and what\'s next.',
  },
  {
    name: 'Fyre DEX',
    builder: 'JariusOS',
    status: 'coming',
    description: 'Uniswap-style exchange exclusively for bio-RWAs on Base. Earn 5x the Fyre Keys rewards and contest for weekly prizes.',
  },
];

const statusColors: Record<string, string> = {
  demo: 'bg-muted/50 text-muted-foreground',
  beta: 'bg-success/20 text-success',
  live: 'bg-success/20 text-success',
  coming: 'bg-muted/30 text-muted-foreground/60',
};

export default function Home() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const selectedProduct = ecosystemProducts[selectedProductIndex];
  const [eli5Mode, setEli5Mode] = useState(false);
  const navigate = useNavigate();
  
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const scrollMarquee = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleViewHint = () => {
    navigate('/participate#custody-hunting');
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Header />
      
      <main className="relative z-10">
        {/* Hero Section with Galaxy Background */}
        <section className="relative min-h-[100svh] flex flex-col">
          {/* Galaxy Background - Only for hero section */}
          <div className="absolute inset-0 z-0">
            <Galaxy 
              mouseRepulsion
              mouseInteraction
              density={1.9}
              glowIntensity={0.3}
              saturation={0.3}
              hueShift={300}
              twinkleIntensity={0}
              rotationSpeed={0.05}
              repulsionStrength={0.5}
              autoCenterRepulsion={0}
              starSpeed={0.3}
              speed={0.6}
            />
          </div>
          
          <div className="container max-w-6xl mx-auto px-4 pt-24 md:pt-28 pb-4 relative z-10 flex-1 flex flex-col">
            {/* Hero Content */}
            <div className="text-center flex-1 flex flex-col justify-center">
              <p className="text-xs md:text-sm tracking-[0.25em] text-muted-foreground uppercase mb-4 md:mb-6">
                A BASE ORIGINAL
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-title text-foreground leading-tight mb-4 md:mb-6">
                OPEN ATTENTION MARKETS<br />
                FOR ENDANGERED SPECIES.
              </h1>
              
              {/* Subcaption with ELI5 toggle */}
              <div className="relative max-w-lg mx-auto mb-6 md:mb-8">
                <p className="text-muted-foreground text-sm md:text-base pr-12">
                  {eli5Mode 
                    ? "Holders of DNA tokens can combine different species to create original, CCO collectibles for art and GameFi"
                    : "DNA-based bio-digital resources for community-driven IP generation on Base."
                  }
                </p>
                <button
                  onClick={() => setEli5Mode(!eli5Mode)}
                  className={cn(
                    "absolute right-0 top-0 px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider transition-all",
                    eli5Mode 
                      ? "bg-primary/20 text-primary border border-primary/30" 
                      : "bg-muted/30 text-muted-foreground border border-border/50 hover:bg-muted/50"
                  )}
                >
                  eli5
                </button>
              </div>
              
              {/* Warplette Terminal */}
              <div className="max-w-2xl mx-auto w-full mb-6 md:mb-8">
                <WarplettTerminal />
              </div>
              
              {/* CTAs */}
              <div className="flex flex-row items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
                <a href="https://fcbc.fun/gallery" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="ghost" 
                    className="gap-2 px-6 md:px-8 py-3 h-11 md:h-12 text-sm font-cta border border-border/30 hover:bg-muted/20 text-foreground"
                  >
                    EXPLORE GALLERY
                  </Button>
                </a>
                <a 
                  href="https://00.fcbc.fun/get-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="ghost"
                    className="gap-2 px-6 md:px-8 py-3 h-11 md:h-12 text-sm font-cta border border-border/30 hover:bg-muted/20 text-foreground"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Ask Warplette
                  </Button>
                </a>
                <Link to="/participate">
                  <Button 
                    className="gap-2 px-8 md:px-12 py-3 h-11 md:h-12 text-sm font-cta bg-primary hover:bg-primary/90 text-primary-foreground animate-rainbow-glow"
                  >
                    BEGIN
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats Marquee Bar - End of Galaxy section */}
            <div className="relative py-4 border-t border-b border-border/30 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...marqueeStats, ...marqueeStats].map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 mx-4 md:mx-6">
                    <span className="text-lg md:text-2xl font-title text-foreground">{stat.value}</span>
                    <span className="text-xs text-muted-foreground uppercase">{stat.label}</span>
                    <span className="text-muted-foreground/30 mx-2">·</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Rest of content with CosmicBackground */}
        <div className="relative">
          <CosmicBackground starCount={60} />
          
          <div className="container max-w-6xl mx-auto px-4 relative z-10">
            {/* Featured Purebreeds - Double Row Marquee with Manual Swipe */}
            <section className="py-8 md:py-12">
              <h2 className="text-lg md:text-xl lg:text-2xl font-title text-foreground text-center md:text-left mb-4 md:mb-6">
                Featured <span className="text-primary">PureBreeds</span>
              </h2>
              
              {/* Row 1 - 7 species */}
              <div className="relative mb-4">
                <button 
                  onClick={() => scrollMarquee(row1Ref, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-muted/50 transition-colors hidden md:flex"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div 
                  ref={row1Ref}
                  className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {featuredPurebreeds.slice(0, 7).map((item) => (
                    <PurebreedCard key={`row1-${item.id}`} item={item} />
                  ))}
                </div>
                <button 
                  onClick={() => scrollMarquee(row1Ref, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-muted/50 transition-colors hidden md:flex"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* Row 2 - 7 species */}
              <div className="relative">
                <button 
                  onClick={() => scrollMarquee(row2Ref, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-muted/50 transition-colors hidden md:flex"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div 
                  ref={row2Ref}
                  className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {featuredPurebreeds.slice(7, 14).map((item) => (
                    <PurebreedCard key={`row2-${item.id}`} item={item} />
                  ))}
                </div>
                <button 
                  onClick={() => scrollMarquee(row2Ref, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-muted/50 transition-colors hidden md:flex"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>
            
            {/* How DNA Markets Work */}
            <section className="py-8">
              <h2 className="text-lg md:text-xl lg:text-2xl font-title text-foreground text-center md:text-left mb-4 md:mb-6">
                How DNA Markets <span className="text-primary">Work</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {howItWorks.map((item, index) => (
                  <div 
                    key={index}
                    className="glass-card rounded-xl p-4 md:p-5 group hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-title text-foreground">
                        {item.title.replace(item.highlight, '')}
                        <span className="text-primary">{item.highlight}</span>
                      </h3>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                <a 
                  href="https://00.fcbc.fun/get-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" className="gap-2 px-6 md:px-8 py-3 h-11 md:h-12 font-cta border border-border/30 hover:bg-muted/20">
                    <MessageSquare className="w-4 h-4" />
                    Ask Warplette
                  </Button>
                </a>
                <Link to="/participate">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 md:px-12 py-3 h-11 md:h-12 font-cta animate-rainbow-glow">
                    BEGIN
                  </Button>
                </Link>
              </div>
            </section>
            
            {/* Custody Hunting */}
            <section id="custody-hunting" className="py-8">
              <h2 className="text-lg md:text-xl lg:text-2xl font-title text-foreground text-center md:text-left mb-4 md:mb-6">
                Custody <span className="text-primary">Hunting</span>
              </h2>
              <SnapshotsAndCustodySection onViewHint={handleViewHint} />
            </section>
            
            {/* Ecosystem Products - Single Card with Navigation */}
            <section className="py-8">
              <h2 className="text-lg md:text-xl lg:text-2xl font-title text-foreground text-center md:text-left mb-4 md:mb-6">
                Ecosystem <span className="text-primary">Products</span>
              </h2>
              
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="p-5 md:p-6">
                  {/* Official Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs">
                      <Sparkles className="w-3 h-3" />
                      OFFICIAL
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-medium uppercase",
                      statusColors[selectedProduct.status]
                    )}>
                      {selectedProduct.status}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-title text-foreground mb-1">FyreApp {selectedProduct.id}</h3>
                  <a href="#" className="text-base text-primary hover:underline mb-2 block">{selectedProduct.name}</a>
                  <p className="text-sm text-muted-foreground mb-1">{selectedProduct.subtitle}</p>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mt-4 mb-6 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  
                  {/* CTA and Tags */}
                  <div className="flex items-center gap-3 mb-6">
                    <Button 
                      className={cn(
                        "flex-1 gap-2",
                        selectedProduct.status === 'coming' 
                          ? "bg-muted text-muted-foreground cursor-not-allowed" 
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      )}
                      disabled={selectedProduct.status === 'coming'}
                    >
                      {selectedProduct.status === 'coming' ? 'Coming Soon' : 'View'}
                      {selectedProduct.status !== 'coming' && <ExternalLink className="w-4 h-4" />}
                    </Button>
                    <a href="https://base.org" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="px-4">Base</Button>
                    </a>
                    <a href="https://warpcast.com/fcbc" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="px-4">FC</Button>
                    </a>
                  </div>
                  
                  {/* Level Dots - Navigation */}
                  <div className="flex items-center justify-center gap-2">
                    {ecosystemProducts.slice(0, 7).map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setSelectedProductIndex(index)}
                        className={cn(
                          "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-title border transition-all",
                          index === selectedProductIndex 
                            ? "bg-primary text-primary-foreground border-primary" 
                            : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50"
                        )}
                      >
                        {index}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Community Apps */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-title text-foreground text-center md:text-left mt-8 mb-4">
                Community <span className="text-primary">FyreApps</span>
              </h3>
              <div className="space-y-3 mb-6">
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
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs shrink-0"
                      disabled={app.status === 'coming'}
                    >
                      {app.status === 'coming' ? 'Soon' : 'View'}
                    </Button>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full gap-2 bg-muted/20 border-border/50 hover:bg-primary/10 hover:border-primary/30 mb-4"
              >
                + Apply as a FyreApp/FyreGame builder
              </Button>
              
              {/* Discord Community CTA */}
              <a 
                href="https://discord.gg/fcbc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="glass-card rounded-xl p-4 md:p-5 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <h4 className="text-sm font-title text-foreground mb-2">Join Our Discord Community</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Connect with Fyre Traders, Breeders, and Builders
                  </p>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-3 h-3" />
                    Join Discord
                  </Button>
                </div>
              </a>
            </section>
            
            {/* Fyre PureBreed Index - Centralized */}
            <section className="py-8">
              <h2 className="text-lg md:text-xl lg:text-2xl font-title text-foreground text-center mb-4 md:mb-6">
                Fyre <span className="text-primary">PureBreed</span> Index
              </h2>
              <FyrePureBreedIndex />
            </section>
            
            <p className="text-center text-xs text-muted-foreground mt-8 pb-12">
              DNA Markets is the first onchain genetic ecosystem for bio RWAs.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function PurebreedCard({ item }: { item: typeof featuredPurebreeds[0] }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden flex-shrink-0 w-[200px] md:w-[240px] snap-start">
      <div className="aspect-[16/10] bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-30">
          🧬
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-title text-foreground mb-1">{item.name}</h3>
        <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-destructive/10 text-destructive mb-2">
          {item.status}
        </span>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span>{item.mcap}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-primary" />
            <span>{item.holders}</span>
          </div>
        </div>
        
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8">
          Signal Attention
        </Button>
      </div>
    </div>
  );
}

interface SnapshotsProps {
  onViewHint: () => void;
}

function SnapshotsAndCustodySection({ onViewHint }: SnapshotsProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 30, seconds: 4 });
  
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
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Next Snapshot In
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
          <div key={item.label} className="glass-card rounded-xl p-3 text-center">
            <div className="text-2xl md:text-3xl font-title text-primary mb-1">
              {item.value}
            </div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Last Week Snapshots */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground">Last Snapshot Signals:</span>
        {snapshotTokens.map((token) => (
          <span 
            key={token}
            className="px-3 py-1.5 rounded-full bg-muted/30 border border-border/50 text-sm text-foreground font-cta"
          >
            {token}
          </span>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onViewHint}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        >
          VIEW HINT
        </Button>
      </div>
    </div>
  );
}

function FyrePureBreedIndex() {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-2">
        <p className="text-sm text-muted-foreground">Total Ecosystem Value</p>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="p-1 rounded-full hover:bg-muted/30 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      
      <div className="text-4xl md:text-5xl lg:text-6xl font-title text-foreground mb-2">
        6,290,151 <span className="text-primary">DNA</span>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="text-success">+72%</span>
        <span className="text-muted-foreground">last 24 hours</span>
      </div>
      
      {showInfo && (
        <div className="mt-4 p-4 rounded-lg bg-muted/20 animate-fade-in max-w-lg mx-auto">
          <p className="text-sm text-muted-foreground text-left">
            <strong className="text-foreground">How it's calculated:</strong> The Fyre PureBreed Index 
            aggregates the total market value of all active DNA tokens, weighted by Base Square 
            assignments and custody participation rates across all 234 species markets.
          </p>
        </div>
      )}
    </div>
  );
}