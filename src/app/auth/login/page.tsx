'use client'
import Content from '@/components/Content'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

function Login() {
	const { signIn } = useAuth()
	const router = useRouter()
	const searchParams = useSearchParams()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	// Verificar si viene de registro exitoso
	useEffect(() => {
		const registered = searchParams.get('registered')
		if (registered === 'true') {
			setSuccess('Registro exitoso. Por favor inicia sesión.')
		}
	}, [searchParams])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		try {
			const { error } = await signIn(email, password)

			if (error) {
				setError(error.message)
			} else {
				// Inicio de sesión exitoso, redirigir al dashboard
				router.push('/')
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Error al iniciar sesión')
			} else {
				setError('Error al iniciar sesión')
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<Content>
			<div className='flex justify-end mb-6'>
				<ThemeSwitcher />
			</div>

			<div className='max-w-md w-full mx-auto'>
				<h3 className='text-center text-3xl font-bold mb-8 text-cyan-700 dark:text-cyan-200'>
					Ingresar
				</h3>

				{error && (
					<div className='mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 rounded'>
						{error}
					</div>
				)}

				{success && (
					<div className='mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-800 text-green-700 dark:text-green-300 rounded'>
						{success}
					</div>
				)}

				<form
					className='flex flex-col gap-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors'
					onSubmit={handleSubmit}
				>
					<div className='flex flex-col gap-2'>
						<Label label='Correo electrónico' />
						<Input
							label='Ingrese su correo'
							name='email'
							id='email'
							type='email'
							autoComplete='email'
							required
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<div className='flex justify-between'>
							<Label label='Contraseña' />
							<Link href='/forgot-password'>
								<span className='text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300'>
									¿Olvidó su contraseña?
								</span>
							</Link>
						</div>
						<Input
							label='Ingrese su contraseña'
							name='password'
							id='password'
							type='password'
							autoComplete='current-password'
							required
						/>
					</div>

					<div className='mt-2'>
						<Button
							label={loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
							type='submit'
							disabled={loading}
						/>
					</div>
				</form>

				<div className='flex items-center justify-center mt-6 space-x-2'>
					<span className='text-gray-600 dark:text-gray-300'>
						¿No tienes cuenta?
					</span>
					<Link href='/register'>
						<span className='text-cyan-600 font-semibold hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300'>
							Registrarse
						</span>
					</Link>
				</div>
			</div>
		</Content>
	)
}

export default Login
