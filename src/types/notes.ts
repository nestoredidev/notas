export interface NoteType {
	id: string
	titulo: string
	contenido: string | null
	fecha_creacion: string
	categoria_id?: string
	color?: string
}
