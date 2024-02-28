import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const san = Open_Sans({subsets:["latin"]});

export const metadata: Metadata = {
  title: "北美直连",
  description: "帮你选择加拿大移民项目和机构",
  applicationName: "北美直连",
  authors: { name: "Yuan Huang", url: "https://github.com/huangyuan3h" },
  keywords: ["加拿大","移民"],

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={san.className}>{children}</body>
    </html>
  );
}
