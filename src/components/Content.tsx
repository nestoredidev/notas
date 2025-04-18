import React, { ReactNode } from 'react'

interface ContentProps {
	children: ReactNode
	className?: string
}

function Content({ children, className = '' }: ContentProps) {
	return (
		<main
			className={`w-full mx-auto px-4 py-8 min-h-screen bg-cyan-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors ${className}`}
		>
			{children}
		</main>
	)
}

export default Content
