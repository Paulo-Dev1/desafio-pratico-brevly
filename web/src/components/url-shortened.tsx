import { useState } from 'react'
import z from 'zod'
import { saveUrl } from '../http/save-url'
import { urlSchema } from '../schemas/url-schema'
import { Button } from './ui/button'
import { InputOriginal } from './ui/input-original-url'
import { InputShortened } from './ui/input-shortened-url'

interface Props {
	onSuccess: () => void
}

export function UrlShortened({ onSuccess }: Props) {
	const [originalUrl, setOriginalUrl] = useState('')
	const [shortenedUrl, setShortenedUrl] = useState('')
	const [statusMessage, setStatusMessage] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	const [originalUrlError, setOriginalUrlError] = useState('')
	const [shortenedUrlError, setShortenedUrlError] = useState('')

	async function handleSave() {
		// if (!originalUrl.trim() || !shortenedUrl.trim()) {
		// 	setStatusMessage('Preencha as duas URLs antes de salvar.')
		// 	return
		// }

		const result = urlSchema.safeParse({
			originalUrl,
			shortenedUrl,
		})

		if (!result.success) {
			const errors = z.flattenError(result.error)

			setOriginalUrlError(errors.fieldErrors.originalUrl?.[0] ?? '')
			setShortenedUrlError(errors.fieldErrors.shortenedUrl?.[0] ?? '')

			return
		}

		setIsSaving(true)
		setStatusMessage('')

		try {
			await saveUrl({ originalUrl, shortenedUrl })
			// Limpa os erros
			setOriginalUrlError('')
			setShortenedUrlError('')
			onSuccess()
			setStatusMessage('URL salva com sucesso.')
		} catch (error) {
			setStatusMessage('Erro ao salvar a URL. Tente novamente.')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<div className="flex h-auto w-full max-w-[380px] flex-col justify-start gap-4 rounded-xl bg-white p-4 sm:p-6 md:p-8 lg:w-[380px]">
			<p className="text-lg font-bold text-gray-600">Novo Link</p>
			<InputOriginal
				placeholder="www.exemplo.com.br"
				value={originalUrl}
				label="LINK ORIGINAL"
				onChange={setOriginalUrl}
				error={originalUrlError}
				inputverific={1}
			/>
			<InputShortened
				label="LINK ENCURTADO"
				value={shortenedUrl}
				onChange={setShortenedUrl}
				error={shortenedUrlError}
			/>
			<Button onClick={handleSave} disabled={isSaving}>
				Salvar URL
			</Button>
			{statusMessage ? (
				<p className="text-sm text-gray-600">{statusMessage}</p>
			) : null}
		</div>
	)
}
