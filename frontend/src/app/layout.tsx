import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "เกมสะสมคะแนน Nextzy",
  description: "สุ่มคะแนน สะสมแต้ม และรับรางวัลตาม checkpoint",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={kanit.variable}>
      <body>
        <div className="mx-auto flex min-h-dvh w-full max-w-[500px] flex-col bg-white shadow-sm">
          {children}
        </div>
      </body>
    </html>
  );
}