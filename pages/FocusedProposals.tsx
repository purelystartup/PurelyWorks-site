import React, { useEffect, useState } from 'react';
import { generateNanoImage } from '../services/geminiService';
import { ScrollReveal } from '../components/ScrollReveal';
import { ServiceTiers, Tier } from '../components/ServiceTiers';
import { FileText, PenTool, Layout, Database, Award, Clock } from 'lucide-react';

const PROPOSAL_TIERS: Tier[] = [
    {
        name: "Core Proposal Team",
        share: "2 FTE",
        description: "Full project coordination and deadline management for standard volume needs.",
        features: [
            "Up to 2 concurrent proposals",
            "Full technical writing & compliance",
            "Custom graphic design & layout",
            "Database organization of past projects",
            "Win theme development"
        ],
        perfectFor: ["Construction Firms", "GovCon SMBs", "Consultancies"]
    },
    {
        name: "Professional Proposal Team",
        share: "3-4 FTE",
        description: "Enhanced capacity for larger firms or peak RFP seasons needing faster turnaround.",
        features: [
            "Up to 4 concurrent proposals",
            "Additional writer/designer capacity",
            "Infographic & Visual Storytelling focus",
            "RFP 'Go/No-Go' Strategy sessions",
            "Expanded capacity for RFP season"
        ],
        perfectFor: ["Mid-Market Enterprise", "High-Volume Bidders"]
    },
     {
        name: "Enterprise Proposal Team",
        share: "6+ FTE",
        description: "A complete proposal department replacement for high-stakes bidding.",
        features: [
            "5+ concurrent proposals",
            "Dedicated account strategist",
            "Priority rush capability",
            "Full department replacement",
            "Complex multi-volume submission management"
        ],
        perfectFor: ["Large Enterprise", "Global Agencies"]
    }
];

export const FocusedProposals: React.FC = () => {
    const [bgImage, setBgImage] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
           const img = await generateNanoImage("Close up of high end fountain pen on document, organized chaos of strategy papers, warm lighting, professional, winning atmosphere, photorealistic");
           if (img) setBgImage(img);
        };
        if (process.env.API_KEY) init();
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-bold mb-8">
                            <FileText size={16} />
                            Focused Proposal Teams
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                            Win More <br/>
                            <span className="text-purple-400">Government & Enterprise Bids</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-light">
                            We handle the compliance matrix, the technical writing, and the graphic design so you can focus on the strategy.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            <section className="py-20 -mt-10 relative z-20">
                 <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="text-center p-4">
                            <div className="text-4xl font-bold text-purple-600 mb-2">15 Days</div>
                            <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Typical Turnaround</p>
                            <p className="text-slate-400 text-sm mt-2">For 20-25 page standard proposals</p>
                        </div>
                        <div className="text-center p-4">
                             <div className="text-4xl font-bold text-purple-600 mb-2">Compliance</div>
                            <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Matrix Guaranteed</p>
                            <p className="text-slate-400 text-sm mt-2">We parse the RFP so you don't miss a req</p>
                        </div>
                        <div className="text-center p-4">
                             <div className="text-4xl font-bold text-purple-600 mb-2">100% Owned</div>
                            <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Content Library</p>
                            <p className="text-slate-400 text-sm mt-2">We organize your past wins in your database</p>
                        </div>
                    </div>
                 </div>
            </section>

            <ServiceTiers tiers={PROPOSAL_TIERS} colorTheme="purple" />

            {/* Team Composition */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900">Your Dedicated Bid Machine</h2>
                            <p className="text-slate-600 mt-4">Who is actually doing the work?</p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ScrollReveal delay={0}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                    <PenTool />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Technical Writer</h3>
                                <p className="text-slate-600 text-sm">Translates your SME's rough notes into compliant, persuasive, professional prose. Manages the voice and tone.</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                    <Layout />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Graphic Designer</h3>
                                <p className="text-slate-600 text-sm">Transforms dense text into infographics, callout boxes, and clean layouts that win points for readability.</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                                    <Clock />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Project Coordinator</h3>
                                <p className="text-slate-600 text-sm">Manages the timeline, collects inputs, handles RFI responses, and ensures on-time submission.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

        </div>
    );
};