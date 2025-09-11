"use client";

import { Auth0Provider as Auth0ProviderComponent } from '@auth0/nextjs-auth0';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Auth0Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }
  
  // Check if Auth0 is properly configured
  const isAuth0Configured = process.env.NEXT_PUBLIC_AUTH0_SECRET && process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL;
  
  // Only show Auth0 error on authentication-related pages
  const isAuthPage = pathname?.includes('/admin') || pathname?.includes('/api/auth') || pathname?.includes('/test-auth');
  
  if (!isAuth0Configured && isAuthPage) {
    // Show a helpful message only on auth-related pages
    return (
      <div style={{ 
        padding: '20px', 
        margin: '20px', 
        border: '2px solid #ff6b6b', 
        borderRadius: '8px', 
        backgroundColor: '#fff5f5',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h3 style={{ color: '#e74c3c', margin: '0 0 10px 0' }}>⚠️ Auth0 Not Configured</h3>
        <p style={{ margin: '0 0 10px 0', color: '#333' }}>
          Authentication is not available. Please configure Auth0 environment variables.
        </p>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
          Check the .env.local file in the web directory and ensure all Auth0 variables are set.
        </p>
        {children}
      </div>
    );
  }

  // For non-auth pages or when Auth0 is configured, just render children normally
  if (!isAuth0Configured) {
    return <>{children}</>;
  }

  return (
    <Auth0ProviderComponent>
      {children}
    </Auth0ProviderComponent>
  );
}
