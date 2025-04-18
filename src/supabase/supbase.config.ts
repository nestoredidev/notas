import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Crear un objeto de almacenamiento seguro que funcione tanto en el cliente como en el servidor
const createStorageAdapter = () => {
	if (typeof window !== 'undefined') {
		// Estamos en el navegador, podemos usar localStorage
		return {
			getItem: (key: string) => {
				const item = localStorage.getItem(key)
				return item
			},
			setItem: (key: string, value: string) => {
				localStorage.setItem(key, value)
			},
			removeItem: (key: string) => {
				localStorage.removeItem(key)
			},
		}
	} else {
		// Estamos en el servidor, usar una implementación en memoria (o vacía)
		return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {},
		}
	}
}

const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: {
		persistSession: true,
		storage: createStorageAdapter(),
		autoRefreshToken: true,
		detectSessionInUrl: true,
	},
})

export default supabase
