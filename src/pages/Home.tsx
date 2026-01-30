import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const featuredPurebreeds = [
  {
    id: 1,
    name: 'Nile Crocodile',
    status: 'ENDANGERED',
    region: 'Riverine',
    image: '/placeholder.svg',
    baseSquares: 98942,
  },
  {
    id: 2,
    name: 'Amur Tiger',
    status: 'ENDANGERED',
    region: 'Primorsky',
    image: '/placeholder.svg',
    baseSquares: 77240,
  },
  {
    id: 3,
    name: 'Amazon Catfish',
    status: 'ENDANGERED',
    region: 'Rainforest',
    image: '/placeholder.svg',
    baseSquares: 21308,
  },
];

const howItWorks = [
  {
    title: 'Buy DNA Tokens',
    highlight: 'DNA',
    description: 'Based on real species data. Line with Red List. Digital genomes for →',
    icon: '🧬',
  },
  {
    title: 'Assign Base Squares',
    highlight: 'Base Squares',
    description: 'Expand onchain footprint. Promote → what you signal.',
    icon: '📐',
  },
  {
    title: 'Custody to Earn',
    highlight: 'to Earn',
    description: 'Snapshot participation, shared IP exposure. Syndicated upside.',
    icon: '📊',
  },
  {
    title: 'Create HYBRIDS',
    highlight: 'HYBRIDS',
    description: 'Hyper-deflationary combine-and-burn mechanics that irreversibly generate rarity.',
    icon: '✨',
  },
];

const fyreAppsSpotlight = [
  { name: 'PureBreeds Explorer', subtitle: 'DNA Markets Gallery', icon: Plus },
  { name: 'Fyre Docs', subtitle: 'Onchain Knowledgebase', icon: Plus },
  { name: 'Fyre Arena', subtitle: 'Custody Battleground', icon: Plus },
  { name: 'Custody Snapshots', subtitle: 'Snapshot Dashboards', icon: Mail },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-20 pb-12">
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
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
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
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-8">
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-title text-foreground">234</span>
                <span className="text-xs text-muted-foreground uppercase ml-2">Markets</span>
              </div>
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-title text-foreground">362,782</span>
                <span className="text-xs text-muted-foreground uppercase ml-2">Base Squares</span>
              </div>
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-title text-foreground">$72M</span>
                <span className="text-xs text-muted-foreground uppercase ml-2">Market Cap</span>
              </div>
            </div>
          </section>
          
          {/* Featured Purebreeds */}
          <section className="py-8">
            <h2 className="text-lg font-title text-foreground uppercase tracking-wider mb-2">
              Featured Purebreeds
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              High signal species with active custody and 2 hybrid potential.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredPurebreeds.map((item) => (
                <div 
                  key={item.id}
                  className="glass-card rounded-xl overflow-hidden group"
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
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Base Squares</span>
                      <span className="text-sm font-title text-foreground">{item.baseSquares.toLocaleString()} ^</span>
                    </div>
                    <Button className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-9">
                      BUY & ASSIGN DNA
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* How DNA Markets Work */}
          <section className="py-8">
            <h2 className="text-lg font-title text-foreground uppercase tracking-wider mb-6">
              How DNA Markets <span className="text-muted-foreground font-normal">Work</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {howItWorks.map((item, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-title text-foreground mb-1">
                      {item.title.replace(item.highlight, '')}
                      <span className="text-primary">{item.highlight}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <span className="text-2xl">{item.icon}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Link to="/participate">
                <Button className="bg-secondary hover:bg-secondary/80 text-foreground px-8">
                  BEGIN
                </Button>
              </Link>
            </div>
          </section>
          
          {/* FyreApps Spotlight */}
          <section className="py-8">
            <h2 className="text-lg font-title text-foreground uppercase tracking-wider mb-6">
              FyreApps <span className="text-muted-foreground font-normal">Spotlight</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fyreAppsSpotlight.map((app, index) => (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <app.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-title text-foreground">{app.name.split(' ')[0]}</span>
                    <span className="text-primary text-sm">{app.name.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{app.subtitle}</p>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-7 px-4">
                    Enter
                  </Button>
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              DNA Markets is the first onchain genete ecosystem for bio RWAs.
            </p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Built on Zora by <Mail className="w-3 h-3 inline" /> <span className="text-primary">awarpfoate</span>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
