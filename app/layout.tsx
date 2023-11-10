import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"

const space = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sat-Set (Steganographic Android Tool Set)",
  description: "Sat-Set (Steganographic Android Tool Set)",
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
