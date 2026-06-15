import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const generetedCsv = pgTable('genereted_csv', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => uuidv7()),
    name: text('name').notNull(),
	remoteKey: text('remote_key').notNull().unique(),
	remoteUrl: text('remote_url').notNull().unique(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.defaultNow()
		.notNull(),
})
