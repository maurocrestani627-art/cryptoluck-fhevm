import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoLuck - Provably Fair Lottery Powered by FHEVM",
  description: "Experience true fairness in lottery games with fully homomorphic encryption. No black boxes, only verifiable transparency.",
  keywords: ["lottery", "FHEVM", "blockchain", "privacy", "fairness", "FHE"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Load FHEVM Relayer SDK v0.3.0-5 */}
        <Script
          src="https://cdn.zama.org/relayer-sdk-js/0.3.0-5/relayer-sdk-js.umd.cjs"
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}


