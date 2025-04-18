import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type UseRequireAuthOptions = {
	redirectTo?: string
	onAuthenticated?: () => void
}

/**
 * Hook que verifica si el usuario está autenticado.
 * Si no lo está, redirige al usuario a la ruta especificada.
 *
 * @param options Opciones de configuración
 * @returns Un objeto con el usuario, estado de carga y error
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}) {
	const { redirectTo = '/auth/login', onAuthenticated } = options
	const { user, loading, error } = useAuth()
	const router = useRouter()

	useEffect(() => {
		// Solo ejecutar la verificación cuando la carga haya terminado
		if (!loading) {
			if (!user) {
				// Si no hay usuario autenticado, redirigir
				router.push(redirectTo)
			} else if (onAuthenticated) {
				// Si hay un callback para cuando el usuario está autenticado, ejecutarlo
				onAuthenticated()
			}
		}
	}, [user, loading, router, redirectTo, onAuthenticated])

	return { user, loading, error, isAuthenticated: !!user }
}
