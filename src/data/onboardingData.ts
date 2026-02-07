import { Chapter } from '@/types/onboarding';

export const initialChapters: Chapter[] = [
  {
    id: 1,
    title: 'Get Onchain',
    isLocked: false,
    tasks: [
      {
        id: '1-0',
        title: 'Open FCBC.FUN',
        status: 'done',
        description: 'Welcome to FCBC! You\'re already here - claim your first reward.',
        actionType: 'scan_balance', // Instant completion
      },
      {
        id: '1-1',
        title: 'Connect your Wallet',
        status: 'active',
        description: 'Link your Base-compatible wallet to access the FCBC ecosystem.',
        actionType: 'connect_wallet',
      },
      {
        id: '1-2',
        title: 'Download a Base wallet',
        status: 'pending',
        description: 'Choose a wallet to securely store your assets. Submit your USDC address to complete.',
        tags: [
          { label: 'BaseApp', recommended: true },
          { label: 'Rabby' },
          { label: 'MetaMask' },
        ],
        actionType: 'submit_address',
      },
      {
        id: '1-3',
        title: 'Send USDC or ETH (Base)',
        status: 'pending',
        description: 'Fund your wallet with USDC or ETH on Base to start trading DNA tokens.',
        subtext: 'to your address',
        actionType: 'scan_balance',
      },
    ],
    bonusTasks: [
      {
        id: '1-b1',
        title: 'Download Zora',
        status: 'pending',
        link: 'https://zora.co/invite/fcbc',
        isBonus: true,
        isOptional: true,
      },
      {
        id: '1-b2',
        title: 'Follow us on FCBC Club',
        status: 'pending',
        link: 'https://zora.co/@fcbc',
        isBonus: true,
        isOptional: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Explore Bio-RWAs',
    isLocked: true,
    lockMessage: 'Locked until Chapter 1 complete',
    tasks: [
      {
        id: '2-1',
        title: 'Buy $Warplette Creator Coin',
        status: 'locked',
        description: 'Creator coins power the FCBC ecosystem and unlock exclusive perks.',
        hasInfo: true,
        infoText: 'Creator coins power the FCBC ecosystem',
        actionType: 'scan_warplette',
        scanAddress: '0x17d8d3c956a9b2d72257d7c9624cfcfd8ba8672b',
        link: 'https://warplet.co/warplette',
        linkText: 'Buy on Warplet',
      },
      {
        id: '2-2',
        title: 'Own Fyre Enzyme Consumable',
        status: 'locked',
        description: 'Enzymes are used to catalyze DNA breeding reactions.',
        hasInfo: true,
        infoText: 'NFTs that enhance breeding outcomes',
        actionType: 'scan_nft',
        scanCollection: 'https://opensea.io/collection/fcbrwa-enzyme',
        link: 'https://opensea.io/collection/fcbrwa-enzyme',
        linkText: 'View on OpenSea',
      },
      {
        id: '2-3',
        title: 'Assign a Base Square',
        status: 'locked',
        description: 'Signal attention to your favorite PureBreed by assigning Base Squares.',
        hasInfo: true,
        infoText: 'Base Squares represent your signal strength',
        link: 'https://fcbc.fun/gallery',
        linkText: 'Choose a PureBreed',
      },
      {
        id: '2-4',
        title: 'Own Fyre Oocyte Consumable',
        status: 'locked',
        description: 'Oocytes are premium breeding materials for rare hybrids.',
        hasInfo: true,
        link: 'https://opensea.io/collection/fcbrwa-oocyte',
        linkText: 'View on OpenSea',
      },
      {
        id: '2-5',
        title: 'Buy first DNA token',
        status: 'locked',
        description: 'Purchase any PureBreed DNA token to start your collection.',
        actionType: 'scan_dna_balance',
        link: 'https://fcbc.fun/gallery',
        linkText: 'Browse PureBreed Gallery',
      },
    ],
  },
  {
    id: 3,
    title: 'Connect with FCBC Club',
    isLocked: true,
    lockMessage: 'Locked until Chapter 2 complete',
    tasks: [
      {
        id: '3-1',
        title: 'Follow socials',
        status: 'locked',
        description: 'Stay updated with the latest announcements and community news.',
        subTasks: [
          { id: '3-1-a', title: 'Follow on X', link: 'https://x.com/fcbc_club', completed: false },
          { id: '3-1-b', title: 'Follow on BaseApp', link: 'https://base.app/fcbc', completed: false },
          { id: '3-1-c', title: 'Follow on Farcaster', link: 'https://warpcast.com/fcbc', completed: false },
          { id: '3-1-d', title: 'Follow on TikTok', link: 'https://tiktok.com/@fcbc', completed: false, optional: true },
        ],
      },
      {
        id: '3-2',
        title: 'Join Discord',
        status: 'locked',
        description: 'Connect with breeders, share strategies, and discover opportunities.',
        subtext: 'Introduce yourself. Share your favourite PureBreed.',
        actionType: 'submit_discord',
      },
      {
        id: '3-3',
        title: 'Explore Our FyreApps',
        status: 'locked',
        description: 'Discover ecosystem tools built for the FCBC community.',
        isOptional: true,
        subTasks: [
          { id: '3-3-a', title: 'Fyre Docs (FyreApp 0)', link: '#', completed: false },
          { id: '3-3-b', title: 'PureBreed Explorer (FyreApp 1)', link: '#', completed: false },
          { id: '3-3-c', title: 'Portfolio Manager (FyreApp 2)', link: '#', completed: false, optional: true },
          { id: '3-3-d', title: 'Custody & Snapshots (FyreApp 3)', link: '#', completed: false, optional: true },
          { id: '3-3-e', title: 'Fyre Labs (FyreApp 4)', link: '#', completed: false, optional: true },
          { id: '3-3-f', title: 'Fyre Arena (FyreApp 5)', link: '#', completed: false, optional: true },
          { id: '3-3-g', title: 'Fyre DEX (FyreApp 6)', link: '#', completed: false, optional: true },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Become FCBC Club Member',
    isLocked: true,
    lockMessage: 'Locked until Chapter 3 complete',
    tasks: [
      {
        id: '4-1',
        title: 'Start FyreBasePosting',
        status: 'locked',
        description: 'Earn 10 Fyre Keys daily by sharing your FCBC journey.',
        subtext: 'Submit 1 X link per day to claim',
        actionType: 'submit_link',
      },
      {
        id: '4-2',
        title: 'Add and use FyreApps',
        status: 'locked',
        description: 'Access ecosystem tools and grow your portfolio.',
        subTasks: [
          { id: '4-2-a', title: 'Share PureBreeds (FyreApp 1)', link: '#', completed: false },
          { id: '4-2-b', title: 'Play Fyre Millionaire (FyreApp 0)', link: '#', completed: false },
        ],
      },
      {
        id: '4-3',
        title: 'Collect 10k Fyre Keys',
        status: 'locked',
        description: 'Accumulate 10,000 Fyre Keys to unlock premium features.',
        actionType: 'scan_balance', // Auto-complete when balance hits 10k
      },
      {
        id: '4-4',
        title: 'Invite friends',
        status: 'locked',
        comingSoon: true,
        description: 'Referral rewards coming soon.',
      },
    ],
  },
  {
    id: 5,
    title: 'The Road Ahead',
    isLocked: true,
    lockMessage: 'Phase 2 - Coming Soon',
    tasks: [],
    roadmapItems: [
      'Portfolio tracking',
      'Snapshots and custody',
      'Fyre Labs',
      'Community FyreApp builders',
      'Cohort 1 launch',
    ],
  },
];

export interface FyreApp {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  status: 'demo' | 'beta' | 'live' | 'coming';
  isOfficial: boolean;
  creator?: string;
}

export const fyreApps: FyreApp[] = [
  { id: '0', name: 'Fyre Docs', subtitle: 'Onchain Knowledgebase', description: 'AI-native living knowledgebase. Ask anything in natural language. Learn via games and quizzes. Earn Fyre Keys. Share pages. Execute tasks.', status: 'demo', isOfficial: true },
  { id: '1', name: 'PureBreeds Explorer', subtitle: 'DNA Markets Gallery', description: 'Browse and discover DNA tokens', status: 'beta', isOfficial: true },
  { id: '2', name: 'Portfolio Manager', subtitle: 'Asset Tracking', description: 'Track your assets', status: 'coming', isOfficial: true },
  { id: '3', name: 'Custody Snapshots', subtitle: 'Snapshot Dashboards', description: 'Manage custody', status: 'coming', isOfficial: true },
  { id: '4', name: 'Fyre Labs', subtitle: 'Research Hub', description: 'Research and experiments', status: 'coming', isOfficial: true },
  { id: '5', name: 'Fyre Arena', subtitle: 'Custody Battleground', description: 'Compete and earn', status: 'coming', isOfficial: true },
];

export const communityFyreApps: FyreApp[] = [
  { id: 'c1', name: 'FyreHerald', subtitle: 'News Aggregator', description: 'News aggregator', status: 'live', isOfficial: false, creator: 'HawkNode' },
  { id: 'c2', name: 'Fyre DEX', subtitle: 'Bio-RWA Exchange', description: 'Uniswap-style exchange exclusively for bio-RWAs on Base. Earn 5x the Fyre Keys rewards and contest for weekly prizes.', status: 'coming', isOfficial: false, creator: 'JariusOS' },
];

export interface SnapshotToken {
  id: string;
  symbol: string;
}

export const lastWeekSnapshots: SnapshotToken[] = [
  { id: '1', symbol: '$FCBC121' },
  { id: '2', symbol: '$FCBC19' },
  { id: '3', symbol: '$FCBC56' },
  { id: '4', symbol: '$FCBC2' },
];