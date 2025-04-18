import supabase from '@/supabase/supbase.config'
import { useState, useEffect } from 'react'

export interface Note {
	id: string
	titulo: string
	contenido: string | null
	fecha_creacion: string
	categoria_id: string | null
	usuario_id: string
}

export function useNotes() {
	const [notes, setNotes] = useState<Note[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Cargar notas al montar el componente
	useEffect(() => {
		fetchNotes()
	}, [])

	// Obtener todas las notas
	const fetchNotes = async (categoriaId?: string) => {
		try {
			setLoading(true)
			const {
				data: { user },
			} = await supabase.auth.getUser()

			let query = supabase
				.from('notas')
				.select('*')
				.eq('usuario_id', user?.id)
				.order('fecha_creacion', { ascending: false })

			if (categoriaId) {
				query = query.eq('categoria_id', categoriaId)
			}

			const { data, error } = await query

			if (error) throw error

			setNotes(data || [])
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al cargar notas')
		} finally {
			setLoading(false)
		}
	}

	// Crear una nueva nota
	const createNote = async (
		titulo: string,
		contenido: string,
		categoriaId?: string
	) => {
		try {
			setLoading(true)
			const {
				data: { user },
			} = await supabase.auth.getUser()

			const { data, error } = await supabase
				.from('notas')
				.insert([
					{
						titulo,
						contenido,
						categoria_id: categoriaId || null,
						usuario_id: user?.id,
					},
				])
				.select()
				.single()

			if (error) throw error

			setNotes(prev => [data, ...prev])
			return data
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al crear nota')
			throw err
		} finally {
			setLoading(false)
		}
	}

	// Editar una nota existente
	const editNote = async (
		id: string,
		titulo: string,
		contenido: string,
		categoriaId?: string
	) => {
		try {
			setLoading(true)
			const { data, error } = await supabase
				.from('notas')
				.update({
					titulo,
					contenido,
					categoria_id: categoriaId || null,
				})
				.eq('id', id)
				.select()
				.single()

			if (error) throw error

			setNotes(prev =>
				prev.map(note => (note.id === id ? { ...note, ...data } : note))
			)
			return data
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al editar nota')
			throw err
		} finally {
			setLoading(false)
		}
	}

	// Eliminar una nota
	const deleteNote = async (id: string) => {
		try {
			setLoading(true)
			const { error } = await supabase.from('notas').delete().eq('id', id)

			if (error) throw error

			setNotes(prev => prev.filter(note => note.id !== id))
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al eliminar nota')
			throw err
		} finally {
			setLoading(false)
		}
	}

	// Buscar notas
	const searchNotes = async (searchTerm: string) => {
		try {
			setLoading(true)
			const {
				data: { user },
			} = await supabase.auth.getUser()

			const { data, error } = await supabase
				.from('notas')
				.select('*')
				.eq('usuario_id', user?.id)
				.or(`titulo.ilike.%${searchTerm}%,contenido.ilike.%${searchTerm}%`)
				.order('fecha_creacion', { ascending: false })

			if (error) throw error

			setNotes(data || [])
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Error al buscar notas')
		} finally {
			setLoading(false)
		}
	}

	return {
		notes,
		loading,
		error,
		createNote,
		editNote,
		deleteNote,
		fetchNotes,
		searchNotes,
	}
}
