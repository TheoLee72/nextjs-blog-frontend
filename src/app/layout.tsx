import type { Metadata } from 'next';
import type { Viewport } from 'next';
import './globals.css';
import { Inter, Noto_Serif } from 'next/font/google';

const inter = Inter({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSerif = Noto_Serif({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  title: 'TheoLee',
  description: "TheoLee's Blog",
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 확대 방지
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll scrollbar-hide">
      <body className={`${inter.variable} ${notoSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
