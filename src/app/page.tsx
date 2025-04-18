'use client'
import Content from '@/components/Content'
import Modal from '@/components/Modal'
import Note from '@/components/Notes'
import Sidebar from '@/components/Sidebar'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useAuth } from '@/hooks/useAuth'
import { useCategories } from '@/hooks/useCategories'
import { useNotes } from '@/hooks/useNotes'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaAngleDown } from 'react-icons/fa'

export default function Home() {
	// Este hook maneja toda la lógica de autenticación y redirección
	const { user, loading: authLoading, isAuthenticated } = useRequireAuth()
	const { signOut, getDisplayName } = useAuth()
	const router = useRouter()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [isOpen, setOpen] = useState<boolean>(false)
	const {
		notes,
		loading,
		error,
		createNote,
		editNote,
		deleteNote,
		searchNotes,
		fetchNotes,
	} = useNotes()
	const { categories, loading: categoriesLoading } = useCategories()
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')

	const handleSignOut = async () => {
		try {
			await signOut()
			router.push('/auth/login')
		} catch (error) {
			console.error('Error al cerrar sesión:', error)
		}
	}

	const handleCreateNote = async (title: string, content: string) => {
		try {
			await createNote(title, content, selectedCategory || undefined)
			setOpen(false)
			setSelectedCategory('')
		} catch (error) {
			console.error('Error al crear la nota:', error)
		}
	}

	const handleEditNote = async (
		id: string,
		title: string,
		content: string,
		categoria_id?: string | null
	) => {
		try {
			await editNote(
				id,
				title,
				content,
				categoria_id || undefined // Convertir null a undefined si es necesario
			)
		} catch (error) {
			console.error('Error al editar la nota:', error)
		}
	}

	const handleDeleteNote = async (id: string) => {
		try {
			await deleteNote(id)
		} catch (error) {
			console.error('Error al eliminar la nota:', error)
		}
	}

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm)
		}, 500) // esperar 500ms después de que el usuario deje de escribir

		return () => {
			clearTimeout(timerId)
		}
	}, [searchTerm])

	useEffect(() => {
		if (debouncedSearchTerm) {
			searchNotes(debouncedSearchTerm)
		} else {
			// Si el término de búsqueda está vacío, cargar todas las notas
			fetchNotes(selectedCategory || undefined)
		}
	}, [debouncedSearchTerm, selectedCategory])

	// Mostrar un indicador de carga mientras se verifica la autenticación
	if (authLoading) {
		return (
			<Content>
				<div className='flex justify-center items-center h-screen'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500'></div>
					<div className='ml-3 text-sm text-gray-600'>
						Verificando sesión...
					</div>
				</div>
			</Content>
		)
	}

	// Si no hay usuario autenticado, mostrar mensaje de depuración
	if (!isAuthenticated) {
		return (
			<Content>
				<div className='flex flex-col justify-center items-center h-screen'>
					<div className='text-red-500 mb-4'>
						No autenticado, redirigiendo...
					</div>
					<pre className='bg-gray-100 dark:bg-gray-800 p-4 rounded max-w-lg overflow-auto text-xs'>
						{JSON.stringify({ isAuthenticated, user }, null, 2)}
					</pre>
				</div>
			</Content>
		)
	}

	return (
		<Content className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900'>
				<header className='flex flex-col sm:flex-row justify-between items-center gap-3 p-4 flex-shrink-0'>
					<h1 className='text-2xl font-bold text-cyan-700 dark:text-cyan-300'>
						Mis Notas
					</h1>

					<div className='flex items-center gap-2 sm:gap-4'>
						<span className='text-sm text-gray-600 dark:text-gray-300 hidden sm:inline'>
							{getDisplayName()}
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
				<div className='block sm:hidden px-4 mb-2 flex-shrink-0'>
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className='w-full flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-3 text-gray-800 dark:text-gray-200 font-medium shadow-sm'
					>
						<span>Categorías</span>
						<FaAngleDown />
					</button>
				</div>

				<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 px-4 pb-4 flex-grow overflow-hidden'>
					{/* Componente Categories */}
					<Sidebar mobileMenuOpen={mobileMenuOpen} />

					{/* Panel principal de notas - Ajustado para scroll adecuado */}
					<div className='w-full sm:w-3/4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col overflow-hidden'>
						<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 flex-shrink-0'>
							<h2 className='font-bold text-xl text-gray-800 dark:text-gray-200'>
								Mis Notas
							</h2>

							<div className='flex flex-col sm:flex-row w-full sm:w-auto gap-2'>
								<div className='relative w-full sm:w-auto'>
									<input
										type='search'
										placeholder='Buscar notas...'
										className='w-full px-3 py-2 pl-3 pr-10 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
										value={searchTerm}
										onChange={e => setSearchTerm(e.target.value)}
									/>
									{searchTerm && (
										<button
											onClick={() => setSearchTerm('')}
											className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4'
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
									)}
								</div>
								<button
									onClick={() => setOpen(true)}
									className='bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors'
								>
									Nueva Nota
								</button>
							</div>
						</div>

						{/* Contenedor con scroll para las notas */}
						<div className='flex-grow overflow-y-auto bg-white dark:bg-gray-800'>
							{loading ? (
								<div className='flex justify-center items-center h-32'>
									<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500'></div>
								</div>
							) : error ? (
								<div className='text-red-500 text-center p-4'>{error}</div>
							) : notes.length > 0 ? (
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 min-h-0'>
									{notes.map(note => (
										<Note
											key={note.id}
											note={note}
											onEdit={handleEditNote}
											onDelete={handleDeleteNote}
										/>
									))}
								</div>
							) : (
								<div className='flex flex-col items-center justify-center h-32 text-gray-500 dark:text-gray-400'>
									{searchTerm ? (
										<>
											<p>No se encontraron notas</p>
											<button
												onClick={() => setSearchTerm('')}
												className='mt-2 text-cyan-500 hover:underline'
											>
												Limpiar búsqueda
											</button>
										</>
									) : (
										<p>No tienes notas. ¡Crea una nueva!</p>
									)}
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Modal permanece igual */}
				{isOpen && (
					<Modal
						isOpen={isOpen}
						onClose={() => {
							setOpen(false)
							setSelectedCategory('')
						}}
						title='Crear nueva nota'
						maxWidth='sm'
					>
						<div className='flex flex-col gap-4'>
							<input
								type='text'
								placeholder='Título de la nota'
								className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
								id='note-title'
							/>
							<textarea
								placeholder='Contenido de la nota'
								className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
								rows={5}
								id='note-content'
							/>
							<select
								value={selectedCategory}
								onChange={e => setSelectedCategory(e.target.value)}
								className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
								disabled={categoriesLoading}
							>
								<option value=''>Sin categoría</option>
								{categories.map(category => (
									<option key={category.id} value={category.id}>
										{category.nombre}
									</option>
								))}
							</select>
							<div className='flex justify-end gap-2'>
								<button
									onClick={() => {
										setOpen(false)
										setSelectedCategory('')
									}}
									className='px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
								>
									Cancelar
								</button>
								<button
									onClick={() => {
										const titleInput = document.getElementById(
											'note-title'
										) as HTMLInputElement
										const contentInput = document.getElementById(
											'note-content'
										) as HTMLTextAreaElement
										if (titleInput && contentInput) {
											handleCreateNote(titleInput.value, contentInput.value)
										}
									}}
									className='px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600'
								>
									Guardar
								</button>
							</div>
						</div>
					</Modal>
				)}
			</div>
		</Content>
	)
}
