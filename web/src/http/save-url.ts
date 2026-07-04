import axios from 'axios'

export async function saveUrl({
	originalUrl,
	shortenedUrl,
}: {
	originalUrl: string
	shortenedUrl: string
}) {
	try {
		const response = await axios.post('http://localhost:3333/urls', {
			originalUrl,
			shortenedUrl,
		})

		return response.data
	} catch {
		throw new Error('Erro ao salvar a URL')
	}
}
