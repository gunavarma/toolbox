/**
 * Centralized Analytics tracker interface.
 * Can be connected to Google Analytics (gtag), PostHog, or Plausible.
 */

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, any>) => void;
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
    };
    plausible?: (event: string, options?: { props: Record<string, any> }) => void;
  }
}

export const trackPageView = (url: string) => {
  // Google Analytics PageView
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-ANALYTICS_ID", {
      page_path: url,
    });
  }
};

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  // Console logging in dev mode
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${eventName}:`, properties);
  }

  if (typeof window === "undefined") return;

  // 1. Google Analytics Event
  if (window.gtag) {
    window.gtag("event", eventName, properties);
  }

  // 2. PostHog Event
  if (window.posthog) {
    window.posthog.capture(eventName, properties);
  }

  // 3. Plausible Event
  if (window.plausible) {
    window.plausible(eventName, { props: properties || {} });
  }
};

// Custom tracker hooks for utility tools
export const trackToolUsage = (toolSlug: string, action: "execute" | "copy" | "download") => {
  trackEvent("tool_interaction", {
    tool: toolSlug,
    action: action,
    timestamp: new Date().toISOString(),
  });
};
