import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engagement Rings",
  description: "Discover our collection of handcrafted engagement rings",
};

const avenir = localFont({
  src: [
    {
      path: "../../public/fonts/avenir/Avenir-Book.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
});

const montserrat = localFont({
  src: [
    {
      path: "../../public/fonts/montserrat/Montserrat-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/montserrat/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en " className={`${avenir.variable} ${montserrat.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
