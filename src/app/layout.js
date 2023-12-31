"use client";

import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { Open_Sans } from "next/font/google";

import Footer from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react";


const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="container">
          <SessionProvider>
            <Navbar />
            {children}
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
