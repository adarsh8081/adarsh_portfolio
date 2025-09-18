"use client";

import { Suspense, lazy, memo } from "react";

// Lazy load heavy components
const Advanced3DBackground = lazy(() => import("./advanced-3d-background").then(module => ({ default: module.Advanced3DBackground })));
const FloatingTechIcons = lazy(() => import("./floating-tech-icons").then(module => ({ default: module.FloatingTechIcons })));

interface LazyLoadingWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
    </div>
  );
});

export const LazyLoadingWrapper = memo(function LazyLoadingWrapper({ 
  children, 
  fallback = <LoadingFallback /> 
}: LazyLoadingWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
});

// Lazy loaded background components
export const LazyAdvanced3DBackground = memo(function LazyAdvanced3DBackground() {
  return (
    <LazyLoadingWrapper>
      <Advanced3DBackground />
    </LazyLoadingWrapper>
  );
});

export const LazyFloatingTechIcons = memo(function LazyFloatingTechIcons() {
  return (
    <LazyLoadingWrapper>
      <FloatingTechIcons />
    </LazyLoadingWrapper>
  );
});
