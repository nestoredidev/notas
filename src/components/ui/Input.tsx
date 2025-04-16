import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

function Input({ label, ...rest }: InputProps) {
	return (
		<input
			placeholder={label}
			className='
                w-full
                max-w-md
                px-4 py-2
                border border-gray-300
                rounded
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400
                text-base
                transition-all
                bg-white
                text-gray-900
                placeholder-gray-400
                hover:border-gray-400
                dark:bg-gray-800
                dark:border-gray-700
                dark:text-gray-100
                dark:placeholder-gray-500
                dark:hover:border-gray-600
                dark:focus:ring-cyan-600
                shadow-sm
            '
			{...rest}
		/>
	)
}

export default Input
