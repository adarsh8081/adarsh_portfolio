import type { Metadata } from "next";
import { Roboto, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeToggle } from "@/components/theme-toggle";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProvider } from "@/components/scroll-provider";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Auth0Provider } from '@/components/auth0-provider';
import { CustomCursor } from "@/components/magnetic-cursor";
import { SWRProvider } from "@/components/swr-provider";
import { PerformanceMonitor } from "@/components/performance-monitor";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Adarsh Kumar — AI/ML Engineer & Creative Professional",
    template: "%s | Adarsh Kumar",
  },
  description:
    "Professional yet approachable AI/ML engineer and creative professional. Bridging artificial intelligence with design to build intelligent, user-centric solutions.",
  metadataBase: new URL("https://adarshkumar.dev"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Adarsh Kumar — AI/ML Engineer & Creative Professional",
    description:
      "Professional yet approachable AI/ML engineer and creative professional. Bridging artificial intelligence with design to build intelligent, user-centric solutions.",
    type: "website",
    url: "https://adarshkumar.dev",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Adarsh Kumar Portfolio" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Kumar — AI/ML Engineer & Creative Professional",
    description:
      "Professional yet approachable AI/ML engineer and creative professional. Bridging artificial intelligence with design to build intelligent, user-centric solutions.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${poppins.variable} antialiased min-h-screen`}
      >
        <Auth0Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SWRProvider>
              <AnalyticsProvider>
                <ScrollProvider>
                  <Header />
                  {children}
                  <Footer />
                  <CustomCursor />
                  <PerformanceMonitor />
                  <Analytics />
                  <SpeedInsights />
                </ScrollProvider>
              </AnalyticsProvider>
            </SWRProvider>
          </ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
