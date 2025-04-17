'use client'
import Content from '@/components/Content'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useAuth } from '@/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

function ResetPassword() {
	const { supabase } = useAuth()
	const router = useRouter()
	const searchParams = useSearchParams()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	// Verificar que el enlace contiene el token necesario
	useEffect(() => {
		const token = searchParams.get('token')
		if (!token) {
			setError(
				'Enlace inválido. Por favor solicita un nuevo enlace para restablecer tu contraseña.'
			)
		}
	}, [searchParams])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		setError(null)

		const formData = new FormData(e.currentTarget)
		const password = formData.get('password') as string
		const confirmPassword = formData.get('confirmPassword') as string

		// Validar que las contraseñas coincidan
		if (password !== confirmPassword) {
			setError('Las contraseñas no coinciden')
			setLoading(false)
			return
		}

		try {
			// Usar el método de Supabase para actualizar contraseña
			const { error } = await supabase.auth.updateUser({ password })

			if (error) {
				throw error
			}

			setSuccess('Tu contraseña ha sido actualizada correctamente')

			// Redirigir al login después de 3 segundos
			setTimeout(() => {
				router.push('/login')
			}, 3000)
		} catch (err: unknown) {
			setError(
				err instanceof Error
					? err.message
					: 'Error al restablecer la contraseña'
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
					Nueva Contraseña
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
						Ingresa tu nueva contraseña
					</p>

					<div className='flex flex-col gap-2'>
						<Label label='Nueva contraseña' />
						<Input
							label='Contraseña'
							name='password'
							id='password'
							type='password'
							autoComplete='new-password'
							required
							minLength={8}
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<Label label='Confirmar contraseña' />
						<Input
							label='Confirma tu contraseña'
							name='confirmPassword'
							id='confirmPassword'
							type='password'
							autoComplete='new-password'
							required
							minLength={8}
						/>
					</div>

					<div className='mt-2'>
						<Button
							label={loading ? 'Actualizando...' : 'Actualizar contraseña'}
							type='submit'
							disabled={loading}
						/>
					</div>
				</form>
			</div>
		</Content>
	)
}

export default ResetPassword
