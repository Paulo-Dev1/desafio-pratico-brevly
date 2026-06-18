import { count, desc } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'


type listShortenedUrlOutput = {
	urls: {
		id: string
		originalUrl: string
		shortenedUrl: string
		acessCount: number
	}[]
	total: number
}


export async function listShortenedUrls(): Promise<
	Either<never, listShortenedUrlOutput>
> {
	const [urls, [{ total }]] = await Promise.all([
		db
			.select({
				id: schema.shortenedUrls.id,
				originalUrl: schema.shortenedUrls.originalUrl,
				shortenedUrl: schema.shortenedUrls.shortenedUrl,
				acessCount: schema.shortenedUrls.acessCount,
			})
			.from(schema.shortenedUrls)

			//ordenação
			.orderBy(fields => {
				return desc(fields.id)
			}),

		db
			.select({ total: count(schema.shortenedUrls.id) })
			.from(schema.shortenedUrls),
	])


	return makeRight({ urls, total })
}
