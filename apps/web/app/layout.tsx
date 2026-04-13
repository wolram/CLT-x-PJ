import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stitch Redesign Screens",
  description: "Monorepo Next.js com catálogo das telas HTML renomeadas"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
