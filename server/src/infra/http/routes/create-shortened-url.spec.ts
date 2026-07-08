// src/http/routes/create-shortened-url.spec.ts

import { eq } from 'drizzle-orm'
import { beforeAll, describe, expect, it } from 'vitest'
import { db } from '@/infra/db'
import { shortenedUrls } from '@/infra/db/schemas/shortened-url'
import { server } from '../server'

describe('Create shortened URL', () => {
	beforeAll(async () => {
		await server.ready()
	})

	it('should create a shortened url', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/urls',
			payload: {
				originalUrl: 'https://google.com',
				shortenedUrl: 'google-test',
			},
		})

		expect(response.statusCode).toBe(201)

		expect(response.json()).toEqual({
			message: 'URL criada com sucesso',
		})

		const result = await db
			.select()
			.from(shortenedUrls)
			.where(eq(shortenedUrls.shortenedUrl, 'google-test'))

		expect(result).toHaveLength(1)

		expect(result[0]).toMatchObject({
			originalUrl: 'https://google.com',
			shortenedUrl: 'google-test',
		})
	})

	it('should not allow duplicated shortened url', async () => {
		await db.insert(shortenedUrls).values({
			originalUrl: 'https://google.com',
			shortenedUrl: 'google',
		})

		const response = await server.inject({
			method: 'POST',
			url: '/urls',
			payload: {
				originalUrl: 'https://github.com',
				shortenedUrl: 'google',
			},
		})

		expect(response.statusCode).toBe(400)

		expect(response.json()).toEqual({
			message: 'URL já existente',
		})
	})
})
