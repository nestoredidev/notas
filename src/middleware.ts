import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas públicas que no requieren autenticación
const publicRoutes = [
	'/auth/login',
	'/auth/register',
	'/auth/forgot-password',
	'/auth/reset-password',
	'/auth/callback',
]

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname
	console.log('Middleware processing path:', path)

	// Para depuración: permitir acceso a la ruta raíz sin verificación
	if (path === '/') {
		console.log('Acceso directo a la ruta raíz permitido temporalmente')
		return NextResponse.next()
	}

	// Crear cliente Supabase
	const res = NextResponse.next()
	const supabase = createMiddlewareClient({ req: request, res })

	try {
		// Verificar sesión con manejo de errores
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession()

		if (error) {
			console.error('Error al verificar la sesión:', error.message)
			// Si hay error al verificar la sesión, redirigir a login
			return NextResponse.redirect(new URL('/login', request.url))
		}

		const isAuthenticated = !!session
		console.log(
			`Usuario ${
				isAuthenticated ? 'autenticado' : 'no autenticado'
			} para ruta: ${path}`
		)

		// Si es una ruta pública, permitir acceso
		if (publicRoutes.some(route => path.startsWith(route))) {
			// Si está autenticado intentando acceder a login/register, redirigir a home
			if (
				isAuthenticated &&
				(path === '/auth/login' || path === '/auth/register')
			) {
				return NextResponse.redirect(new URL('/', request.url))
			}
			return res
		}

		// Si no está autenticado y no es ruta pública, redirigir a login
		if (!isAuthenticated) {
			return NextResponse.redirect(new URL('/auth/login', request.url))
		}

		// Usuario autenticado accediendo a ruta protegida, permitir
		return res
	} catch (err) {
		console.error('Error crítico en middleware:', err)
		// En caso de error inesperado, redirigir a le8ogin
		return NextResponse.redirect(new URL('/auth/qlogin', request.url))
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
}
