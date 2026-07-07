import { z } from 'zod'

export const urlSchema = z.object({
	originalUrl: z.url({
		message: 'Informe uma URL válida.',
	}),
	shortenedUrl: z
		.string()
		.min(1, 'Informe o link encurtado.')
		.regex(/^[a-zA-Z0-9-_]+$/, {
			message: 'Use apenas letras, números, hífen e underline.',
		}),
})

export type UrlSchema = z.infer<typeof urlSchema>