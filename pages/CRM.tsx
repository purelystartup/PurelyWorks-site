import React, { useMemo } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Database, Link2, ShieldCheck } from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { LifecycleStage, ServiceLine } from '../types';

const stageColors: Record<LifecycleStage, string> = {
  'Lead Generation': 'bg-sky-50 border-sky-100 text-sky-900',
  Qualification: 'bg-amber-50 border-amber-100 text-amber-900',
  Discovery: 'bg-indigo-50 border-indigo-100 text-indigo-900',
  'Proposal Development': 'bg-purple-50 border-purple-100 text-purple-900',
  Contracting: 'bg-emerald-50 border-emerald-100 text-emerald-900',
  Onboarding: 'bg-blue-50 border-blue-100 text-blue-900',
  Delivery: 'bg-slate-50 border-slate-100 text-slate-900',
};

const serviceColor: Record<ServiceLine, string> = {
  'Purely Flex': 'bg-gradient-to-r from-slate-900 to-indigo-900 text-white',
  Proposals: 'bg-purple-100 text-purple-900',
  Development: 'bg-emerald-100 text-emerald-900',
  Recruiting: 'bg-sky-100 text-sky-900',
  'AI Advisory': 'bg-orange-100 text-orange-900',
  Marketing: 'bg-pink-100 text-pink-900',
};

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

