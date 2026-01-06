"use client";

import React, { useEffect, useState } from 'react';
import { generateNanoImage } from '../services/geminiService';
import { ScrollReveal } from '../components/ScrollReveal';
import { ServiceTiers, Tier } from '../components/ServiceTiers';
import { Users, Search, Globe, TrendingUp, Target, BrainCircuit, ArrowRight } from 'lucide-react';
import { useLeadCapture } from '../context/LeadCaptureContext';

const RECRUITING_TIERS: Tier[] = [
    {
        name: "Core Recruiting",
        share: "0.5 Share",
        description: "Perfect for maintaining a consistent hiring pipeline without the overhead of a full-time recruiter.",
        features: [
            "Custom AI scoring models calibrated to your culture",
            "Weekly candidate pipeline reviews",
            "Direct integration with hiring workflow",
            "3-4 concurrent open positions",
            "Weekly sourcing sprints"
        ],
        perfectFor: ["Seed/Series A Startups", "Boutique Agencies", "Steady-state hiring"]
    },
    {
        name: "Professional Recruiting",
        share: "1 Share",
        description: "A fully dedicated recruiting engine for growth-stage companies needing to fill multiple roles simultaneously.",
        features: [
            "4-6 concurrent open positions",
            "Enhanced sourcing across specialty platforms",
            "Bi-weekly strategic planning sessions",
            "Dedicated account coordinator",
            "Employer branding consultation"
        ],
        perfectFor: ["High-growth Scaleups", "Department build-outs", "Hard-to-fill technical roles"]
    }
];

export const FocusedRecruiting: React.FC = () => {
    const [bgImage, setBgImage] = useState<string | null>(null);
    const { openLeadCapture } = useLeadCapture();

    useEffect(() => {
        const init = async () => {
           const img = await generateNanoImage("Global network of professionals, abstract map connections, warm orange and blue lighting, human-centric corporate photography, 8k");
           if (img) setBgImage(img);
        };
        if (process.env.NEXT_PUBLIC_GEMINI_ENABLED === 'true') init();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="relative pt-40 pb-24 px-4 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0">
                    {bgImage && (
                        <div 
                            className="absolute inset-0 bg-cover bg-center opacity-20 animate-fade-in"
                            style={{ backgroundImage: `url(${bgImage})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-bold mb-8">
                            <Users size={16} />
                            Focused Recruiting Teams
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                            Pipeline as a <br/>
                            <span className="text-blue-400">Strategic Advantage</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-light">
                            A dedicated recruiting engine that becomes a seamless extension of your talent acquisition process.
                            Stop relying on transactional headhunters.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* What You Get */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <ScrollReveal delay={0}>
                            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <BrainCircuit size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI-Powered Scoring</h3>
                            <p className="text-slate-600">Each candidate ranked based on your custom cultural and technical criteria before you see them.</p>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                             <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Target size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Active Headhunting</h3>
                            <p className="text-slate-600">We don't just post jobs. We hunt across LinkedIn, Indeed, and specialty platforms for passive talent.</p>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                             <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Human Vetting</h3>
                            <p className="text-slate-600">First-round behavioral and cultural interviews conducted by us to filter for the intangibles.</p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <ServiceTiers tiers={RECRUITING_TIERS} colorTheme="blue" />

            {/* Process Interactive */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-5xl mx-auto px-4">
                    <ScrollReveal>
                        <div className="text-center mb-20">
                            <h2 className="text-3xl font-bold">The Sourcing Engine</h2>
                            <p className="text-slate-400 mt-4">How we find the 1% that matches your DNA.</p>
                        </div>
                    </ScrollReveal>

                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 md:-translate-x-1/2"></div>
                        
                        {[
                            { title: "Deep Discovery", desc: "We dive deep into your tech stack, culture, and non-negotiables to define the scorecard.", icon: <Search /> },
                            { title: "Active Sourcing", desc: "Our team hunts across multiple platforms simultaneously (LinkedIn, Github, Behance).", icon: <Globe /> },
                            { title: "AI Calibration", desc: "Candidates are scored against your ideal profile. We learn from your feedback to improve accuracy.", icon: <BrainCircuit /> },
                            { title: "Quality Delivery", desc: "You meet only top-tier, pre-qualified candidates. We manage the offer and closing.", icon: <TrendingUp /> }
                        ].map((step, i) => (
                            <ScrollReveal key={i} delay={i * 150} className="mb-16 relative flex flex-col md:flex-row items-center group">
                                <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:ml-0 md:mr-auto md:text-right' : 'md:ml-auto md:mr-0 md:text-left'} pl-20 md:pl-0 w-full`}>
                                     <div className={`hidden md:flex items-center gap-4 mb-2 ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                        {i % 2 !== 0 && <div className="w-10 h-10 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center border border-blue-500/30">{step.icon}</div>}
                                        <h3 className="text-xl font-bold text-blue-400">{step.title}</h3>
                                        {i % 2 === 0 && <div className="w-10 h-10 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center border border-blue-500/30">{step.icon}</div>}
                                     </div>
                                     {/* Mobile Header */}
                                      <div className="flex md:hidden items-center gap-4 mb-2 absolute left-0 top-0">
                                         <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-blue-500 z-10 flex items-center justify-center text-blue-400">{step.icon}</div>
                                      </div>
                                      <h3 className="text-xl font-bold text-blue-400 md:hidden mb-2">{step.title}</h3>

                                    <p className="text-slate-300 leading-relaxed">{step.desc}</p>
                                </div>
                                
                                {/* Center Dot Desktop */}
                                <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] hidden md:block z-10"></div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

             <section className="py-20 bg-blue-600 text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Ready to build your dream team?</h2>
                    <p className="text-xl mb-8 opacity-90">6-8 weeks to fully calibrate. Candidate flow begins within first week.</p>
                    <button 
                        onClick={openLeadCapture}
                        className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors gap-2 shadow-xl"
                    >
                        Start Hiring <ArrowRight size={20} />
                    </button>
                </div>
            </section>
        </div>
    );
};
