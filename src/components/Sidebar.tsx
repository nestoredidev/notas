import React from 'react'
import { FaPlus } from 'react-icons/fa'

interface SidebarProps {
	mobileMenuOpen: boolean
}

function Sidebar({ mobileMenuOpen }: SidebarProps) {
	return (
		<div
			className={`${
				mobileMenuOpen ? 'block' : 'hidden'
			} sm:block w-full sm:w-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 overflow-auto mb-4 sm:mb-0`}
		>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='font-bold text-lg text-gray-800 dark:text-gray-200'>
					Categorías
				</h2>
				<button className='text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 border-1'>
					<FaPlus />
				</button>
			</div>

			<div className='flex flex-wrap sm:flex-col gap-2 sm:space-y-2'>
				<div className='p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg text-cyan-700 dark:text-cyan-300 font-medium cursor-pointer text-sm sm:text-base'>
					Todas
				</div>
				<div className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-sm sm:text-base'>
					Trabajo
				</div>
				<div className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-sm sm:text-base'>
					Personal
				</div>
				<div className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-sm sm:text-base'>
					Ideas
				</div>
			</div>
		</div>
	)
}

export default Sidebar
