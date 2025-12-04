import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LeadCaptureContextType {
  isModalOpen: boolean;
  openLeadCapture: () => void;
  closeLeadCapture: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined);

export const LeadCaptureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLeadCapture = () => setIsModalOpen(true);
  const closeLeadCapture = () => setIsModalOpen(false);

  return (
    <LeadCaptureContext.Provider value={{ isModalOpen, openLeadCapture, closeLeadCapture }}>
      {children}
    </LeadCaptureContext.Provider>
  );
};

export const useLeadCapture = () => {
  const context = useContext(LeadCaptureContext);
  if (context === undefined) {
    throw new Error('useLeadCapture must be used within a LeadCaptureProvider');
  }
  return context;
};