import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Penda - Find Your Love',
  description: 'Connect with people who matter. Penda means love.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
