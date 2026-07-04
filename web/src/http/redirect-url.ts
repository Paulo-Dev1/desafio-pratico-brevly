import axios from 'axios'

export async function redirectUrl($shortUrl: string) {
	try {
		const response = await axios.get(`http://localhost:3333/urls/${$shortUrl}`, {})

		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}
