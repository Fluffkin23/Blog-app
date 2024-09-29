"use client";
import localFont from "next/font/local";
import "./globals.css";
import {SessionProvider} from "next-auth/react";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <SessionProvider>
        {children}
      </SessionProvider>

      </body>
    </html>
  );
}
