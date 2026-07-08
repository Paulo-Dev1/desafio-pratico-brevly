import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '@/infra/db'
import { shortenedUrls } from '@/infra/db/schemas/shortened-url'
import { server } from '../server'

const shortenedUrlKey = 'google-test'
const mockedIncrementAccessCount = vi.fn(async () => ({
	right: { message: 'success' },
}))

vi.mock('@/app/services/count-acess-url', () => ({
	incrementAccessCount: mockedIncrementAccessCount,
}))

describe('Get shortened URL', () => {
	beforeAll(async () => {
		await server.ready()
	})

	beforeEach(async () => {
		await db.delete(shortenedUrls)
		mockedIncrementAccessCount.mockClear()
	})

	it('should return originalUrl and call incrementAccessCount', async () => {
		await db.insert(shortenedUrls).values({
			originalUrl: 'https://google.com',
			shortenedUrl: shortenedUrlKey,
		})

		const response = await server.inject({
			method: 'GET',
			url: `/urls/${shortenedUrlKey}`,
		})

		expect(response.statusCode).toBe(200)
		expect(response.json()).toEqual({
			originalUrl: 'https://google.com',
			message: 'success',
		})
		expect(mockedIncrementAccessCount).toHaveBeenCalledTimes(1)
		expect(mockedIncrementAccessCount).toHaveBeenCalledWith(shortenedUrlKey)
	})
})
