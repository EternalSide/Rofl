import "./globals.css";
import "../styles/prism.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/context/ThemeProvider";
import { cn } from "@/lib/utils";
import { ruRU } from "@clerk/localizations";
import { ChildrenProps } from "@/types";
import { Toaster } from "@/components/ui/toaster";

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
  title: "RuOverFlow",
  description: "Вопросы и ответы для программистов.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <html className="dark" lang="ru">
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
        <Toaster />
      </body>
    </html>
  );
}
