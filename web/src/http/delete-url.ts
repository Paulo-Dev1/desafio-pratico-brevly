import axios from 'axios'

export async function deleteUrl($id: string) {
	try {
		const response = await axios.delete(`http://localhost:3333/urls/${$id}`, {})

		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}
