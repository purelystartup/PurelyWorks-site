import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const faqs = [
  {
    question: "Can I start with Purely Flex and add Focused Teams later?",
    answer: "Absolutely - we recommend it. Test all three services at moderate volume, discover where you get the most value, then add dedicated capacity in that specific area. Purely Flex becomes your baseline while Focused Teams handle high-volume needs."
  },
  {
    question: "What if I need more recruiting capacity than one Focused Team provides?",
    answer: "Add recruiting capacity in half-share increments. Each additional half-share recruiter adds support for 2 more concurrent positions."
  },
  {
    question: "What happens to my data and code if we stop working together?",
    answer: "All documentation, materials, and code are 100% yours from the moment of creation. Because everything primarily lives in your systems, there is usually very little to transfer. You own it completely."
  },
  {
    question: "Can you handle confidential or proprietary information?",
    answer: "Yes. All team members sign NDAs before accessing any client materials, systems, or data. We treat your intellectual property as sacred and implement appropriate access controls."
  },
  {
    question: "What time zones do your teams work?",
    answer: "Our teams work flexibly to provide coverage matching your needs. We typically align key check-ins with US business hours, while distributed teams provide around-the-clock capacity."
  },
  {
    question: "Can I pause service temporarily?",
    answer: "With 30 days notice, yes. We'll help you wind down active projects cleanly. We aim to develop a sustainable working cadence, but we understand every company has unique needs."
  },
  {
     question: "How do you handle third-party costs?",
     answer: "We identify all third-party costs (APIs, cloud infra) during project scoping and get your explicit approval before incurring them. We bill them transparently."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                    <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
        </ScrollReveal>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ScrollReveal key={idx} delay={idx * 50}>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                <button 
                    className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                    <span className="font-bold text-slate-900 pr-4">{faq.question}</span>
                    {openIndex === idx ? <ChevronUp className="text-indigo-600 shrink-0" /> : <ChevronDown className="text-slate-400 shrink-0" />}
                </button>
                
                <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="p-6 pt-0 bg-white border-t border-slate-50">
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                </div>
                </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};