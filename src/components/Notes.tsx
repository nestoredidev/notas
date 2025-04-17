import React, { useState, useEffect } from 'react'

interface NoteProps {
	title: string
	description: string
	category: string
	date: string
}

// Definir colores disponibles para las notas
enum ColorType {
	YELLOW = 'yellow',
	BLUE = 'blue',
	GREEN = 'green',
	RED = 'red',
	PURPLE = 'purple',
	PINK = 'pink',
}

// Mapeo de colores a clases de tailwind
const colorClasses = {
	[ColorType.YELLOW]: {
		bg: 'bg-yellow-50 dark:bg-yellow-900/20',
		border: 'border-yellow-100 dark:border-yellow-900/50',
		category:
			'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
	},
	[ColorType.BLUE]: {
		bg: 'bg-blue-50 dark:bg-blue-900/20',
		border: 'border-blue-100 dark:border-blue-900/50',
		category:
			'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
	},
	[ColorType.GREEN]: {
		bg: 'bg-green-50 dark:bg-green-900/20',
		border: 'border-green-100 dark:border-green-900/50',
		category:
			'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
	},
	[ColorType.RED]: {
		bg: 'bg-red-50 dark:bg-red-900/20',
		border: 'border-red-100 dark:border-red-900/50',
		category: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
	},
	[ColorType.PURPLE]: {
		bg: 'bg-purple-50 dark:bg-purple-900/20',
		border: 'border-purple-100 dark:border-purple-900/50',
		category:
			'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
	},
	[ColorType.PINK]: {
		bg: 'bg-pink-50 dark:bg-pink-900/20',
		border: 'border-pink-100 dark:border-pink-900/50',
		category:
			'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
	},
}

function Note({ title, description, category, date }: NoteProps) {
	const [color, setColor] = useState<ColorType>(ColorType.YELLOW)

	// Generar un color aleatorio al montar el componente
	useEffect(() => {
		const colors = Object.values(ColorType)
		const randomIndex = Math.floor(Math.random() * colors.length)
		setColor(colors[randomIndex] as ColorType)
	}, [])

	const colorClass = colorClasses[color]

	return (
		<div
			className={`${colorClass.bg} p-4 rounded-lg border ${colorClass.border} shadow-sm hover:shadow-md transition-shadow`}
		>
			<h3 className='font-medium text-gray-800 dark:text-gray-200 mb-2'>
				{title}
			</h3>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
				{description}
			</p>
			<div className='flex justify-between items-center'>
				<span className='text-xs text-gray-500 dark:text-gray-500'>{date}</span>
				<span
					className={`px-2 py-1 text-xs ${colorClass.category} rounded-full`}
				>
					{category}
				</span>
			</div>
		</div>
	)
}

export default Note
