'use client';

import { useEffect, useState } from 'react';
import { analytics } from '@/lib/analytics';

type IndexedEvent = {
  id: string;
  eventType: string;
  source: string;
  amount: string | null;
  transactionHash: string | null;
  createdAt: string;
  successful: boolean;
};

type MetricsState = {
  totalUsers: number;
  totalInvoices: number;
  totalVolume: number;
  avgResponseTime: number;
};

export default function Metrics() {
  const [metrics, setMetrics] = useState<MetricsState>({
    totalUsers: 0,
    totalInvoices: 0,
    totalVolume: 0,
    avgResponseTime: 0,
  });
  const [events, setEvents] = useState<IndexedEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState('');

  useEffect(() => {
    setMetrics(analytics.getMetrics());
  }, []);

  useEffect(() => {
    const loadIndexedEvents = async () => {
      try {
        setEventsLoading(true);
        const response = await fetch('/api/index-events', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Failed to fetch indexed events (${response.status})`);
        }
        const data = await response.json();
        const incomingEvents = Array.isArray(data?.events) ? data.events : [];
        setEvents(incomingEvents.slice(0, 6));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load indexed events';
        setEventsError(message);
      } finally {
        setEventsLoading(false);
      }
    };

    loadIndexedEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Metrics Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Users</p>
            <p className="text-4xl font-bold text-white">{metrics.totalUsers}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Invoices</p>
            <p className="text-4xl font-bold text-white">{metrics.totalInvoices}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Volume (XLM)</p>
            <p className="text-4xl font-bold text-white">{metrics.totalVolume.toLocaleString()}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Avg Response Time</p>
            <p className="text-4xl font-bold text-white">
              {(metrics.avgResponseTime / 1000).toFixed(2)}s
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">System Health</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Uptime</span>
                  <span className="text-green-400">99.8%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Contract Success Rate</span>
                  <span className="text-green-400">98.5%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            {eventsLoading && <p className="text-slate-400 text-sm">Loading indexed events...</p>}
            {!eventsLoading && eventsError && (
              <p className="text-red-400 text-sm">Unable to load events: {eventsError}</p>
            )}
            {!eventsLoading && !eventsError && events.length === 0 && (
              <p className="text-slate-400 text-sm">No recent indexed events found.</p>
            )}
            {!eventsLoading && !eventsError && events.length > 0 && (
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 text-sm">
                    <span className={event.successful ? 'text-green-400' : 'text-yellow-400'}>
                      {event.successful ? 'OK' : 'WARN'}
                    </span>
                    <div className="flex-1">
                      <p className="text-white">
                        {event.eventType}
                        {event.amount ? ` - ${event.amount} XLM` : ''}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {new Date(event.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
