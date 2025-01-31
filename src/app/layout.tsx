// import { ConfigureAmplifyClientSide } from '@/components/ConfigureAmplify';
import { Noto_Sans_JP, M_PLUS_Rounded_1c } from "next/font/google";
import type { Metadata } from 'next';
import './globals.css';

const noto = Noto_Sans_JP({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-Noto-Sans-JP",
  display: "swap",
});

const mplus = M_PLUS_Rounded_1c({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-M-PLUS-Rounded-1c",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${noto.variable} ${mplus.variable} font-noto`}>
        {/* <ConfigureAmplifyClientSide /> */}
        {children}
      </body>
    </html>
  );
}