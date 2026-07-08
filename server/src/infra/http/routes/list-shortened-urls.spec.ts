import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { shortenedUrls } from '@/infra/db/schemas/shortened-url'
import { server } from '../server' // ajuste o caminho

describe('List shortened URLs', () => {
	beforeAll(async () => {
		await server.ready()
	})

	beforeEach(async () => {
		await db.delete(shortenedUrls)
	})

	it('should list all shortened urls', async () => {
		await db.insert(shortenedUrls).values([
			{
				originalUrl: 'https://google.com',
				shortenedUrl: 'google',
			},
			{
				originalUrl: 'https://github.com',
				shortenedUrl: 'github',
			},
		])

		const response = await server.inject({
			method: 'GET',
			url: '/urls',
		})

		expect(response.statusCode).toBe(200)

		const body = response.json()

		expect(body.total).toBe(2)

		expect(body.urls).toHaveLength(2)

		expect(body.urls).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					originalUrl: 'https://google.com',
					shortenedUrl: 'google',
				}),
				expect.objectContaining({
					originalUrl: 'https://github.com',
					shortenedUrl: 'github',
				}),
			])
		)
	})

	it('should return an empty list when there are no urls', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/urls',
		})

		expect(response.statusCode).toBe(200)

		expect(response.json()).toEqual({
			total: 0,
			urls: [],
		})
	})
})
