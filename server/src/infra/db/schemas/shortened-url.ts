import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const shortenedUrls = pgTable('shortened_urls', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
	originalUrl: text('original_url').notNull(), //url inserida pelo usuário
	shortenedUrl: text('shortened_url').notNull().unique(), //url modificada pelo usuário
	acessCount: integer('access_count').notNull().default(0),
	createdAt: timestamp('created_at', { withTimezone: true }) // vc pode usar o withTimezone para questão de compração quando quer saber a hora exata baseada onde a aplicação está
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.notNull(),
})
