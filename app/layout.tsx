import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/v2/ScrollProgress";
import { TargetCursorFallback } from "@/components/v2/TargetCursorFallback";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Aayush Raj - Full-Stack Developer",
    template: "%s - Aayush Raj",
  },
  description: profile.heroSubtext,
  alternates: {
    canonical: profile.siteUrl || "/",
  },
  openGraph: {
    type: "website",
    title: "Aayush Raj - Full-Stack Developer",
    description: profile.heroSubtext,
    url: profile.siteUrl || "/",
    siteName: profile.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayush Raj - Full-Stack Developer",
    description: profile.heroSubtext,
    images: ["/opengraph-image"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.heroSubtext,
  url: profile.siteUrl || undefined,
  sameAs: [profile.links.github, profile.links.linkedin],
  email: profile.links.email ? `mailto:${profile.links.email}` : undefined,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.institution,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-4 focus:py-3"
        >
          Skip to content
        </a>
        <div id="main-content" className="flex min-h-full flex-1 flex-col">
          <SmoothScrollProvider>
            <ScrollProgress />
            <TargetCursorFallback />
            {children}
          </SmoothScrollProvider>
        </div>
      </body>
    </html>
  );
}
