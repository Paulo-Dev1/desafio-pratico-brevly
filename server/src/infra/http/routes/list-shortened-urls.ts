// Importa apenas o TIPO do plugin Fastify com suporte ao Zod (não gera código em runtime)

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { listShortenedUrls } from '@/app/services/list-shortened-urls'
import { unwrapEither } from '@/shared/either'

//criação de rotas
export const listShortenedUrlsRoute: FastifyPluginAsyncZod = async server => {
	// Cria e exporta um plugin do Fastify tipado com Zod
	// "server" é a instância do Fastify que permite registrar rotas

	// Define uma rota do tipo POST no endpoint "/uploads"
	server.get(
		'/urls',
		{
			schema: {
				summary: 'List shortened URLs',
				tags: ['URL'],

				response: {
					200: z.object({
						urls: z.array(
							z.object({
								id: z.string(),
								originalUrl: z.url(),
								shortenedUrl: z.url(),
								acessCount: z.number(),
							})
						),
						total: z.number(),
					}),
				},
			},
		},
		async (request, reply) => {
			//não gosta de fazer o data e mandar data.

			const result = await listShortenedUrls()

			const { total, urls } = unwrapEither(result)

			return reply.status(200).send({ total, urls })
		}
	)
}
