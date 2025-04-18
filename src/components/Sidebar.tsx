import React, { useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { useCategories } from '@/hooks/useCategories'
import Modal from './Modal'

interface SidebarProps {
	mobileMenuOpen: boolean
}

function Sidebar({ mobileMenuOpen }: SidebarProps) {
	const {
		categories,
		loading,
		error,
		createCategory,
		editCategory,
		deleteCategory,
	} = useCategories()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingCategory, setEditingCategory] = useState<{
		id: string
		nombre: string
		descripcion: string | null
	} | null>(null)
	const [newCategoryName, setNewCategoryName] = useState('')
	const [newCategoryDescription, setNewCategoryDescription] = useState('')

	const handleCreateCategory = async () => {
		try {
			await createCategory(newCategoryName, newCategoryDescription)
			setNewCategoryName('')
			setNewCategoryDescription('')
			setIsModalOpen(false)
		} catch (error) {
			console.error('Error al crear categoría:', error)
		}
	}

	const handleEditCategory = async () => {
		if (!editingCategory) return

		try {
			await editCategory(
				editingCategory.id,
				newCategoryName,
				newCategoryDescription
			)
			setNewCategoryName('')
			setNewCategoryDescription('')
			setEditingCategory(null)
			setIsModalOpen(false)
		} catch (error) {
			console.error('Error al editar categoría:', error)
		}
	}

	const handleDeleteCategory = async (id: string) => {
		if (
			window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')
		) {
			try {
				await deleteCategory(id)
			} catch (error) {
				console.error('Error al eliminar categoría:', error)
			}
		}
	}

	const openEditModal = (category: {
		id: string
		nombre: string
		descripcion: string | null
	}) => {
		setEditingCategory(category)
		setNewCategoryName(category.nombre)
		setNewCategoryDescription(category.descripcion || '')
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setEditingCategory(null)
		setNewCategoryName('')
		setNewCategoryDescription('')
	}

	return (
		<>
			<div
				className={`${
					mobileMenuOpen ? 'block' : 'hidden'
				} sm:block w-full sm:w-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 overflow-auto mb-4 sm:mb-0`}
			>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='font-bold text-lg text-gray-800 dark:text-gray-200'>
						Categorías
					</h2>
					<button
						onClick={() => setIsModalOpen(true)}
						className='text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 border-1'
					>
						<FaPlus />
					</button>
				</div>

				{error && (
					<div className='mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm'>
						{error}
					</div>
				)}

				<div className='flex flex-wrap sm:flex-col gap-2 sm:space-y-2'>
					{loading ? (
						<div className='text-gray-500 dark:text-gray-400'>Cargando...</div>
					) : (
						categories.map(category => (
							<div
								key={category.id}
								className='group p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg text-cyan-700 dark:text-cyan-300 font-medium cursor-pointer text-sm sm:text-base flex justify-between items-center'
							>
								<span className='truncate flex-1 mr-2'>{category.nombre}</span>
								<div className='flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity'>
									<button
										onClick={() => openEditModal(category)}
										className='p-1.5 text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 bg-white dark:bg-gray-700 rounded-full shadow-sm'
										aria-label='Editar categoría'
									>
										<FaEdit className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
									</button>
									<button
										onClick={() => handleDeleteCategory(category.id)}
										className='p-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-white dark:bg-gray-700 rounded-full shadow-sm'
										aria-label='Eliminar categoría'
									>
										<FaTrash className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>

			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
					maxWidth='sm'
				>
					<div className='flex flex-col gap-4'>
						<input
							type='text'
							value={newCategoryName}
							onChange={e => setNewCategoryName(e.target.value)}
							placeholder='Nombre de la categoría'
							className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
						/>
						<textarea
							value={newCategoryDescription}
							onChange={e => setNewCategoryDescription(e.target.value)}
							placeholder='Descripción (opcional)'
							className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
							rows={3}
						/>
						<div className='flex justify-end gap-2'>
							<button
								onClick={closeModal}
								className='px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
							>
								Cancelar
							</button>
							<button
								onClick={
									editingCategory ? handleEditCategory : handleCreateCategory
								}
								className='px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600'
							>
								{editingCategory ? 'Guardar' : 'Crear'}
							</button>
						</div>
					</div>
				</Modal>
			)}
		</>
	)
}

export default Sidebar
