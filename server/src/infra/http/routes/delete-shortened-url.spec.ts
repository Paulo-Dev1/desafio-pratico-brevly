import { eq } from 'drizzle-orm'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { shortenedUrls } from '@/infra/db/schemas/shortened-url'
import { server } from '../server'

describe('Delete shortened URL', () => {
	beforeAll(async () => {
		await server.ready()
	})

	beforeEach(async () => {
		await db.delete(shortenedUrls)
	})

	it('should delete a shortened url', async () => {
		const [url] = await db
			.insert(shortenedUrls)
			.values({
				originalUrl: 'https://google.com',
				shortenedUrl: 'google',
			})
			.returning()

		const response = await server.inject({
			method: 'DELETE',
			url: `/urls/${url.id}`,
		})

		expect(response.statusCode).toBe(200)

		expect(response.json()).toEqual({
			message: 'URL deletada com sucesso',
		})

		const deleted = await db.query.shortenedUrls.findFirst({
			where: eq(shortenedUrls.id, url.id),
		})

		expect(deleted).toBeUndefined()
	})

	it('should return 404 when url does not exist', async () => {
		const response = await server.inject({
			method: 'DELETE',
			url: '/urls/0197e48d-17f4-73e3-9d78-9d95bbd83b0d',
		})

		expect(response.statusCode).toBe(404)

		expect(response.json()).toEqual({
			message: 'URL não encontrada',
		})
	})
})
