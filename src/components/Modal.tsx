import React from 'react'
import { FaTimes } from 'react-icons/fa'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	maxWidth = 'md',
}) => {
	if (!isOpen) return null

	const maxWidthClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
	}

	return (
		<div className='fixed inset-0 z-50 overflow-y-auto'>
			<div className='flex items-center justify-center min-h-screen px-4 py-4'>
				<div
					className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
					onClick={onClose}
				></div>

				<div
					className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl ${maxWidthClasses[maxWidth]} w-full`}
				>
					<div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700'>
						<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
							{title}
						</h3>
						<button
							onClick={onClose}
							className='text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
						>
							<FaTimes className='w-5 h-5' />
						</button>
					</div>

					<div className='p-4'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
