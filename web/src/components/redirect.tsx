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
		<div className="bg-white flex flex-col items-center justify-center gap-4 w-[580px] h-[296px] rounded-lg">
			<img src="/favicon.svg" alt="Logo" width={48} height={48} />
			<h1 className="text-xl font-bold text-gray-600">Redirecionando...</h1>
			<div className=" items-center justify-center flex flex-col gap-1">
				<p className="text-gray-500 text-sm">
					O link será aberto automaticamente em alguns instantes.
				</p>
				<p className="text-gray-500 text-sm">
					Não foi redirecionado?
					<a
						className="text-blue-base text-sm underline cursor-pointer"
						href={window.location.origin}
					>
						Acesse aqui
					</a>
				</p>
			</div>
		</div>
	)
}
