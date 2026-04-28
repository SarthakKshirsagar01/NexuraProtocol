/**
 * Analytics tracking for Nexura Protocol
 * Tracks user actions and system metrics
 */

interface AnalyticsEvent {
  event: string;
  timestamp: number;
  userId?: string;
  metadata?: Record<string, any>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];

  track(event: string, metadata?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      metadata,
      userId: metadata?.userId,
    };

    this.events.push(analyticsEvent);

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexura_analytics") || "[]";
      const existing = JSON.parse(stored);
      existing.push(analyticsEvent);
      localStorage.setItem("nexura_analytics", JSON.stringify(existing.slice(-100)));
    }
  }

  getEvents(): AnalyticsEvent[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nexura_analytics") || "[]";
      return JSON.parse(stored);
    }
    return this.events;
  }

  getMetrics() {
    const events = this.getEvents();
    const confirmed = events.filter((e) => e.event === "transaction_confirmed");

    return {
      totalUsers: new Set(events.map((e) => e.metadata?.userId).filter(Boolean)).size,
      totalInvoices: events.filter((e) => e.event === "invoice_created").length,
      totalVolume: events
        .filter((e) => e.event === "funds_locked")
        .reduce((sum, e) => sum + (Number(e.metadata?.amount) || 0), 0),
      avgResponseTime:
        confirmed.length > 0
          ? confirmed.reduce((sum, e) => sum + (Number(e.metadata?.duration) || 0), 0) /
            confirmed.length
          : 0,
    };
  }
}

export const analytics = new Analytics();

if (typeof window !== "undefined") {
  analytics.track("page_view", { path: window.location.pathname });
}
