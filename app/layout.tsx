import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const brains = JetBrains_Mono({
  variable: "--font-brains",
  weight: "variable"
})

export const metadata: Metadata = {
  title: "Math Exercises To Handle",
  description: "By kragleh.com",
}

export const viewport: Viewport = {
  themeColor: '#FF9900',
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${brains.variable} h-full font-brains antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-white">
        { children }
      </body>
    </html>
  )
}
