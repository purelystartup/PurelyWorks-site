import React from 'react';

export type Page = 'HOME' | 'FLEX' | 'DEV' | 'RECRUITING' | 'PROPOSALS';

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
