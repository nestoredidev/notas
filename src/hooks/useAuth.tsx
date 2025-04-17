import supabase from '@/supabase/supbase.config'
import { useState, useEffect } from 'react'
import { User, AuthError as SupabaseAuthError } from '@supabase/supabase-js'

type AuthError = {
	message: string
}

type AuthResponse = {
	user: User | null
	error: AuthError | null
	loading: boolean
}

type UserProfile = {
	username?: string
	avatarUrl?: string
	displayName?: string
	bio?: string
}

export function useAuth() {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<AuthError | null>(null)

	// Verificar sesión actual al cargar
	useEffect(() => {
		const checkSession = async () => {
			try {
				const {
					data: { session },
				} = await supabase.auth.getSession()
				setUser(session?.user || null)
			} catch (err: unknown) {
				setError({
					message: (err as Error)?.message || 'Error al verificar sesión',
				})
			} finally {
				setLoading(false)
			}
		}

		// Listener para cambios en el estado de autenticación
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user || null)
			setLoading(false)
		})

		checkSession()

		// Limpieza al desmontar
		return () => {
			subscription.unsubscribe()
		}
	}, [])

	// Registro con email/password y displayName opcional
	const signUp = async (
		email: string,
		password: string,
		displayName?: string
	): Promise<AuthResponse> => {
		setLoading(true)
		setError(null)

		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						displayName: displayName || email.split('@')[0],
					},
				},
			})

			if (error) throw error
			return { user: data.user, error: null, loading: false }
		} catch (err: unknown) {
			const authError = err as SupabaseAuthError
			setError({ message: authError.message || 'Error al registrarse' })
			return {
				user: null,
				error: { message: authError.message || 'Error al registrarse' },
				loading: false,
			}
		} finally {
			setLoading(false)
		}
	}

	// Iniciar sesión con email/password
	const signIn = async (
		email: string,
		password: string
	): Promise<AuthResponse> => {
		setLoading(true)
		setError(null)

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			})

			if (error) throw error
			return { user: data.user, error: null, loading: false }
		} catch (err: unknown) {
			const authError = err as SupabaseAuthError
			setError({ message: authError.message || 'Error al iniciar sesión' })
			return {
				user: null,
				error: { message: authError.message || 'Error al iniciar sesión' },
				loading: false,
			}
		} finally {
			setLoading(false)
		}
	}

	// Cerrar sesión
	const signOut = async (): Promise<void> => {
		setLoading(true)
		try {
			await supabase.auth.signOut()
		} catch (err: unknown) {
			const authError = err as SupabaseAuthError
			setError({ message: authError.message || 'Error al cerrar sesión' })
		} finally {
			setLoading(false)
		}
	}

	// Recuperar contraseña
	const resetPassword = async (
		email: string
	): Promise<{ error: AuthError | null }> => {
		setLoading(true)
		setError(null)

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/reset-password`,
			})

			if (error) throw error
			return { error: null }
		} catch (err: unknown) {
			const authError = err as SupabaseAuthError
			setError({
				message: authError.message || 'Error al restablecer contraseña',
			})
			return {
				error: {
					message: authError.message || 'Error al restablecer contraseña',
				},
			}
		} finally {
			setLoading(false)
		}
	}

	// Actualizar datos del usuario con typed payload
	const updateUserProfile = async (
		userData: UserProfile
	): Promise<{ error: AuthError | null }> => {
		try {
			const { error } = await supabase.auth.updateUser({
				data: userData,
			})

			if (error) throw error
			return { error: null }
		} catch (err: unknown) {
			const authError = err as SupabaseAuthError
			return {
				error: { message: authError.message || 'Error al actualizar perfil' },
			}
		}
	}

	// Obtener display name del usuario
	const getDisplayName = (): string => {
		if (!user) return ''

		// Orden de prioridad: displayName de metadatos, email, id
		return (
			(user.user_metadata?.displayName as string) ||
			user.email?.split('@')[0] ||
			user.id?.substring(0, 8) ||
			'Usuario'
		)
	}

	return {
		user,
		loading,
		error,
		signUp,
		signIn,
		signOut,
		resetPassword,
		updateUserProfile,
		getDisplayName,
		supabase,
	}
}
