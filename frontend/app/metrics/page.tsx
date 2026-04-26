'use client';

import { useState, useEffect } from 'react';

export default function Metrics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvoices: 0,
    totalVolume: 0,
    avgResponseTime: 0,
    errorRate: 0,
  });

  useEffect(() => {
    // Simulate fetching metrics
    // In production, this would call your backend API
    setStats({
      totalUsers: 32,
      totalInvoices: 45,
      totalVolume: 12500,
      avgResponseTime: 1.2,
      errorRate: 0.5,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Metrics Dashboard</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Users</p>
            <p className="text-4xl font-bold text-white">{stats.totalUsers}</p>
            <p className="text-green-400 text-xs mt-2">up 12% from last week</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Invoices</p>
            <p className="text-4xl font-bold text-white">{stats.totalInvoices}</p>
            <p className="text-green-400 text-xs mt-2">up 8% from last week</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Total Volume (XLM)</p>
            <p className="text-4xl font-bold text-white">{stats.totalVolume.toLocaleString()}</p>
            <p className="text-green-400 text-xs mt-2">up 25% from last week</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
            <p className="text-slate-400 text-sm mb-2">Avg Response Time</p>
            <p className="text-4xl font-bold text-white">{stats.avgResponseTime}s</p>
            <p className="text-green-400 text-xs mt-2">down 15% faster</p>
          </div>
        </div>

        {/* System Health */}
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
                  <span className="text-slate-300">Error Rate</span>
                  <span className="text-green-400">{stats.errorRate}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${100 - stats.errorRate}%` }}></div>
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
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <span className="text-green-400">OK</span>
                <div className="flex-1">
                  <p className="text-white">Invoice #1045 created</p>
                  <p className="text-slate-400 text-xs">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="text-green-400">OK</span>
                <div className="flex-1">
                  <p className="text-white">Payment released: 500 XLM</p>
                  <p className="text-slate-400 text-xs">8 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="text-green-400">OK</span>
                <div className="flex-1">
                  <p className="text-white">New user registered</p>
                  <p className="text-slate-400 text-xs">12 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <span className="text-blue-400">INFO</span>
                <div className="flex-1">
                  <p className="text-white">Oracle verification pending</p>
                  <p className="text-slate-400 text-xs">15 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
