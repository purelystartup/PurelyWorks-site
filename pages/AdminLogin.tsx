import React, { useMemo, useState } from 'react';
import { Lock, LogIn, ShieldCheck } from 'lucide-react';

const defaultCredentials = {
  email: 'admin@purely.works',
  password: 'purely!123',
};

const payloadAdminUrl = (import.meta.env.VITE_PAYLOAD_ADMIN_URL ?? 'https://cms.purelyworks.com/admin').trim();

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'redirecting' | 'error'>('idle');

  const maskedPassword = useMemo(() => '*'.repeat(defaultCredentials.password.length), []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!payloadAdminUrl) {
      setStatus('error');
      return;
    }

    setStatus('redirecting');
    window.location.href = payloadAdminUrl;
  };

  return (
    <div className="pt-28 pb-24 bg-white text-slate-900">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6 text-indigo-600 font-semibold uppercase tracking-[0.2em]">
          <ShieldCheck size={18} />
          Payload Admin
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Access the experience layer</h1>
        <p className="text-lg text-slate-600 mb-10">
          Use the credentials below to sign in to your Payload admin and manage pages, assets, and blog posts. Submitting this
          form will forward you to your Payload dashboard.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 mb-3">
            <Lock size={16} />
            Default credentials
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
              <span className="text-slate-500 text-sm">Email</span>
              <span className="font-semibold">{defaultCredentials.email}</span>
            </div>
            <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl px-4 py-3">
              <span className="text-slate-500 text-sm">Password</span>
              <span className="font-semibold tracking-[0.3em]">{maskedPassword}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 text-white rounded-3xl p-8 shadow-lg">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-slate-900 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-slate-900 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-slate-900 font-bold rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
          >
            <LogIn size={18} />
            {status === 'redirecting' ? 'Opening Payload Admin…' : 'Sign In to Payload'}
          </button>
          {status === 'redirecting' && (
            <p className="text-sm text-emerald-300 bg-emerald-900/40 border border-emerald-500 rounded-xl px-4 py-3">
              Redirecting you to the Payload admin dashboard so you can manage content.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-rose-300 bg-rose-900/40 border border-rose-500 rounded-xl px-4 py-3">
              We couldn't open the Payload admin because no admin URL is configured. Set <code>VITE_PAYLOAD_ADMIN_URL</code> in your environment to point to your Payload instance.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
