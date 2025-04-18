'use client'
import Content from '@/components/Content'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Register() {
	const { signUp } = useAuth()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const displayName = formData.get('user') as string // Captura el nombre de usuario

		try {
			// Pasa el displayName como tercer parámetro a signUp
			const { error } = await signUp(email, password, displayName)

			if (error) {
				setError(error.message)
			} else {
				// Registro exitoso, redirigir o mostrar mensaje
				router.push('/login?registered=true')
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || 'Error al registrarse')
			} else {
				setError('Error al registrarse')
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
					Crear cuenta
				</h3>

				{error && (
					<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
						{error}
					</div>
				)}

				<form
					className='flex flex-col gap-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors'
					onSubmit={handleSubmit}
				>
					<div className='flex flex-col gap-2'>
						<Label label='Nombre de usuario' />
						<Input
							label='Usuario'
							name='user'
							id='user'
							autoComplete='username'
							required
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<Label label='Correo electrónico' />
						<Input
							label='Email'
							name='email'
							id='email'
							type='email'
							autoComplete='email'
							required
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<Label label='Contraseña' />
						<Input
							label='Contraseña'
							name='password'
							id='password'
							type='password'
							autoComplete='new-password'
							required
						/>
					</div>

					<div className='mt-2'>
						<Button
							label={loading ? 'Registrando...' : 'Registrarse'}
							type='submit'
							disabled={loading}
						/>
					</div>
				</form>

				<div className='flex items-center justify-center mt-6 space-x-2'>
					<span className='text-gray-600 dark:text-gray-300'>
						¿Ya tienes cuenta?
					</span>
					<Link href='/auth/login'>
						<span className='text-cyan-600 font-semibold hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300'>
							Iniciar sesión
						</span>
					</Link>
				</div>
			</div>
		</Content>
	)
}

export default Register
