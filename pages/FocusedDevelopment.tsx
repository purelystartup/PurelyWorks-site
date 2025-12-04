import React, { useEffect, useState } from 'react';
import { generateNanoImage } from '../services/geminiService';
import { ScrollReveal } from '../components/ScrollReveal';
import { ServiceTiers, Tier } from '../components/ServiceTiers';
import { Code2, Cpu, GitBranch, Terminal, CheckCircle2, Server, Lock, FolderGit2 } from 'lucide-react';

const DEV_TIERS: Tier[] = [
    {
        name: "Proof of Concept",
        share: "0.5 FTE",
        description: "Single developer building small scripts, POCs, and validation tools. Perfect for testing the relationship.",
        features: [
            "Rapid prototyping & validation",
            "Automation scripts",
            "Establishes ROI quickly",
            "Low risk starting point"
        ],
        perfectFor: ["Innovation Labs", "Startups", "Internal Tooling"]
    },
    {
        name: "Core Development (Half Share)",
        share: "1.25 FTE",
        description: "Technical Project Manager + Lead Developer + Flexible Specialist. Handles ongoing improvements.",
        features: [
            "Technical Architecture leadership",
            "Sprint planning & tracking",
            "QA & Code Review",
            "Flexible specialization"
        ],
        perfectFor: ["SaaS Maintenance", "Workflow Automation", "Integrations"]
    },
    {
        name: "Core Development (Full Share)",
        share: "2.5 FTE",
        description: "Double capacity. Ideal for substantial backlogs or multiple concurrent projects.",
        features: [
            "Dedicated full-stack pod",
            "Faster velocity on complex builds",
            "Parallel feature development",
            "Comprehensive documentation"
        ],
        perfectFor: ["Product Launches", "Digital Transformation", "Scale-ups"]
    },
    {
        name: "Professional Development",
        share: "Custom",
        description: "Core team + multiple specialists. Department-replacement capacity for complex systems.",
        features: [
            "Multiple concurrent projects",
            "Mixed specializations (AI, Salesforce, Data)",
            "Dedicated technical leadership",
            "24/7 potential coverage"
        ],
        perfectFor: ["Enterprise Systems", "Major Platform Builds"]
    }
];

export const FocusedDevelopment: React.FC = () => {
    const [bgImage, setBgImage] = useState<string | null>(null);

    useEffect(() => {
        const init = async () => {
           const img = await generateNanoImage("Futuristic data center interior, matrix code overlay, emerald and deep blue lighting, cinematic depth of field, high tech engineering environment");
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-bold mb-8">
                            <Code2 size={16} />
                            Focused Development Teams
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={100}>
                        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                            Ship Faster with <br/>
                            <span className="text-emerald-400">AI-Augmented Engineers</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-light">
                            Dedicated full-stack pods that integrate directly into your workflow. 
                            We bring the CTO-level oversight and the AI-native tooling to accelerate your roadmap.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Security & Env */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-emerald-100 p-2 rounded-lg text-emerald-700"><FolderGit2 size={20} /></div>
                            <div>
                                <h3 className="font-bold text-slate-900">Your Repositories</h3>
                                <p className="text-sm text-slate-600">Code lives in your GitHub/GitLab. You own the history.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-emerald-100 p-2 rounded-lg text-emerald-700"><Server size={20} /></div>
                            <div>
                                <h3 className="font-bold text-slate-900">Your Infrastructure</h3>
                                <p className="text-sm text-slate-600">AWS, Azure, GCP. We deploy to your environments.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="mt-1 bg-emerald-100 p-2 rounded-lg text-emerald-700"><Lock size={20} /></div>
                            <div>
                                <h3 className="font-bold text-slate-900">100% IP Ownership</h3>
                                <p className="text-sm text-slate-600">Work for hire. No licensing fees. You own the code.</p>
                            </div>
                        </div>
                     </div>
                </div>
            </section>

            <ServiceTiers tiers={DEV_TIERS} colorTheme="emerald" />

            {/* Tech Stack Interactive Visual */}
            <section className="py-24 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <ScrollReveal>
                            <h2 className="text-4xl font-bold mb-6">Built for Velocity</h2>
                            <p className="text-lg text-slate-400 mb-8">
                                Our teams aren't just "staff aug". They are cohesive units trained in modern AI-assisted development workflows.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Zero-ramp onboarding via standardized documentation",
                                    "AI-Pair Programming for 30% faster delivery",
                                    "Automated QA & CI/CD pipelines built-in",
                                    "Weekly sprint velocity tracking & reporting"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 mt-1" size={20} />
                                        <span className="text-slate-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-black/40 rounded-2xl p-8 shadow-2xl border border-slate-700 relative backdrop-blur-sm">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="font-mono text-emerald-400 mb-4 flex items-center gap-2 border-b border-slate-800 pb-4">
                                    <Terminal size={18} />
                                    <span>pod_config.json</span>
                                </div>
                                <div className="font-mono text-sm space-y-2">
                                    <div className="text-purple-400">const <span className="text-yellow-300">FocusedTeam</span> = {'{'}</div>
                                    <div className="pl-4 text-blue-300">lead: <span className="text-orange-300">"Senior Architect"</span>,</div>
                                    <div className="pl-4 text-blue-300">engineers: <span className="text-white">[</span></div>
                                    <div className="pl-8 text-slate-500">// Full Stack + AI Specialization</div>
                                    <div className="pl-8 text-orange-300">"Frontend (React/Next)"<span className="text-white">,</span></div>
                                    <div className="pl-8 text-orange-300">"Backend (Node/Python)"<span className="text-white">,</span></div>
                                    <div className="pl-8 text-orange-300">"AI Integration Specialist"</div>
                                    <div className="pl-4 text-white">],</div>
                                    <div className="pl-4 text-blue-300">velocity_multiplier: <span className="text-emerald-400">1.5</span></div>
                                    <div className="text-purple-400">{'}'};</div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center">
                                    <div className="text-xs text-slate-500 uppercase tracking-widest">Status</div>
                                    <div className="text-xs font-bold text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-full animate-pulse">
                                        READY TO DEPLOY
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Core Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Cpu />, title: "AI Integration", desc: "LLM implementation, RAG pipelines, and agentic workflows." },
                            { icon: <GitBranch />, title: "Modern Web", desc: "React, Next.js, TypeScript, and scalable cloud architecture." },
                            { icon: <Terminal />, title: "Systems Engineering", desc: "API design, microservices, and robust backend logic." }
                        ].map((card, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="bg-slate-50 p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-slate-900 mb-6 mx-auto shadow-sm">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                                    <p className="text-slate-600">{card.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};