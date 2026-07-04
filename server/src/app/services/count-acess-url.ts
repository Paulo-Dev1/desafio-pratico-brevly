import { eq, sql } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/shared/either'

type incrementAccessCountOutput = {
	message: string
}

export const incrementAccessCount = async (
	shortenedUrl: string
): Promise<Either<never, incrementAccessCountOutput>> => {
	await db
		.update(schema.shortenedUrls)
		.set({
			acessCount: sql`${schema.shortenedUrls.acessCount} + 1`,
		})
		.where(eq(schema.shortenedUrls.shortenedUrl, shortenedUrl))

	return makeRight({ message: 'success' })
}
