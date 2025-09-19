"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		// Check if user prefers reduced motion
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		
		// Check if device is mobile/touch
		const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
		
		if (prefersReducedMotion || isMobile) {
			return; // Skip smooth scrolling for users who prefer reduced motion or mobile devices
		}

		lenisRef.current = new Lenis({
			duration: 0.8, // Reduced duration for snappier feel
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
			infinite: false,
		});

		let rafId: number;
		
		function raf(time: number) {
			lenisRef.current?.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		// Cleanup function
		return () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
			lenisRef.current?.destroy();
		};
	}, []);

	return <>{children}</>;
}
