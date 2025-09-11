"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticCursorProps {
	children: React.ReactNode;
	strength?: number;
	className?: string;
}

export function MagneticCursor({ children, strength = 0.3, className = "" }: MagneticCursorProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = element.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			
			const deltaX = (e.clientX - centerX) * strength;
			const deltaY = (e.clientY - centerY) * strength;
			
			setPosition({ x: deltaX, y: deltaY });
		};

		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => {
			setIsHovered(false);
			setPosition({ x: 0, y: 0 });
		};

		element.addEventListener("mousemove", handleMouseMove);
		element.addEventListener("mouseenter", handleMouseEnter);
		element.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			element.removeEventListener("mousemove", handleMouseMove);
			element.removeEventListener("mouseenter", handleMouseEnter);
			element.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [strength]);

	return (
		<motion.div
			ref={ref}
			className={`cursor-pointer ${className}`}
			animate={{
				x: position.x,
				y: position.y,
				scale: isHovered ? 1.05 : 1,
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
			}}
		>
			{children}
		</motion.div>
	);
}

// Custom cursor component
export function CustomCursor() {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);
	const [cursorState, setCursorState] = useState<'default' | 'text' | 'interactive' | 'button'>('default');
	const [isHovering, setIsHovering] = useState(false);
	const [isClicking, setIsClicking] = useState(false);

	useEffect(() => {
		const updatePosition = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};

		const handleMouseEnter = () => setIsVisible(true);
		const handleMouseLeave = () => setIsVisible(false);

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target) return;

			// Check if hovering over text elements (more comprehensive detection)
			const isTextElement = target.tagName === 'P' || 
				target.tagName === 'H1' || 
				target.tagName === 'H2' || 
				target.tagName === 'H3' || 
				target.tagName === 'H4' || 
				target.tagName === 'H5' || 
				target.tagName === 'H6' || 
				target.tagName === 'SPAN' || 
				target.tagName === 'LI' ||
				target.tagName === 'TD' ||
				target.tagName === 'TH' ||
				target.tagName === 'LABEL' ||
				target.classList.contains('text') ||
				target.classList.contains('cursor-text') ||
				target.classList.contains('font-heading') ||
				target.classList.contains('font-sans') ||
				// Check if element contains text content
				(target.textContent && target.textContent.trim().length > 0 && 
				 !target.querySelector('img, svg, canvas, video, iframe'));

			// Check if hovering over interactive elements
			const isInteractiveElement = target.tagName === 'BUTTON' || 
				target.tagName === 'A' || 
				target.classList.contains('cursor-pointer') ||
				target.classList.contains('interactive') ||
				target.classList.contains('cursor-interactive') ||
				target.getAttribute('role') === 'button' ||
				target.getAttribute('tabindex') !== null ||
				target.classList.contains('group') ||
				target.closest('.group') ||
				target.classList.contains('hover:scale') ||
				target.classList.contains('transition-all');

			// Check if hovering over clickable elements
			const isClickable = target.onclick !== null || 
				target.getAttribute('onclick') !== null ||
				target.classList.contains('clickable') ||
				target.classList.contains('cursor-clickable') ||
				target.getAttribute('data-clickable') === 'true' ||
				// Check for common clickable patterns
				target.classList.contains('card') ||
				target.classList.contains('project-card') ||
				target.classList.contains('blog-card');

			// Check for special elements that should have button-like cursor
			const isSpecialButton = target.tagName === 'BUTTON' || 
				target.classList.contains('btn') ||
				target.classList.contains('button') ||
				target.getAttribute('type') === 'submit' ||
				target.getAttribute('type') === 'button';

			if (isSpecialButton || isClickable) {
				setCursorState('button');
				setIsHovering(true);
			} else if (isInteractiveElement) {
				setCursorState('interactive');
				setIsHovering(true);
			} else if (isTextElement) {
				setCursorState('text');
				setIsHovering(true);
			} else {
				setCursorState('default');
				setIsHovering(false);
			}
		};

		const handleMouseOut = () => {
			setCursorState('default');
			setIsHovering(false);
		};

		const handleMouseDown = () => {
			setIsClicking(true);
		};

		const handleMouseUp = () => {
			setIsClicking(false);
		};

		document.addEventListener("mousemove", updatePosition);
		document.addEventListener("mouseenter", handleMouseEnter);
		document.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("mouseover", handleMouseOver);
		document.addEventListener("mouseout", handleMouseOut);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", updatePosition);
			document.removeEventListener("mouseenter", handleMouseEnter);
			document.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("mouseover", handleMouseOver);
			document.removeEventListener("mouseout", handleMouseOut);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	if (!isVisible) return null;

	// Define cursor styles based on state
	const getCursorStyle = () => {
		switch (cursorState) {
			case 'text':
				return {
					width: '14px',
					height: '14px',
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					borderRadius: '50%',
					boxShadow: '0 0 25px rgba(102, 126, 234, 0.6), 0 0 50px rgba(102, 126, 234, 0.3)',
					border: '2px solid rgba(255, 255, 255, 0.2)',
				};
			case 'interactive':
				return {
					width: '18px',
					height: '18px',
					background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
					borderRadius: '50%',
					boxShadow: '0 0 30px rgba(240, 147, 251, 0.7), 0 0 60px rgba(240, 147, 251, 0.4)',
					border: '2px solid rgba(255, 255, 255, 0.3)',
				};
			case 'button':
				return {
					width: '24px',
					height: '24px',
					background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
					borderRadius: '50%',
					boxShadow: '0 0 35px rgba(79, 172, 254, 0.8), 0 0 70px rgba(79, 172, 254, 0.5)',
					border: '3px solid rgba(255, 255, 255, 0.4)',
				};
			default:
				return {
					width: '10px',
					height: '10px',
					background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
					borderRadius: '50%',
					boxShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)',
					border: '1px solid rgba(255, 255, 255, 0.1)',
				};
		}
	};

	const cursorStyle = getCursorStyle();

	return (
		<motion.div
			className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
			initial={{ opacity: 0, scale: 0 }}
			animate={{ 
				opacity: 1, 
				scale: isClicking ? 0.8 : (isHovering ? 1.2 : 1),
				x: position.x - (parseInt(cursorStyle.width) / 2),
				y: position.y - (parseInt(cursorStyle.height) / 2),
			}}
			transition={{ 
				type: "spring", 
				stiffness: 500, 
				damping: 28,
				duration: 0.3
			}}
		>
			<div 
				className="rounded-full transition-all duration-300 ease-out"
				style={cursorStyle}
			/>
			{/* Click ripple effect */}
			{isClicking && (
				<motion.div
					className="absolute inset-0 rounded-full border-2 border-white/50"
					initial={{ scale: 1, opacity: 1 }}
					animate={{
						scale: [1, 2, 3],
						opacity: [1, 0.5, 0],
					}}
					transition={{
						duration: 0.6,
						ease: "easeOut"
					}}
				/>
			)}
			
			{/* Optional: Add a subtle pulse effect for interactive elements */}
			{cursorState === 'interactive' || cursorState === 'button' ? (
				<motion.div
					className="absolute inset-0 rounded-full border-2 border-white/30"
					animate={{
						scale: [1, 1.5, 1],
						opacity: [0.7, 0, 0.7],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut"
					}}
				/>
			) : null}
		</motion.div>
	);
}
