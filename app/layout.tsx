"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/components/atomic/loading";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleAdsense } from "@/components/atomic/google-adsense";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
export default function RootLayout({
  children,
  params: { session, ...params },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          // attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <div className="">
              <div className="flex justify-between items-center"></div>
            </div>
            <div className="flex mx-auto main w-full">{children}</div>
            <Toaster />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>

      <GoogleAdsense pId="3644774384050550" />
      <GoogleAnalytics gaId="G-SW6Y52P2PD" />
    </html>
  );
}
