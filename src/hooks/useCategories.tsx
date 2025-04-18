import supabase from '@/supabase/supbase.config'
import { useState, useEffect } from 'react'

export interface Category {
	id: string
	nombre: string
	descripcion: string | null
	usuario_id: string
}

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		try {
			setLoading(true)
			const {
				data: { user },
			} = await supabase.auth.getUser()
			if (!user) {
				throw new Error('Usuario no autenticado')
			}

			const { data, error } = await supabase.from('categorias').select('*')

			if (error) {
				console.error('Error al cargar categorías:', error)
				throw error
			}

			if (data) {
				setCategories(data)
			} else {
				setCategories([])
			}
		} catch (error) {
			console.error('Error al cargar categorías:', error)
			setError('Error al cargar categorías')
		} finally {
			setLoading(false)
		}
	}

	const createCategory = async (nombre: string, descripcion?: string) => {
		try {
			const { data, error } = await supabase
				.from('categorias')
				.insert([
					{
						nombre,
						descripcion: descripcion || null,
					},
				])
				.select()
				.single()

			if (error) throw error
			setCategories(prev => [...prev, data])
			return data
		} catch (error) {
			console.error('Error al crear categoría:', error)
			throw error
		}
	}

	const editCategory = async (
		id: string,
		nombre: string,
		descripcion?: string
	) => {
		try {
			const { data, error } = await supabase
				.from('categorias')
				.update({
					nombre,
					descripcion: descripcion || null,
				})
				.eq('id', id)
				.select()
				.single()

			if (error) throw error
			setCategories(prev => prev.map(cat => (cat.id === id ? data : cat)))
			return data
		} catch (error) {
			console.error('Error al editar categoría:', error)
			throw error
		}
	}

	const deleteCategory = async (id: string) => {
		try {
			const { error } = await supabase.from('categorias').delete().eq('id', id)

			if (error) throw error
			setCategories(prev => prev.filter(cat => cat.id !== id))
		} catch (error) {
			console.error('Error al eliminar categoría:', error)
			throw error
		}
	}

	return {
		categories,
		loading,
		error,
		fetchCategories,
		createCategory,
		editCategory,
		deleteCategory,
	}
}
