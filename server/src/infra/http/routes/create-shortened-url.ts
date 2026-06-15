import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '@/infra/db'
import { shortenedUrls } from '@/infra/db/schemas/shortened-url'

export const createShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
	const bodySchema = z.object({
		originalUrl: z.url(),
		shortenedUrl: z.url(),
	})

	server.post(
		'/urls',
		{
			schema: {
				summary: 'Create shortened URL',
				tags: ['URL'],
				body: bodySchema,
				response: {
					201: z.object({ message: z.string() }),
					400: z.object({ message: z.string() }),
				},
			},
		},

		async (request, reply) => {
			const body = bodySchema.parse(request.body)

			const existing = await db
				.select()
				.from(shortenedUrls)
				.where(eq(shortenedUrls.originalUrl, body.originalUrl))

			if (existing.length > 0) {
				return reply.status(400).send({ message: 'URL já existente' })
			}

			await db.insert(shortenedUrls).values({
				originalUrl: body.originalUrl,
				shortenedUrl: body.shortenedUrl,
			})

			return reply.status(201).send({ message: 'URL criada com sucesso' })
		}
	)
}
