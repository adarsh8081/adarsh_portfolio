// Analytics service for Google Analytics and PostHog integration

interface AnalyticsEvent {
	name: string;
	properties?: Record<string, string | number | boolean>;
	category?: string;
	value?: number;
}

interface PageView {
	path: string;
	title?: string;
	properties?: Record<string, string | number | boolean>;
}

class AnalyticsService {
	private isInitialized = false;
	private gtag: ((...args: unknown[]) => void) | null = null;
	private posthog: { 
		capture: (event: string, properties?: Record<string, unknown>) => void;
		init: (key: string, options?: Record<string, unknown>) => void;
		identify: (userId: string, properties?: Record<string, unknown>) => void;
	} | null = null;

	// Initialize analytics services
	async initialize() {
		if (this.isInitialized) return;

		try {
			// Initialize Google Analytics
			await this.initializeGoogleAnalytics();
			
			// Initialize PostHog
			await this.initializePostHog();
			
			this.isInitialized = true;
		} catch (error) {
			console.error('Failed to initialize analytics:', error);
		}
	}

	private async initializeGoogleAnalytics() {
		const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
		
		if (!GA_MEASUREMENT_ID) {
			console.warn('Google Analytics measurement ID not found');
			return;
		}

		// Load Google Analytics script
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		document.head.appendChild(script);

		// Initialize gtag
		window.dataLayer = window.dataLayer || [];
		this.gtag = function(...args: unknown[]) {
			window.dataLayer.push(args);
		};
		
		this.gtag('js', new Date());
		this.gtag('config', GA_MEASUREMENT_ID, {
			page_title: document.title,
			page_location: window.location.href,
		});
	}

	private async initializePostHog() {
		const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
		const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
		
		if (!POSTHOG_KEY) {
			console.warn('PostHog key not found');
			return;
		}

		// Load PostHog script
		const script = document.createElement('script');
		script.async = true;
		script.src = `${POSTHOG_HOST}/static/array.js`;
		document.head.appendChild(script);

		// Initialize PostHog
		script.onload = () => {
			this.posthog = (window as typeof window & { 
				posthog: { 
					capture: (event: string, properties?: Record<string, unknown>) => void;
					init: (key: string, options?: Record<string, unknown>) => void;
					identify: (userId: string, properties?: Record<string, unknown>) => void;
				} 
			}).posthog;
			this.posthog.init(POSTHOG_KEY, {
				api_host: POSTHOG_HOST,
				person_profiles: 'identified_only',
				capture_pageview: false, // We'll handle this manually
			});
		};
	}

	// Track page views
	trackPageView(pageView: PageView) {
		if (!this.isInitialized) return;

		// Google Analytics
		if (this.gtag) {
			this.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
				page_title: pageView.title || document.title,
				page_location: window.location.origin + pageView.path,
				...pageView.properties,
			});
		}

		// PostHog
		if (this.posthog) {
			this.posthog.capture('$pageview', {
				$current_url: window.location.origin + pageView.path,
				$pathname: pageView.path,
				...pageView.properties,
			});
		}
	}

	// Track custom events
	trackEvent(event: AnalyticsEvent) {
		if (!this.isInitialized) return;

		// Google Analytics
		if (this.gtag) {
			this.gtag('event', event.name, {
				event_category: event.category,
				event_label: event.properties?.label,
				value: event.value,
				...event.properties,
			});
		}

		// PostHog
		if (this.posthog) {
			this.posthog.capture(event.name, {
				category: event.category,
				...event.properties,
			});
		}
	}

	// Track user identification
	identifyUser(userId: string, properties?: Record<string, string | number | boolean>) {
		if (!this.isInitialized) return;

		// Google Analytics
		if (this.gtag) {
			this.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
				user_id: userId,
				...properties,
			});
		}

		// PostHog
		if (this.posthog) {
			this.posthog.identify(userId, properties);
		}
	}

	// Track portfolio-specific events
	trackPortfolioEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
		this.trackEvent({
			name: eventName,
			category: 'Portfolio',
			properties,
		});
	}


	// Track admin actions
	trackAdminEvent(eventName: string, properties?: Record<string, string | number | boolean>) {
		this.trackEvent({
			name: eventName,
			category: 'Admin',
			properties,
		});
	}

	// Get analytics data (for admin dashboard)
	async getAnalyticsData(timeRange: string = '30d') {
		try {
			// This would typically call your backend API that fetches data from GA/PostHog
			const response = await fetch(`/api/analytics?range=${timeRange}`);
			return await response.json();
		} catch (error) {
			console.error('Failed to fetch analytics data:', error);
			return null;
		}
	}
}

// Create singleton instance
export const analytics = new AnalyticsService();

// React hook for analytics
export function useAnalytics() {
	return {
		trackPageView: (pageView: PageView) => analytics.trackPageView(pageView),
		trackEvent: (event: AnalyticsEvent) => analytics.trackEvent(event),
		trackPortfolioEvent: (eventName: string, properties?: Record<string, string | number | boolean>) => 
			analytics.trackPortfolioEvent(eventName, properties),
		trackAdminEvent: (eventName: string, properties?: Record<string, string | number | boolean>) => 
			analytics.trackAdminEvent(eventName, properties),
		identifyUser: (userId: string, properties?: Record<string, string | number | boolean>) => 
			analytics.identifyUser(userId, properties),
	};
}

// Declare global types
declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
		posthog: { capture: (event: string, properties?: Record<string, unknown>) => void };
	}
}
