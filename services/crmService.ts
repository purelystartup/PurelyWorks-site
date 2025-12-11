import { CRMState, LifecycleStage, ServiceLine, TeamShareAllocation } from '../types';

const STORAGE_KEY = 'purely-works-crm-state-v1';

const defaultAllocations: Record<ServiceLine, TeamShareAllocation> = {
  'Purely Flex': { fullStack: 0.5, pm: 0.5, recruiter: 0.5 },
  Proposals: { proposalWriter: 1, designer: 1 },
  Development: { fullStack: 1, aiEngineer: 0.5, pm: 0.5 },
  Recruiting: { recruiter: 1 },
  'AI Advisory': { aiEngineer: 0.5 },
  Marketing: { designer: 0.5 },
};

export const defaultCRMState: CRMState = {
  organizations: [
    {
      id: 'cm-solutions',
      name: 'CM Solutions',
      industry: 'Construction Management',
      stage: 'Delivery',
      accountOwner: 'Hassan (COO)',
      region: 'US',
      baseMRR: 12000,
      tags: ['Reseller', 'Purely Flex', 'Construction'],
    },
    {
      id: 'velocity-builders',
      name: 'Velocity Builders',
      industry: 'Government Contracting',
      stage: 'Proposal Development',
      accountOwner: 'Anum (CEO)',
      region: 'US',
      baseMRR: 7000,
      tags: ['Proposals', 'Federal'],
    },
    {
      id: 'summit-tech',
      name: 'Summit Tech',
      industry: 'SaaS',
      stage: 'Onboarding',
      accountOwner: 'Ameer (CTO)',
      region: 'US',
      baseMRR: 6000,
      tags: ['Development', 'AI Advisory'],
    },
    {
      id: 'northern-grid',
      name: 'Northern Grid',
      industry: 'Energy',
      stage: 'Qualification',
      accountOwner: 'Kiran (Sales)',
      region: 'Canada',
      baseMRR: 5000,
      tags: ['Recruiting'],
    },
  ],
  contacts: [
    {
      id: 'contact-1',
      name: 'Laura Kim',
      title: 'VP Operations',
      email: 'laura.kim@cmsolutions.com',
      organizationId: 'cm-solutions',
      role: 'Decision Maker',
      phone: '+1 917 555 0100',
    },
    {
      id: 'contact-2',
      name: 'Carlos Rivera',
      title: 'Proposal Director',
      email: 'crivera@velocity.builders',
      organizationId: 'velocity-builders',
      role: 'Influencer',
    },
    {
      id: 'contact-3',
      name: 'Hiba Farooq',
      title: 'Head of Engineering',
      email: 'hiba@summit.tech',
      organizationId: 'summit-tech',
      role: 'Decision Maker',
    },
  ],
  deals: [
    {
      id: 'deal-1',
      organizationId: 'northern-grid',
      stage: 'Lead Generation',
      value: 5000,
      closeProbability: 20,
      targetClose: '2025-02-10',
      services: ['Recruiting'],
    },
    {
      id: 'deal-2',
      organizationId: 'velocity-builders',
      stage: 'Proposal Development',
      value: 15000,
      closeProbability: 60,
      targetClose: '2025-02-28',
      services: ['Proposals', 'AI Advisory'],
    },
    {
      id: 'deal-3',
      organizationId: 'summit-tech',
      stage: 'Onboarding',
      value: 6000,
      closeProbability: 90,
      targetClose: '2025-01-30',
      services: ['Development', 'AI Advisory'],
    },
    {
      id: 'deal-4',
      organizationId: 'cm-solutions',
      stage: 'Delivery',
      value: 12000,
      closeProbability: 100,
      targetClose: '2024-12-01',
      services: ['Purely Flex', 'Recruiting'],
    },
  ],
  subscriptions: [
    {
      id: 'sub-1',
      organizationId: 'cm-solutions',
      serviceLine: 'Purely Flex',
      pricingModel: 'Retainer',
      monthlyRate: 8000,
      termMonths: 12,
      shareAllocation: defaultAllocations['Purely Flex'],
      notes: 'CM base preset with reseller commission',
    },
    {
      id: 'sub-2',
      organizationId: 'cm-solutions',
      serviceLine: 'Recruiting',
      pricingModel: 'Retainer',
      monthlyRate: 4000,
      termMonths: 6,
      shareAllocation: defaultAllocations['Recruiting'],
    },
    {
      id: 'sub-3',
      organizationId: 'velocity-builders',
      serviceLine: 'Proposals',
      pricingModel: 'Bundle',
      monthlyRate: 4000,
      termMonths: 3,
      shareAllocation: defaultAllocations['Proposals'],
      discount: 0.1,
      notes: 'Three-proposal bundle',
    },
    {
      id: 'sub-4',
      organizationId: 'summit-tech',
      serviceLine: 'Development',
      pricingModel: 'Retainer',
      monthlyRate: 6000,
      termMonths: 6,
      shareAllocation: defaultAllocations['Development'],
    },
    {
      id: 'sub-5',
      organizationId: 'summit-tech',
      serviceLine: 'AI Advisory',
      pricingModel: 'Retainer',
      monthlyRate: 2000,
      termMonths: 3,
      shareAllocation: defaultAllocations['AI Advisory'],
    },
  ],
  resellers: [
    {
      id: 'reseller-1',
      name: 'CM Solutions',
      commissionPerPackage: 1500,
      presets: ['CM Base', 'Intro Flex'],
      clients: ['cm-solutions'],
    },
    {
      id: 'reseller-2',
      name: 'AEC Partners',
      commissionPerPackage: 1000,
      presets: ['AEC Standard'],
      clients: ['velocity-builders'],
    },
  ],
  integrations: [
    { id: 'hubspot', name: 'HubSpot', status: 'Connected', notes: 'Capturing page views and leads' },
    { id: 'stripe', name: 'Stripe', status: 'Planned', notes: 'Needed for retainer billing automation' },
    { id: 'linear', name: 'Linear', status: 'Connected', notes: 'Sprint burndown sync for delivery' },
    { id: 'clickup', name: 'ClickUp', status: 'Connected', notes: 'Proposal + recruiting workstreams' },
    { id: 'notion', name: 'Notion', status: 'Connected', notes: 'Knowledge base and SOP sync' },
    { id: 'docusign', name: 'DocuSign', status: 'Planned', notes: 'Standard MSA/SOW signature flow' },
    { id: 'slack', name: 'Slack', status: 'Connected', notes: 'Channel automation per client' },
  ],
};

const isBrowser = typeof window !== 'undefined';

export const loadCRMState = (): CRMState => {
  if (isBrowser) {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as CRMState;
    }
  }
  return defaultCRMState;
};

export const persistCRMState = (state: CRMState) => {
  if (isBrowser) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
};

export const transitionOrder: LifecycleStage[] = [
  'Lead Generation',
  'Qualification',
  'Discovery',
  'Proposal Development',
  'Contracting',
  'Onboarding',
  'Delivery',
];

export const getNextStage = (stage: LifecycleStage): LifecycleStage => {
  const currentIndex = transitionOrder.indexOf(stage);
  return currentIndex < transitionOrder.length - 1 ? transitionOrder[currentIndex + 1] : stage;
};

export const getPreviousStage = (stage: LifecycleStage): LifecycleStage => {
  const currentIndex = transitionOrder.indexOf(stage);
  return currentIndex > 0 ? transitionOrder[currentIndex - 1] : stage;
};
