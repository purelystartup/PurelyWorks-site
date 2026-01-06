"use client";

import React from 'react';
import { Users, FileText, Code2, CheckCircle2 } from 'lucide-react';

const services = [
  {
    id: 'recruiting',
    title: 'Recruiting Services',
    icon: <Users className="w-8 h-8 text-blue-600" />,
    color: 'bg-blue-50 border-blue-100',
    points: [
      'Support for 1-2 open positions',
      'AI-powered candidate scoring',
      'Sourcing on LinkedIn & Indeed',
      'Cultural fit analysis',
      'ATS Integration'
    ]
  },
  {
    id: 'proposals',
    title: 'Proposal Services',
    icon: <FileText className="w-8 h-8 text-purple-600" />,
    color: 'bg-purple-50 border-purple-100',
    points: [
      '1 managed proposal per quarter',
      'Technical writing & design',
      'Win theme database organization',
      'RFP compliance checks',
      'Go/no-go analysis'
    ]
  },
  {
    id: 'development',
    title: 'Custom Development',
    icon: <Code2 className="w-8 h-8 text-emerald-600" />,
    color: 'bg-emerald-50 border-emerald-100',
    points: [
      '10-15 hours/week focused dev',
      'Full Stack, Data/AI, Salesforce',
      'Workflow automation',
      'System integrations',
      'Ongoing maintenance'
    ]
  }
];

export const ServiceCards: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What Is Purely Flex?</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Purely Flex gives you access to all three service areas with bandwidth that adapts based on your changing priorities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`rounded-2xl p-8 border hover:shadow-xl transition-shadow duration-300 ${service.color}`}
            >
              <div className="mb-6 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">{service.title}</h3>
              <ul className="space-y-4">
                {service.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
