import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { CRMState, Deal, ServiceSubscription } from '../types';
import { getNextStage, getPreviousStage, loadCRMState, persistCRMState } from '../services/crmService';

interface CRMContextType {
  state: CRMState;
  moveDealForward: (dealId: string) => void;
  moveDealBackward: (dealId: string) => void;
  updateSubscription: (subscription: ServiceSubscription) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CRMState>(() => loadCRMState());

  useEffect(() => {
    persistCRMState(state);
  }, [state]);

  const moveDeal = (dealId: string, direction: 'forward' | 'backward') => {
    setState((prev) => {
      const updatedDeals = prev.deals.map((deal: Deal) => {
        if (deal.id !== dealId) return deal;
        const nextStage = direction === 'forward' ? getNextStage(deal.stage) : getPreviousStage(deal.stage);
        return { ...deal, stage: nextStage };
      });
      return { ...prev, deals: updatedDeals };
    });
  };

  const moveDealForward = (dealId: string) => moveDeal(dealId, 'forward');
  const moveDealBackward = (dealId: string) => moveDeal(dealId, 'backward');

  const updateSubscription = (updated: ServiceSubscription) => {
    setState((prev) => {
      const exists = prev.subscriptions.find((sub) => sub.id === updated.id);
      const nextSubs = exists
        ? prev.subscriptions.map((sub) => (sub.id === updated.id ? updated : sub))
        : [...prev.subscriptions, updated];

      return { ...prev, subscriptions: nextSubs };
    });
  };

  const value = useMemo(
    () => ({
      state,
      moveDealForward,
      moveDealBackward,
      updateSubscription,
    }),
    [state]
  );

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
