import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const space = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SATSET (Steganalysis Tools Set)",
  description: "SATSET (Steganalysis Tools Set)",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={space.className}>{children}</body>
    </html>
  )
}
