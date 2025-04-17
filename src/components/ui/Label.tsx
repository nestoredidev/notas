import React from 'react'
interface LabelProps {
	label: string
}
function Label({ label, ...rest }: LabelProps) {
	return (
		<label
			{...rest}
			className='text-base p-2 font-light sm:text-base sm:p-1 text-gray-700 dark:text-gray-200 transition-colors'
		>
			{label}
		</label>
	)
}

export default Label
