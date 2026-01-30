import { Chapter } from '@/types/onboarding';

export const initialChapters: Chapter[] = [
  {
    id: 1,
    title: 'Get Onchain',
    isLocked: false,
    tasks: [
      {
        id: '1-1',
        title: 'Open FCBC platform',
        status: 'done',
      },
      {
        id: '1-2',
        title: 'Download a Base wallet',
        status: 'active',
        tags: [
          { label: 'BaseApp', recommended: true },
          { label: 'Rabby' },
          { label: 'MetaMask' },
        ],
        actionButtons: [
          { label: 'Submit USDC address', action: 'submit_address' },
        ],
        warningLabel: 'Keep your login safe',
      },
      {
        id: '1-3',
        title: 'Connect your Wallet',
        status: 'pending',
      },
      {
        id: '1-4',
        title: 'Send USDC or ETH (Base)',
        status: 'pending',
        subtext: 'to your address',
        autoVerify: true,
      },
    ],
    bonusTasks: [
      {
        id: '1-b1',
        title: 'Download Zora',
        status: 'pending',
        link: 'https://zora.co/invite/fcbc',
        isBonus: true,
      },
      {
        id: '1-b2',
        title: 'Follow us on FCBC Club',
        status: 'pending',
        link: 'https://zora.co/@fcbc',
        isBonus: true,
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
        hasInfo: true,
        infoText: 'Creator coins power the FCBC ecosystem',
      },
      {
        id: '2-2',
        title: 'Own Fyre Enzyme Consumable',
        status: 'locked',
        hasInfo: true,
      },
      {
        id: '2-3',
        title: 'Own Fyre Oocyte Consumable',
        status: 'locked',
        hasInfo: true,
      },
      {
        id: '2-4',
        title: 'Buy first DNA token',
        status: 'locked',
        linkText: 'PureBreed Gallery',
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
        tags: [
          { label: 'X' },
          { label: 'BaseApp' },
          { label: 'Farcaster' },
          { label: 'TikTok' },
        ],
        socialVerify: true,
      },
      {
        id: '3-2',
        title: 'Join Discord',
        status: 'locked',
        subtext: 'Introduce yourself. Share your favourite PureBreed.',
        socialVerify: true,
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
        title: 'Add and use FyreApps',
        status: 'locked',
        subtext: '0, 1, 2…',
      },
      {
        id: '4-2',
        title: 'Optimize for snapshots',
        status: 'locked',
        hasInfo: true,
        infoText: 'Custody blindboxes, custody hunting',
      },
      {
        id: '4-3',
        title: 'Start FyreBasePosting',
        status: 'locked',
        subtext: 'Earn Fyre Keys - Submit 1 link per day',
        linkSubmit: true,
      },
      {
        id: '4-4',
        title: 'Share PureBreeds',
        status: 'locked',
        subtext: 'FyreApp 1',
      },
      {
        id: '4-5',
        title: 'Invite friends',
        status: 'locked',
        comingSoon: true,
      },
    ],
  },
  {
    id: 5,
    title: 'The Road Ahead',
    isLocked: true,
    lockMessage: 'Locked until Chapter 4 complete',
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
