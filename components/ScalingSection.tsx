"use client";

import React from 'react';
import { Rocket, TrendingUp, ArrowUpRight } from 'lucide-react';

export const ScalingSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm mb-6">
                <Rocket size={18} />
                <span>Scaling From Purely Flex</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                The Intelligent Starting Point
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Experience all three services at moderate volume, discover where you get the most value, then scale. Purely Flex becomes your baseline while focused teams handle high-volume priorities.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-100 p-2 rounded-lg text-blue-600">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Growing recruiting needs?</h4>
                        <p className="text-sm text-slate-600">Add a Focused Recruiting Team for dedicated pipeline capacity.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="mt-1 bg-purple-100 p-2 rounded-lg text-purple-600">
                        <FileTextIcon />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Proposal volume increasing?</h4>
                        <p className="text-sm text-slate-600">Add a Focused Proposal Team to handle 10+ bids annually.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="mt-1 bg-emerald-100 p-2 rounded-lg text-emerald-600">
                        <CodeIcon />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900">Development backlog expanding?</h4>
                        <p className="text-sm text-slate-600">Add specialized developers for faster delivery.</p>
                    </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
                <div className="aspect-square bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center relative">
                    {/* Abstract Graphic for Scaling */}
                    <div className="relative w-full h-full p-8 flex items-end justify-center gap-4">
                        <div className="w-1/4 h-[40%] bg-slate-300 rounded-t-xl flex items-end justify-center pb-4 text-slate-500 font-bold text-xs">Flex</div>
                        <div className="w-1/4 h-[60%] bg-indigo-300 rounded-t-xl flex items-end justify-center pb-4 text-indigo-800 font-bold text-xs">Focused</div>
                        <div className="w-1/4 h-[90%] bg-indigo-600 rounded-t-xl flex items-end justify-center pb-4 text-white font-bold text-xs">Scale</div>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg px-6 py-3 rounded-full flex items-center gap-2 border border-indigo-50">
                             <ArrowUpRight className="text-indigo-600" />
                             <span className="font-bold text-slate-800">Prove Value First</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
)

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
)
