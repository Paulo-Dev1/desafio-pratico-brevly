import axios from 'axios'

export async function listUrls() {
	try {
		const response = await axios.get('http://localhost:3333/urls', {})

		return response.data
	} catch {
		throw new Error('Erro ao listar URLs')
	}
}
