import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galaxy Restaurant System",
  description: "Sistema de gestión para restaurante con Firebase, Next.js y TypeScript. Incluye gestión de productos, recetas, pedidos, mesas e inventario.",
  keywords: ["Galaxy Restaurant", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Firebase", "Restaurant Management", "React"],
  authors: [{ name: "Galaxy Restaurant Team" }],
  openGraph: {
    title: "Galaxy Restaurant System",
    description: "Sistema de gestión para restaurante con tecnología moderna",
    url: "http://localhost:3000",
    siteName: "Galaxy Restaurant System",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galaxy Restaurant System",
    description: "Sistema de gestión para restaurante con tecnología moderna",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
