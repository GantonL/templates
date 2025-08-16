import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const testUsers = pgTable('test_users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow()
});

export type TestUser = typeof testUsers.$inferSelect;
export type TestUserInsert = typeof testUsers.$inferInsert;