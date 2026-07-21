import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Header, Providers } from "@/shared/ui";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kumix",
    template: "%s | Kumix",
  },
  description:
    "A unified workspace of professional utilities. Fast, friendly, beautiful and invisible.",
  authors: [{ name: "Johan Amed", url: "https://github.com/Ephistopheles" }],
  keywords: [
    "kumix",
    "tools",
    "utilities",
    "productivity",
    "development",
    "documents",
    "images",
    "text",
    "security",
    "web",
    "excel",
    "calculators",
  ],
  applicationName: "Kumix",
  generator: "Next.js",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body>
        <Providers>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
