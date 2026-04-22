import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import GlobalBackground from "@/components/GlobalBackground";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shara Computers Store | Future of Tech",
  description: "Premium laptops, PCs, and accessories with cutting-edge performance.",
  keywords: ["computers", "laptops", "gaming", "tech", "accessories"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.variable} antialiased bg-transparent text-white overflow-x-hidden`}>
        <CartProvider>
          <GlobalBackground />
          <CustomCursor />
          <Navbar />
          <div className="relative z-10">
            {children}
          </div>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
