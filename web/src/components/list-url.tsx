import { CopyIcon, DownloadSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { deleteUrl } from '../http/delete-url'
import { exportUrls } from '../http/dowload-csv'
import { listUrls } from '../http/list-url'

interface Url {
	id: string
	originalUrl: string
	shortenedUrl: string
	acessCount: number
}

interface Props {
	reload: number
}

export function ListUrls({ reload }: Props) {
	const [urls, setUrls] = useState<Url[]>([])

	const baseUrl: string = window.location.origin

	async function loadUrls() {
		try {
			const data = await listUrls()
			setUrls(data.urls)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		loadUrls()
		const onFocus = () => loadUrls()

		window.addEventListener('focus', onFocus)

		return () => window.removeEventListener('focus', onFocus)
	}, [reload])

	async function handleDelete(id: string) {
		try {
			await deleteUrl(id)
			await loadUrls()
		} catch (error) {
			console.error(error)
		}
	}

	async function handleCopy(url: string) {
		try {
			await navigator.clipboard.writeText(url)
			alert('URL copiada para a área de transferência!')
		} catch (error) {
			console.error('Erro ao copiar a URL:', error)
		}
	}

	async function handleRedirect(url: string) {
		try {
			window.open(url, '_blank')
		} catch (error) {
			console.error('Erro ao abrir a URL:', error)
		}
	}

	async function handleDownloadCsv() {
		try {
			await exportUrls()
		} catch (error) {
			console.error('Erro ao baixar o CSV:', error)
		}
	}

	return (
		<div className="flex flex-col justify-start gap-4 max-h-[800px] w-[580px] bg-white p-8 rounded-xl overflow-y-auto">
			<div className="flex">
				<p className="text-lg text-gray-600 font-bold flex-1">Novo Link</p>
				<button
					className="flex items-center justify-center gap-2 bg-zinc-300 rounded  px-4"
					type="button"
					onClick={handleDownloadCsv}
				>
					<DownloadSimpleIcon size={15} className="" />
					<span className="text-xs font-semibold">Baixar CSV</span>
				</button>
			</div>

			{urls.length > 0 ? (
				urls.map(url => (
					<>
						<div className="w-full border-t border-gray-800"></div>
						<div key={url.id} className="flex items-center w-full">
							<div className="flex-1">
								<button
									className="text-blue-700 text-sm max-w-[350px] break-words"
									type="button"
									onClick={() =>
										handleRedirect(`${baseUrl}/${url.shortenedUrl}`)
									}
								>
									{baseUrl}/{url.shortenedUrl}
								</button>
								<p className="text-sm max-w-[350px] break-words">
									{url.originalUrl}
								</p>
							</div>
							<div className="flex items-center justify-end gap-2">
								<p className="text-sm">{url.acessCount} acessos</p>

								<button
									type="button"
									className=" bg-zinc-300 rounded p-2"
									onClick={() => handleCopy(`${baseUrl}/${url.shortenedUrl}`)}
								>
									<CopyIcon size={16} />
								</button>

								<button
									type="button"
									onClick={() => handleDelete(url.id)}
									className=" bg-zinc-300 rounded p-2"
								>
									<TrashIcon size={16} />
								</button>
							</div>
						</div>
					</>
				))
			) : (
				<div>
					<div className="w-full border-t border-gray-800"></div>
					<p>Nenhuma URL encontrada.</p>
				</div>
			)}
		</div>
	)
}
