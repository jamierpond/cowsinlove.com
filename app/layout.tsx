import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Comic_Neue } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comicNeue = Comic_Neue({
  variable: '--font-comic-neue',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Cows In Love",
  description: "MOOOOOOOOOOOOOOOOOOOOOOOOOOO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comicNeue.variable} antialiased`}
      >
        {children}
      </body>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-CXH20JTBJX"
        strategy="afterInteractive"
      />
      <Script id="gtag" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-CXH20JTBJX');
      `}</Script>
    </html>
  );
}
