import type { Metadata } from "next";
import "./globals.css";
import LayoutProviders from "@/components/providers/LayoutProviders";

export const metadata: Metadata = {
  title: "AnyCode - Managment",
  description: "AnyCode managment for administration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <head>
        <link rel="icon" href="/logo_2.png" type="image/png" sizes="32x32" />
      </head>
      <body>
        <LayoutProviders>{children}</LayoutProviders>
      </body>
    </html>
  );
}
