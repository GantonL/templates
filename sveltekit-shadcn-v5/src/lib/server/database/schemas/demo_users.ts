import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Users table schema
 */
export const Users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	createdAt: timestamp('created_at').defaultNow()
});

export type User = typeof Users.$inferSelect;
export type UserInsert = typeof Users.$inferInsert;
/*
 * End Users Tbale schema
 */
