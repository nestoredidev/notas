import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Modal from './Modal'
import { useCategories } from '@/hooks/useCategories'

interface NoteType {
	id: string
	titulo: string
	contenido: string | null
	categoria_id?: string | null
	fecha_creacion?: string
	usuario_id?: string
}

interface NoteProps {
	note: NoteType
	onEdit: (
		id: string,
		title: string,
		content: string,
		categoria_id?: string | null // Actualizado para aceptar null
	) => void
	onDelete: (id: string) => void
}

const Note: React.FC<NoteProps> = ({ note, onEdit, onDelete }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editedTitle, setEditedTitle] = useState(note.titulo)
	const [editedContent, setEditedContent] = useState(note.contenido || '')
	const [editedCategory, setEditedCategory] = useState(note.categoria_id)
	const [backgroundColor, setBackgroundColor] = useState('')
	const { categories } = useCategories()

	useEffect(() => {
		const colors = [
			'bg-slate-100',
			'bg-gray-100',
			'bg-zinc-100',
			'bg-neutral-100',
			'bg-stone-100',
			'bg-red-100',
			'bg-orange-100',
			'bg-amber-100',
			'bg-yellow-100',
			'bg-lime-100',
			'bg-green-100',
			'bg-emerald-100',
			'bg-teal-100',
			'bg-cyan-100',
			'bg-sky-100',
			'bg-blue-100',
			'bg-indigo-100',
			'bg-violet-100',
			'bg-purple-100',
			'bg-fuchsia-100',
			'bg-pink-100',
			'bg-rose-100',
		]
		const randomIndex = Math.floor(Math.random() * colors.length)
		setBackgroundColor(colors[randomIndex])
	}, [])

	const handleSave = () => {
		onEdit(note.id, editedTitle, editedContent, editedCategory)
		setIsModalOpen(false)
	}

	return (
		<div
			className={`${backgroundColor} dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow`}
		>
			<h3 className='font-medium text-gray-800 dark:text-gray-200 mb-2'>
				{note.titulo}
			</h3>
			<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
				{note.contenido || ''}
			</p>
			<div className='flex justify-between items-center'>
				<div className='flex space-x-2'>
					<button
						onClick={() => setIsModalOpen(true)}
						className='text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400'
					>
						<FaEdit />
					</button>
					<button
						onClick={() => onDelete(note.id)}
						className='text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400'
					>
						<FaTrash />
					</button>
				</div>
				{note.categoria_id && (
					<span className='px-2 py-1 text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full'>
						{categories.find(c => c.id === note.categoria_id)?.nombre ||
							'Categoría'}
					</span>
				)}
			</div>

			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					title='Editar Nota'
					maxWidth='sm'
				>
					<div className='flex flex-col gap-4'>
						<input
							type='text'
							value={editedTitle}
							onChange={e => setEditedTitle(e.target.value)}
							className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
						/>
						<textarea
							value={editedContent}
							onChange={e => setEditedContent(e.target.value)}
							className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
							rows={5}
						/>
						<select
							value={editedCategory || ''}
							onChange={e => setEditedCategory(e.target.value || undefined)}
							className='w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:focus:ring-cyan-600'
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
								onClick={() => setIsModalOpen(false)}
								className='px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
							>
								Cancelar
							</button>
							<button
								onClick={handleSave}
								className='px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600'
							>
								Guardar
							</button>
						</div>
					</div>
				</Modal>
			)}
		</div>
	)
}

export default Note
