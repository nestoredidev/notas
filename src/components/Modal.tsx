import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

function Modal({
	isOpen,
	onClose,
	title,
	children,
	maxWidth = 'md',
}: ModalProps) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)

		// Prevenir scroll del body cuando el modal está abierto
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isOpen])

	// Mapeo de clases para los diferentes tamaños
	const maxWidthClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		full: 'max-w-full',
	}

	// Evitar renderizar en SSR/durante hidratación
	if (!mounted || !isOpen) return null

	// Crear portal para renderizar el modal fuera de la jerarquía normal del DOM
	return createPortal(
		<div
			className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity'
			onClick={onClose}
		>
			<div
				className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${maxWidthClasses[maxWidth]} transition-all transform animate-fadeIn`}
				onClick={e => e.stopPropagation()} // Evitar cerrar al hacer clic dentro del modal
			>
				{title && (
					<div className='border-b border-gray-200 dark:border-gray-700 px-6 py-4'>
						<h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
							{title}
						</h3>
					</div>
				)}

				<div className='p-6 max-h-[80vh] overflow-y-auto'>{children}</div>

				<div className='absolute top-0 right-0 p-2'>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700'
						aria-label='Cerrar'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>,
		document.body
	)
}

export default Modal
