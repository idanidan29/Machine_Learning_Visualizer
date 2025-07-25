import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { AuthProvider } from "./contexts/AuthContext";
// import { LoginModal } from "./components/LoginModal";
// import { SignUpModal } from "./components/SignUpModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ML visualizer",
  description: "Visualize machine learning algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <AuthProvider> */}
          {children}
          {/* <LoginModal />
          <SignUpModal /> */}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
