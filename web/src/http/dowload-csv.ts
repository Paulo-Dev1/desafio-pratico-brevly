import axios from "axios"

interface ExportResponse {
	reportUrl: string
}

export async function exportUrls() {
	const { data } = await axios.post('http://localhost:3333/urls/exports')

	const response = await axios.get(data.reportUrl, {
		responseType: 'blob',
	})

	const url = window.URL.createObjectURL(response.data)

	const link = document.createElement('a')
	link.href = url
	link.download = 'urls.csv'

	document.body.appendChild(link)
	link.click()

	link.remove()
	window.URL.revokeObjectURL(url)
}