export const CRM: React.FC = () => {
  const { state, moveDealForward, moveDealBackward } = useCRM();

  const stageOrder: LifecycleStage[] = useMemo(
    () => [
      'Lead Generation',
      'Qualification',
      'Discovery',
      'Proposal Development',
      'Contracting',
      'Onboarding',
      'Delivery',
    ],
    []
  );

  const pipelineByStage = stageOrder.map((stage) => ({
    stage,
    deals: state.deals.filter((deal) => deal.stage === stage),
  }));

  const totalMRR = state.subscriptions.reduce((sum, sub) => sum + sub.monthlyRate, 0);
  const activeClients = new Set(state.subscriptions.map((sub) => sub.organizationId)).size;
  const weightedPipeline = state.deals.reduce((sum, deal) => sum + deal.value * (deal.closeProbability / 100), 0);

  const allocationSummary = state.subscriptions.reduce<Record<string, number>>((acc, sub) => {
    const allocation = sub.shareAllocation;
    if (!allocation) return acc;
    Object.entries(allocation).forEach(([role, value]) => {
      acc[role] = (acc[role] || 0) + (value || 0);
    });
    return acc;
  }, {});

  const renderAllocation = (allocation?: Record<string, number>) => {
    if (!allocation) return null;
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.entries(allocation).map(([role, value]) => (
          <span
            key={role}
            className="text-xs px-2 py-1 rounded-full bg-white/70 text-slate-700 border border-slate-100"
          >
            {role}: {value}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 font-semibold">Operational CRM</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Purely Works Delivery & Revenue Command</h1>
              <p className="text-slate-500 mt-2 max-w-3xl">
                Track lifecycle, service lines, share-based staffing, reseller presets, and integrations in one view.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm">
                <ShieldCheck size={16} /> AI + Human delivery guardrails active
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm border border-emerald-100">
                <Database size={16} /> Local CRM data layer (persisted)
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Live MRR across services</p>
            <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(totalMRR)}</h3>
            <p className="text-sm text-slate-500 mt-1">Retainers + bundles</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Active clients & partners</p>
            <h3 className="text-3xl font-bold text-slate-900">{activeClients}</h3>
            <p className="text-sm text-slate-500 mt-1">Across Purely Flex and focused lines</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-sm text-slate-500">Weighted pipeline</p>
            <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(weightedPipeline)}</h3>
            <p className="text-sm text-slate-500 mt-1">Probability-adjusted revenue</p>
          </div>
        </div>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-lg p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Lifecycle board</h2>
              <p className="text-slate-500">Seven-stage journey from lead through delivery with stage transitions.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ChevronLeft className="text-slate-400" size={16} /> move stage <ChevronRight className="text-slate-400" size={16} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineByStage.map(({ stage, deals }) => (
              <div key={stage} className={`rounded-2xl border p-4 shadow-sm ${stageColors[stage]}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm uppercase tracking-wide">{stage}</h3>
                  <span className="text-xs font-bold px-2 py-1 bg-white/70 rounded-full border border-white/60">{deals.length} deals</span>
                </div>
                <div className="space-y-3">
                  {deals.map((deal) => {
                    const org = state.organizations.find((o) => o.id === deal.organizationId);
                    return (
                      <div key={deal.id} className="bg-white/60 rounded-xl border border-white/60 p-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{org?.name}</p>
                            <p className="text-xs text-slate-500">{deal.services.join(' · ')}</p>
                          </div>
                          <p className="text-sm font-bold text-slate-900">{formatCurrency(deal.value)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs text-slate-600">
                          <span>{deal.closeProbability}% win • Close {deal.targetClose}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => moveDealBackward(deal.id)}
                              className="px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-100"
                            >
                              <ChevronLeft size={14} />
                            </button>
                            <button
                              onClick={() => moveDealForward(deal.id)}
                              className="px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-100"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {deals.length === 0 && <p className="text-sm text-slate-500">No deals in this stage.</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Service packages per client</h2>
                <p className="text-slate-500">Share-based allocations for Flex, proposals, recruiting, and delivery pods.</p>
              </div>
            </div>
            <div className="space-y-4">
              {state.subscriptions.map((sub) => {
                const org = state.organizations.find((o) => o.id === sub.organizationId);
                return (
                  <div key={sub.id} className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">{org?.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${serviceColor[sub.serviceLine]}`}>
                          {sub.serviceLine}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {sub.pricingModel}
                        </span>
                        <span className="text-xs text-slate-500">Term {sub.termMonths} mo</span>
                      </div>
                      {renderAllocation(sub.shareAllocation)}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(sub.monthlyRate)}</p>
                      {sub.discount && (
                        <p className="text-xs text-emerald-600">{Math.round(sub.discount * 100)}% discount applied</p>
                      )}
                      {sub.notes && <p className="text-xs text-slate-500 mt-1 max-w-xs">{sub.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Reseller & preset controls</h3>
              <p className="text-sm text-slate-500">Commission tracking with per-client presets.</p>
              <div className="space-y-3 mt-4">
                {state.resellers.map((reseller) => (
                  <div key={reseller.id} className="border border-slate-100 rounded-2xl p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{reseller.name}</p>
                        <p className="text-xs text-slate-500">Presets: {reseller.presets.join(', ')}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-100">
                        ${reseller.commissionPerPackage} commission
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Clients: {reseller.clients.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Capacity utilization</h3>
              <p className="text-sm text-slate-500">Shares consumed across pods.</p>
              <div className="mt-4 space-y-2">
                {Object.entries(allocationSummary).map(([role, value]) => (
                  <div key={role} className="flex items-center justify-between text-sm text-slate-700">
                    <span className="capitalize">{role.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-28 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-slate-900" style={{ width: `${Math.min(value * 100, 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{value.toFixed(1)} shares</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-lg p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Integration + automation readiness</h2>
              <p className="text-slate-500">HubSpot, Stripe, Linear, ClickUp, Notion, DocuSign, Slack.</p>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Link2 size={18} /> CRM API entry points
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.integrations.map((integration) => (
              <div key={integration.id} className="border border-slate-100 rounded-2xl p-4 flex items-start gap-3 bg-slate-50">
                <CheckCircle2 className={`mt-1 ${integration.status === 'Connected' ? 'text-emerald-500' : integration.status === 'Planned' ? 'text-slate-400' : 'text-amber-500'}`} />
                <div>
                  <p className="font-semibold text-slate-900">{integration.name}</p>
                  <p className="text-xs text-slate-500">{integration.status}</p>
                  <p className="text-sm text-slate-600 mt-1">{integration.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-slate-300">API-backed data layer</p>
              <h3 className="text-2xl font-bold mt-2">CRM endpoints for lifecycle + service moves</h3>
              <p className="text-slate-300 mt-2 max-w-3xl">
                Replace static marketing data with structured CRM objects. The mock data layer here persists locally and exposes
                stage-transition controls that mirror how Express/Next API routes would update deals, subscriptions, and reseller
                presets.
              </p>
            </div>
            <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg">
              View API contract
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-slate-900">
            <div className="bg-white/90 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Lifecycle</p>
              <p className="font-bold text-lg">POST /api/deals/{'{'}id{'}'}/stage</p>
              <p className="text-sm text-slate-600 mt-1">Transition through the 7-stage journey with automation hooks.</p>
            </div>
            <div className="bg-white/90 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Services</p>
              <p className="font-bold text-lg">PUT /api/subscriptions/{'{'}id{'}'}</p>
              <p className="text-sm text-slate-600 mt-1">Update share allocation, retainer terms, and reseller presets.</p>
            </div>
            <div className="bg-white/90 rounded-2xl p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Integrations</p>
              <p className="font-bold text-lg">GET /api/integrations</p>
              <p className="text-sm text-slate-600 mt-1">Status for HubSpot, Stripe, Linear, ClickUp, Notion, DocuSign, Slack.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
