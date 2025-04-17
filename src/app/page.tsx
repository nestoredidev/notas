'use client'
import Content from '@/components/Content'
import Modal from '@/components/Modal'
import Note from '@/components/Notes'
import Sidebar from '@/components/Sidebar'

import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

export default function Home() {
	const { signOut, getDisplayName } = useAuth()
	const router = useRouter()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [isOpen, setOpen] = useState<boolean>(false)

	const handleSignOut = async () => {
		try {
			await signOut()
			router.push('/login')
		} catch (error) {
			console.error('Error al cerrar sesión:', error)
		}
	}

	return (
		<Content>
			<header className='flex flex-col sm:flex-row justify-between items-center mb-6 gap-3'>
				<h1 className='text-2xl font-bold text-cyan-700 dark:text-cyan-300'>
					Mis Notas
				</h1>

				<div className='flex items-center gap-2 sm:gap-4'>
					<span className='text-sm text-gray-600 dark:text-gray-300 hidden sm:inline'>
						{getDisplayName ? getDisplayName() : 'Usuario'}
					</span>
					<ThemeSwitcher />
					<button
						onClick={handleSignOut}
						className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium transition-colors'
					>
						Cerrar Sesión
					</button>
				</div>
			</header>

			{/* Botón para mostrar/ocultar categorías en móvil */}
			<div className='block sm:hidden mb-4'>
				<button
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					className='w-full flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 text-gray-800 dark:text-gray-200 font-medium shadow-sm'
				>
					<span>Categorías</span>
					<FaAngleDown />
				</button>
			</div>

			<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 h-auto sm:h-[calc(100vh-180px)]'>
				{/* Componente Categories */}
				<Sidebar mobileMenuOpen={mobileMenuOpen} />

				{/* Panel principal de notas */}
				<div className='w-full sm:w-3/4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 overflow-auto'>
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
						<h2 className='font-bold text-xl text-gray-800 dark:text-gray-200'>
							Mis Notas
						</h2>

						<div className='flex flex-col sm:flex-row w-full sm:w-auto gap-2'>
							<input
								type='text'
								placeholder='Buscar notas...'
								className='w-full sm:w-auto px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
							/>
							<button
								onClick={() => setOpen(true)}
								className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors'
							>
								Nueva Nota
							</button>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
						{/* Ejemplo de tarjetas de notas */}

						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
						<Note
							title='Reunion de trabajo'
							description='Hora las 2 de la tarde'
							date='1 hora'
							category='Trabajo'
						/>
					</div>
				</div>
				{isOpen && (
					<Modal
						isOpen={isOpen}
						onClose={() => setOpen(false)}
						title='Create nueva nota'
						maxWidth='sm'
					>
						<p>Contenido del modal aquí...</p>
						<div className='mt-4 flex justify-end'>
							<button
								onClick={() => setOpen(false)}
								className='bg-cyan-500 text-white px-4 py-2 rounded'
							>
								Cerrar
							</button>
						</div>
					</Modal>
				)}
			</div>
		</Content>
	)
}
