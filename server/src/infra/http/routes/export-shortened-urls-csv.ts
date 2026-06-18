import type { FastifyPluginAsync } from 'fastify'
import z from 'zod'
import { exportShortenedurl } from '@/app/services/upload-csv'
import { unwrapEither } from '@/shared/either'

export const exportShortenedurlsRoute: FastifyPluginAsync = async server => {
	server.post(
		'/urls/exports',
		{
			schema: {
				summary: 'Export Shortened Urls',
				tags: ['URL'],
				response: {
					200: z.object({
						reportUrl: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const result = await exportShortenedurl()

			const { reportUrl } = unwrapEither(result)

			return reply.status(200).send({ reportUrl })
		}
	)
}
