"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics";

interface AnalyticsProviderProps {
	children: React.ReactNode;
}

function AnalyticsTracker({ children }: AnalyticsProviderProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Initialize analytics on mount
		analytics.initialize();
	}, []);

	useEffect(() => {
		// Track page views on route changes
		const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
		
		analytics.trackPageView({
			path: url,
			title: document.title,
			properties: {
				referrer: document.referrer,
				user_agent: navigator.userAgent,
				timestamp: new Date().toISOString(),
			},
		});
	}, [pathname, searchParams]);

	return <>{children}</>;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
	return (
		<Suspense fallback={<>{children}</>}>
			<AnalyticsTracker>{children}</AnalyticsTracker>
		</Suspense>
	);
}

// Hook for tracking portfolio interactions
export function usePortfolioTracking() {
	const trackProjectView = (projectId: string, projectName: string) => {
		analytics.trackPortfolioEvent('project_viewed', {
			project_id: projectId,
			project_name: projectName,
		});
	};

	const trackProjectClick = (projectId: string, projectName: string, action: string) => {
		analytics.trackPortfolioEvent('project_clicked', {
			project_id: projectId,
			project_name: projectName,
			action,
		});
	};

	const trackBlogView = (postId: string, postTitle: string) => {
		analytics.trackPortfolioEvent('blog_viewed', {
			post_id: postId,
			post_title: postTitle,
		});
	};

	const trackContactForm = (formType: string) => {
		analytics.trackPortfolioEvent('contact_form_submitted', {
			form_type: formType,
		});
	};

	const trackDownload = (fileName: string, fileType: string) => {
		analytics.trackPortfolioEvent('file_downloaded', {
			file_name: fileName,
			file_type: fileType,
		});
	};

	const trackSocialClick = (platform: string, url: string) => {
		analytics.trackPortfolioEvent('social_clicked', {
			platform,
			url,
		});
	};

	return {
		trackProjectView,
		trackProjectClick,
		trackBlogView,
		trackContactForm,
		trackDownload,
		trackSocialClick,
	};
}

// Hook for tracking chatbot interactions
export function useChatbotTracking() {
	const trackChatbotOpen = () => {
		analytics.trackChatbotEvent('chatbot_opened');
	};

	const trackChatbotClose = () => {
		analytics.trackChatbotEvent('chatbot_closed');
	};

	const trackChatbotMessage = (messageType: 'user' | 'bot', messageLength: number) => {
		analytics.trackChatbotEvent('chatbot_message', {
			message_type: messageType,
			message_length: messageLength,
		});
	};

	const trackChatbotVoiceToggle = (enabled: boolean) => {
		analytics.trackChatbotEvent('chatbot_voice_toggled', {
			voice_enabled: enabled,
		});
	};

	const trackChatbotError = (errorType: string, errorMessage: string) => {
		analytics.trackChatbotEvent('chatbot_error', {
			error_type: errorType,
			error_message: errorMessage,
		});
	};

	return {
		trackChatbotOpen,
		trackChatbotClose,
		trackChatbotMessage,
		trackChatbotVoiceToggle,
		trackChatbotError,
	};
}

// Hook for tracking admin actions
export function useAdminTracking() {
	const trackAdminLogin = (userId: string) => {
		analytics.trackAdminEvent('admin_login', {
			user_id: userId,
		});
	};

	const trackAdminLogout = (userId: string) => {
		analytics.trackAdminEvent('admin_logout', {
			user_id: userId,
		});
	};

	const trackContentCreate = (contentType: string, contentId: string) => {
		analytics.trackAdminEvent('content_created', {
			content_type: contentType,
			content_id: contentId,
		});
	};

	const trackContentUpdate = (contentType: string, contentId: string) => {
		analytics.trackAdminEvent('content_updated', {
			content_type: contentType,
			content_id: contentId,
		});
	};

	const trackContentDelete = (contentType: string, contentId: string) => {
		analytics.trackAdminEvent('content_deleted', {
			content_type: contentType,
			content_id: contentId,
		});
	};

	const trackAIDataRefresh = () => {
		analytics.trackAdminEvent('ai_data_refreshed');
	};

	const trackCacheClear = (cacheType: string) => {
		analytics.trackAdminEvent('cache_cleared', {
			cache_type: cacheType,
		});
	};

	return {
		trackAdminLogin,
		trackAdminLogout,
		trackContentCreate,
		trackContentUpdate,
		trackContentDelete,
		trackAIDataRefresh,
		trackCacheClear,
	};
}
