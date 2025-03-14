import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AppNotes - Your Notes, Now Answering Back",
  description: "Upload your documents and get AI-powered answers",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  )
}
