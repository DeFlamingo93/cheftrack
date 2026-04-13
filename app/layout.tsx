import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Cheftrack | Food Waste stoppen und bares Geld sparen",
  description:
    "Cheftrack hilft Gastronomiebetrieben in der Schweiz, Deutschland und Österreich Food Waste zu reduzieren und ihre Kalkulation besser zu verstehen."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
