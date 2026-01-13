import type { Metadata } from "next";
import { Inter, Readex_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Philipp Lukas | AI Solutions",
  description: "Portfolio of Philipp Lukas - Innovative AI Projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${readexPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
