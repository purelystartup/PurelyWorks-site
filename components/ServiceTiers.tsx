import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export interface Tier {
  name: string;
  share: string;
  description: string;
  features: string[];
  perfectFor?: string[];
}

interface ServiceTiersProps {
  tiers: Tier[];
  colorTheme: 'indigo' | 'blue' | 'emerald' | 'purple';
}

export const ServiceTiers: React.FC<ServiceTiersProps> = ({ tiers, colorTheme }) => {
  const [activeTier, setActiveTier] = useState(0);

  const getColor = (opacity = 100) => {
    switch (colorTheme) {
      case 'blue': return `bg-blue-600/${opacity} text-blue-600`;
      case 'emerald': return `bg-emerald-600/${opacity} text-emerald-600`;
      case 'purple': return `bg-purple-600/${opacity} text-purple-600`;
      default: return `bg-indigo-600/${opacity} text-indigo-600`;
    }
  };
  
  const getBorderColor = () => {
      switch (colorTheme) {
      case 'blue': return `border-blue-200 hover:border-blue-400`;
      case 'emerald': return `border-emerald-200 hover:border-emerald-400`;
      case 'purple': return `border-purple-200 hover:border-purple-400`;
      default: return `border-indigo-200 hover:border-indigo-400`;
    }
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Tiers</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose the capacity that fits your current stage. Scale up or down as needs change.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Controls */}
          <div className="lg:col-span-4 space-y-4">
            {tiers.map((tier, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTier(idx)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 border-2 group ${
                  activeTier === idx 
                    ? `bg-white shadow-xl ${getBorderColor()} border-transparent ring-2 ring-offset-2 ring-offset-slate-50 ring-opacity-50 scale-[1.02]` 
                    : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-lg font-bold ${activeTier === idx ? 'text-slate-900' : 'text-slate-500'}`}>
                    {tier.name}
                  </h3>
                  {activeTier === idx && <ChevronRight size={20} className={getColor(100).split(' ')[1]} />}
                </div>
                <p className={`text-sm font-mono ${activeTier === idx ? getColor(100).split(' ')[1] : 'text-slate-400'}`}>
                  {tier.share}
                </p>
              </button>
            ))}
          </div>

          {/* Content Display */}
          <div className="lg:col-span-8">
             <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 min-h-[500px] relative overflow-hidden transition-all duration-500">
                {/* Background blob */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 -mr-32 -mt-32 transition-colors duration-500 ${getColor(100).split(' ')[0]}`} />
                
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h3 className="text-3xl font-bold text-slate-900">{tiers[activeTier].name}</h3>
                            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-bold bg-slate-100 ${getColor(100).split(' ')[1]}`}>
                                {tiers[activeTier].share}
                            </span>
                        </div>
                        <div className="hidden md:block w-16 h-1 bg-slate-100 rounded-full"></div>
                    </div>

                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        {tiers[activeTier].description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                        {tiers[activeTier].features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                                <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${getColor(10).split(' ')[0]}`}>
                                    <Check size={12} className={getColor(100).split(' ')[1]} />
                                </div>
                                <span className="text-slate-700 text-sm font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {tiers[activeTier].perfectFor && (
                        <div className="mt-8 pt-8 border-t border-slate-100 animate-fade-in-up">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Perfect For</h4>
                            <ul className="space-y-2">
                                {tiers[activeTier].perfectFor?.map((item, i) => (
                                    <li key={i} className="text-sm text-slate-500 flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${getColor(100).split(' ')[0]}`}></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};