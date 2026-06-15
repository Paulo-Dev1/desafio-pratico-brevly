import { count, desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

//aqui temos que tipar nosso retorno
type listShortenedUrlOutput = {
	urls: {
		id: string
		originalUrl: string
		shortenedUrl: string
		acessCount: number
	}[]
	total: number
}

//aqui no caso o either espera o error e o sucesso o t e u
export async function listShortenedUrls(): Promise<
	Either<never, listShortenedUrlOutput>
> {
	//usando Promise.all posso usar duas query.
	//toda query no drizzle volta um array
	const [urls, [{ total }]] = await Promise.all([
		db
			.select({
				id: schema.shortenedUrls.id,
				originalUrl: schema.shortenedUrls.originalUrl,
				shortenedUrl: schema.shortenedUrls.shortenedUrl,
				acessCount: schema.shortenedUrls.acessCount,
			})
			.from(schema.shortenedUrls)
			//where
			//ordenação
			.orderBy(fields => {
				return desc(fields.id)
			}),

		db
			.select({ total: count(schema.shortenedUrls.id) })
			.from(schema.shortenedUrls),
	])

	//aqui para o sucesso right
	//vamos devolver a url do arquivo baixado
	return makeRight({ urls, total })
}
