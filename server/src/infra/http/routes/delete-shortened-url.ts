import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { db } from '@/infra/db'
import { shortenedUrls } from '@/infra/db/schemas/shortened-url'

export const deleteShortenedUrlRoute: FastifyPluginAsyncZod = async server => {
	const bodySchema = z.object({
		originalUrl: z.url(),
		shortenedUrl: z.url(),
	})

	server.post(
		'/urls',
		{
			schema: {
				summary: 'Delete shortened URL',
				tags: ['URL'],
				body: bodySchema,
				response: {
					200: z.object({ message: z.string() }),
					404: z.object({ message: z.string() }),
				},
			},
		},

		async (request, reply) => {
			const { id } = request.params as { id: string }

			const url = await db.query.shortenedUrls.findFirst({
				where: eq(shortenedUrls.id, id),
			})

			if (!url) {
				return reply.status(404).send({ message: 'URL não encontrada' })
			}

			await db.delete(shortenedUrls).where(eq(shortenedUrls.id, id))

			return reply.status(200).send({ message: 'URL deletada com sucesso' })
		}
	)
}
