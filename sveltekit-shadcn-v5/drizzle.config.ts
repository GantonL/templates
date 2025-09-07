import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/database/schemas',
	out: './src/lib/server/database/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
});
