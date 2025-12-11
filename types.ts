import React from 'react';

export type Page = 'HOME' | 'FLEX' | 'DEV' | 'RECRUITING' | 'PROPOSALS' | 'CRM';

export interface AllocationState {
  recruiting: number;
  proposals: number;
  development: number;
}

export interface MonthScenario {
  month: string;
  title: string;
  description: string;
  allocation: AllocationState;
  imagePrompt: string;
}

export interface ServiceDetail {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
}

export type LifecycleStage =
  | 'Lead Generation'
  | 'Qualification'
  | 'Discovery'
  | 'Proposal Development'
  | 'Contracting'
  | 'Onboarding'
  | 'Delivery';

export type ServiceLine =
  | 'Purely Flex'
  | 'Proposals'
  | 'Development'
  | 'Recruiting'
  | 'AI Advisory'
  | 'Marketing';

export interface Organization {
  id: string;
  name: string;
  industry: string;
  stage: LifecycleStage;
  accountOwner: string;
  region: string;
  baseMRR: number;
  tags: string[];
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  organizationId: string;
  role: 'Decision Maker' | 'Influencer' | 'User';
}

export interface TeamShareAllocation {
  fullStack?: number;
  aiEngineer?: number;
  devOps?: number;
  pm?: number;
  proposalWriter?: number;
  designer?: number;
  recruiter?: number;
}

export interface ServiceSubscription {
  id: string;
  organizationId: string;
  serviceLine: ServiceLine;
  pricingModel: 'Retainer' | 'Project' | 'Bundle';
  monthlyRate: number;
  termMonths: number;
  shareAllocation?: TeamShareAllocation;
  discount?: number;
  notes?: string;
}

export interface Deal {
  id: string;
  organizationId: string;
  stage: LifecycleStage;
  value: number;
  closeProbability: number;
  targetClose: string;
  services: ServiceLine[];
}

export interface ResellerAccount {
  id: string;
  name: string;
  commissionPerPackage: number;
  presets: string[];
  clients: string[];
}

export interface IntegrationStatus {
  id: string;
  name: string;
  status: 'Connected' | 'Action Needed' | 'Planned';
  notes: string;
}

export interface CRMState {
  organizations: Organization[];
  contacts: Contact[];
  deals: Deal[];
  subscriptions: ServiceSubscription[];
  resellers: ResellerAccount[];
  integrations: IntegrationStatus[];
}
