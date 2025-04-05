import { Inter, Manrope, Bungee, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/utils/nav/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const bungee = Bungee({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bungee",
});

export const metadata = {
  title: "HRC-Stochastic Studio",
  description:
    "HRC Stochastic Studio is a research-driven lab focused on leveraging data, stochastic modeling, and design to advance innovation in medical science and healthcare solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/T.svg" />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} ${manrope.variable} ${bungee.variable} antialiased text-text2 bg-black`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
