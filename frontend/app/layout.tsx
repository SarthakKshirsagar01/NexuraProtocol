import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexura Protocol",
  description: "Trustless Smart Invoice Ecosystem for SMEs on Stellar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}