import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Desa Siboro | Website Resmi Desa Siboro",
    template: "%s | Desa Siboro",
  },
  description: "Website resmi Desa Siboro, Kecamatan Sianjur Mula-Mula, Kabupaten Samosir, Sumatera Utara.",
  keywords: ["Desa Siboro", "website desa", "profil desa", "berita desa", "galeri desa"],
  metadataBase: new URL("https://desa-siboro.vercel.app"),
  alternates: {
    canonical: "https://desa-siboro.vercel.app",
  },
  openGraph: {
    title: "Desa Siboro | Website Resmi Desa Siboro",
    description: "Website resmi Desa Siboro, Kecamatan Sianjur Mula-Mula, Kabupaten Samosir, Sumatera Utara.",
    url: "https://desa-siboro.vercel.app",
    siteName: "Desa Siboro",
    type: "website",
    locale: "id_ID",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Desa Siboro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Siboro | Website Resmi Desa Siboro",
    description: "Website resmi Desa Siboro, Kecamatan Sianjur Mula-Mula, Kabupaten Samosir, Sumatera Utara.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <ConditionalLayout navbar={<Navbar />} footer={<Footer />}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
