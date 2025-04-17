'use client'
import Content from '@/components/Content'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import React, { useState } from 'react'

function ForgotPassword() {
	const { resetPassword } = useAuth()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		setSuccess(null)

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string

		try {
			const { error } = await resetPassword(email)

			if (error) {
				setError(error.message)
			} else {
				setSuccess(
					'Te hemos enviado un enlace para restablecer tu contraseña. Por favor revisa tu correo.'
				)
			}
		} catch (err: unknown) {
			setError(
				err instanceof Error
					? err.message
					: 'Error al enviar el correo de recuperación'
			)
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
					Recuperar Contraseña
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
					<p className='text-gray-600 dark:text-gray-300 text-sm text-center'>
						Ingresa tu correo electrónico y te enviaremos un enlace para
						restablecer tu contraseña.
					</p>

					<div className='flex flex-col gap-2'>
						<Label label='Correo electrónico' />
						<Input
							label='Ingresa tu correo'
							name='email'
							id='email'
							type='email'
							autoComplete='email'
							required
						/>
					</div>

					<div className='mt-2'>
						<Button
							label={loading ? 'Enviando...' : 'Enviar enlace'}
							type='submit'
							disabled={loading}
						/>
					</div>
				</form>

				<div className='flex items-center justify-center mt-6 space-x-2'>
					<Link href='/login'>
						<span className='text-cyan-600 font-medium hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300'>
							Volver a iniciar sesión
						</span>
					</Link>
				</div>
			</div>
		</Content>
	)
}

export default ForgotPassword
