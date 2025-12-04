
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ContactFooter } from './components/ContactFooter';
import { Home } from './pages/Home';
import { PurelyFlex } from './pages/PurelyFlex';
import { FocusedDevelopment } from './pages/FocusedDevelopment';
import { FocusedRecruiting } from './pages/FocusedRecruiting';
import { FocusedProposals } from './pages/FocusedProposals';
import { MoleEasterEgg } from './components/MoleEasterEgg';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { LeadCaptureProvider } from './context/LeadCaptureContext';
import { Page } from './types';
import { trackHubSpotPageView } from './services/hubspotService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');

  // Track page views on navigation
  useEffect(() => {
    const pathMap: Record<Page, string> = {
        'HOME': '/',
        'FLEX': '/purely-flex',
        'DEV': '/focused-development',
        'RECRUITING': '/focused-recruiting',
        'PROPOSALS': '/focused-proposals'
    };
    trackHubSpotPageView(pathMap[currentPage]);
  }, [currentPage]);

  // Custom Scrollbar Logic
  useEffect(() => {
    const root = document.documentElement;
    let thumbStyle = '';
    let ffThumbColor = '';

    switch (currentPage) {
      case 'PROPOSALS':
        // #bd75f7 - Proposals
        thumbStyle = '#bd75f7';
        ffThumbColor = '#bd75f7';
        break;
      case 'DEV':
        // #54b684 - Development
        thumbStyle = '#54b684';
        ffThumbColor = '#54b684';
        break;
      case 'RECRUITING':
        // #5399f5 - Recruiting
        thumbStyle = '#5399f5';
        ffThumbColor = '#5399f5';
        break;
      case 'HOME':
      case 'FLEX':
      default:
        // Gradient: #5399f5 (Recruiting Blue) -> #bd75f7 (Proposals Purple) -> #54b684 (Dev Green)
        thumbStyle = 'linear-gradient(to bottom, #5399f5, #bd75f7, #54b684)';
        ffThumbColor = '#5399f5'; // Firefox fallback (first color)
        break;
    }

    // Update the new custom variables
    root.style.setProperty('--custom-scroll-thumb', thumbStyle);
    root.style.setProperty('--custom-scroll-ff-thumb', ffThumbColor);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'HOME': return <Home onNavigate={setCurrentPage} />;
      case 'FLEX': return <PurelyFlex />;
      case 'DEV': return <FocusedDevelopment />;
      case 'RECRUITING': return <FocusedRecruiting />;
      case 'PROPOSALS': return <FocusedProposals />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LeadCaptureProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        
        <main>
          {renderPage()}
        </main>

        <div id="contact">
          <ContactFooter />
        </div>

        <LeadCaptureModal />
        <MoleEasterEgg />
      </div>
    </LeadCaptureProvider>
  );
};

export default App;
