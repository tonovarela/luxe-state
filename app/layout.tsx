import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Discover Screen - Premium Real Estate",
  description: "Find your sanctuary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light text-nordic-dark font-display antialiased selection:bg-mosque selection:text-white">
        {children}
      </body>
    </html>
  );
}
