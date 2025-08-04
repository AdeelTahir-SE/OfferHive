import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Provider from "@/lib/redux/providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OfferHive",
  description:
    "OfferHive is your go-to platform for exploring trending deals, managing shop promotions, and connecting with local businesses especially for university students.",

  openGraph: {
    title: "OfferHive",
    description:
      "Explore trending deals and connect with local student-run shops on OfferHive.",
    url: "https://offer-hive.vercel.app/",
    siteName: "OfferHive",
    images: [
      {
        url: "/offerhive-radial.png", 
        width: 1200,
        height: 630,
        alt: "OfferHive - Explore trending deals",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "OfferHive",
    description:
      "Explore trending deals and connect with local student-run shops on OfferHive.",
    images: ["/offerhive-radial.png"],
  },

  icons: {
    icon: "/offerhive-radial.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  intercept?: React.ReactNode;
}>) {
  return (
    <html lang="en">
   <head>
        <link rel="icon" href="/offerhive-radial.png" sizes="any" />
        {/* Optional Apple icon */}
        <link rel="apple-touch-icon" href="/offerhive-radial.png" />
        {/* Optional site verification */}
        {/* <meta name="google-site-verification" content="your-token" /> */}
      </head>
      <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
           {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
