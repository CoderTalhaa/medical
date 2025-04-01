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
  title: "Medical",
  description:
    "It&rsquo;s not a faith in technology. It&rsquo;s faith in people",
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
        {/* <Cursor /> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
