import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ServiceCards } from '../components/ServiceCards';
import { InteractiveAllocator } from '../components/InteractiveAllocator';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { ComparisonSection } from '../components/ComparisonSection';
import { ScalingSection } from '../components/ScalingSection';
import { FAQ } from '../components/FAQ';
import { BubbleSection } from '../components/BubbleSection';
import { Sparkles } from 'lucide-react';

export const PurelyFlex: React.FC = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in">
      <Hero />
      
      <div id="services" className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 pt-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={12} /> The Intelligent Starting Point
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Access all three services. Flex as needed.</h2>
            <p className="text-lg text-slate-600">
                Not every company needs full dedicated teams from day one. 
                Purely Flex gives you access to Recruiting, Proposals, and Development with bandwidth that adapts month-to-month.
            </p>
        </div>
        <ServiceCards />
      </div>

      <div id="how-it-works">
        <InteractiveAllocator />
        <div className="bg-white py-12 text-center border-b border-slate-100">
            <p className="max-w-2xl mx-auto px-4 text-slate-500 italic">
                "Note: The monthly breakdown above is just one example. We work with you individually to find the right pathway that matches your business rhythm."
            </p>
        </div>
        <ProcessTimeline />
      </div>

      <div id="comparison">
        <ComparisonSection />
      </div>

      <ScalingSection />

      <BubbleSection />

      <div id="faq">
        <FAQ />
      </div>
    </div>
  );
};
