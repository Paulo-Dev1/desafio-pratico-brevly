import { useEffect, useRef } from 'react'
import { redirectUrl } from '../http/redirect-url'

export function Redirect() {
	const shortUrl = window.location.pathname.replace('/', '')
	const executed = useRef(false)

	useEffect(() => {
		if (executed.current) return
		executed.current = true
		async function load() {
			try {
				console.log(shortUrl)
				if (!shortUrl) return
				const response = await redirectUrl(shortUrl)
				window.location.replace(response.originalUrl)
			} catch (error: any) {
				if (error.response?.status === 404) {
					window.location.replace('/not-found')
					return
				}
			}
		}

		load()
	}, [shortUrl])

	return (
		<div className="bg-white flex flex-col items-center justify-center gap-4">
			<h1 className="text-2xl font-bold">Redirecionando...</h1>
			<p className="text-gray-500">
				O link será aberto automaticamente em alguns instantes.
			</p>
			<p className="text-gray-500">
				Não foi redirecionado?
				<a
					className="text-blue-500 underline cursor-pointer"
					href={window.location.origin}
				>
					Acesse aqui
				</a>
			</p>
		</div>
	)
}
