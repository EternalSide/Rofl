import "./globals.css";
import "../styles/prism.css";
import React from "react";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
// Русский Язык для Clerk
import { ruRU } from "@clerk/localizations";
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "OverFlow",
  description: "A place to share knowledge and better understand the world (Фига Копайлот как умеет текста писать)",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={cn(inter.variable, spaceGrotesk.variable)}>
        <ClerkProvider
          localization={ruRU}
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
