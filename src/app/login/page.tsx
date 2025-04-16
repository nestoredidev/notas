'use client'
import Content from '@/components/Content'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import Link from 'next/link'
import React from 'react'

function Login() {
	return (
		<Content>
			<div className='flex justify-end mb-6'>
				<ThemeSwitcher />
			</div>

			<div className='max-w-md w-full mx-auto'>
				<h3 className='text-center text-3xl font-bold mb-8 text-cyan-700 dark:text-cyan-200'>
					Ingresar
				</h3>

				<form className='flex flex-col gap-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors'>
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
						<Button label='Iniciar Sesión' type='submit' />
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
