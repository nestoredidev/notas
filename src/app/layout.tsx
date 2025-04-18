import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/usetheme'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['400', '700'],
})

export const metadata: Metadata = {
	title: 'Notas',
	description: 'Notas web app',
	icons: '/note.svg',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${montserrat.variable}antialiased`}>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	)
}
