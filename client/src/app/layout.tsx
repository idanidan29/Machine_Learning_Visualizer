import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BadgeProvider } from "./contexts/BadgeContext";
import { LoginModal } from "./components/LoginModal";
import { SignUpModal } from "./components/SignUpModal";
import BadgeNotification from "./components/BadgeNotification";
import { useBadge } from "./contexts/BadgeContext";

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

function BadgeNotificationWrapper() {
  const { badgeNotification, hideBadgeNotification } = useBadge();
  
  return (
    <BadgeNotification
      badge={badgeNotification?.badge}
      show={badgeNotification?.show || false}
      onClose={hideBadgeNotification}
    />
  );
}

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
        <AuthProvider>
          <BadgeProvider>
            {children}
            <LoginModal />
            <SignUpModal />
            <BadgeNotificationWrapper />
          </BadgeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
