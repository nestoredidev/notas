import { useTheme } from '@/context/usetheme'
import { FaSun } from 'react-icons/fa'
import { MdNightlight } from 'react-icons/md'

function ThemeSwitcher() {
	const { theme, toggleTheme } = useTheme()
	return (
		<button
			onClick={toggleTheme}
			className='flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-100 hover:bg-cyan-200 transition-colors text-cyan-700 font-semibold shadow-sm'
			aria-label='Cambiar tema'
		>
			{theme === 'light' ? (
				<MdNightlight />
			) : (
				<>
					<FaSun />
				</>
			)}
		</button>
	)
}

export default ThemeSwitcher
