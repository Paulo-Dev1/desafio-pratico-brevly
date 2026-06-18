import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { incrementAccessCount } from '@/app/services/count-acess-url'
import { db } from '@/infra/db'
import { shortenedUrls } from '@/infra/db/schemas/shortened-url'

export const getShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
	const paramsSchema = z.object({
		id: z.uuidv7(),
	})

	server.get(
		'/urls/:id',
		{
			schema: {
				summary: 'Get shortened URL',
				tags: ['URL'],
				params: paramsSchema,
				response: {
					200: z.object({ shortenedUrl: z.string(), message: z.string() }),
					404: z.object({ message: z.string() }),
					400: z.object({ message: z.string() }),
				},
			},
		},

		async (request, reply) => {
			const { id } = request.params

			const [url] = await db
				.select({
					shortenedUrl: shortenedUrls.shortenedUrl,
				})
				.from(shortenedUrls)
				.where(eq(shortenedUrls.id, id))

			if (!url) {
				return reply.status(404).send({ message: 'URL não encontrada' })
			}

			const increment = await incrementAccessCount(id)

			if (increment.left) {
				return reply.status(400).send({
					message: 'error',
				})
			}

			return reply
				.status(200)
				.send({
					shortenedUrl: url.shortenedUrl,
					message: increment.right.message,
				})
		}
	)
}
