import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
}

function Button({ label, ...rest }: ButtonProps) {
	return (
		<button
			className='
        bg-cyan-400 
        text-white 
        px-3 py-2
        md:px-4 md:py-2.5 
        rounded 
        w-full 
        sm:w-auto 
        hover:bg-cyan-500 
        transition-colors
        text-sm
        sm:text-base
        md:text-lg
        font-medium
        shadow-sm
        hover:shadow
        dark:bg-cyan-700
        dark:hover:bg-cyan-600
        dark:text-gray-100
        dark:shadow-gray-900/30
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-300
        dark:focus:ring-cyan-600
      '
			{...rest}
		>
			{label}
		</button>
	)
}

export default Button
