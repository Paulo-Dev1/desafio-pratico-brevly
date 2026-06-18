import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const generetedCsv = pgTable('genereted_csv', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
    name: text('name').notNull(),
	remoteKey: text('remote_key').notNull().unique(), //caminho do arquivo
	remoteUrl: text('remote_url').notNull().unique(), //url do arquivo para acessar
	createdAt: timestamp('created_at', { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.notNull(),
})
