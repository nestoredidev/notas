'use client'
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme
		if (storedTheme) setTheme(storedTheme)
	}, [])

	useEffect(() => {
		document.documentElement.className = `${theme} transition-all duration-300`
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () =>
		setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) throw new Error('useTheme must be used within a ThemeProvider')
	return context
}
