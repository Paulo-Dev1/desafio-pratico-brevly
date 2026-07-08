import { beforeAll, describe, expect, it, vi } from 'vitest'
import { server } from '../server'

vi.mock('@/app/services/upload-csv', () => ({
	exportShortenedurl: vi.fn(async () => ({
		right: { reportUrl: 'https://example.com/report.csv' },
	})),
}))

describe('Export shortened URLs CSV', () => {
	beforeAll(async () => {
		await server.ready()
	})

	it('should return report url when export is successful', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/urls/exports',
		})

		expect(response.statusCode).toBe(200)
		expect(response.json()).toEqual({
			reportUrl: 'https://example.com/report.csv',
		})
	})
})
