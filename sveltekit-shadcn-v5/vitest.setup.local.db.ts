import { execSync } from 'child_process';

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startDocker() {
	console.log('🚀 Starting Postgres container for tests...');

	try {
		execSync('bun run test:db:down', { stdio: 'pipe' });
	} catch {
		// Ignore error if containers are not running
	}

	execSync('bun run test:db:up', { stdio: 'inherit' });

	let isReady = false;
	for (let i = 0; i < 15; i++) {
		try {
			execSync('docker exec local_postgres pg_isready -U test_user -d test_db', {
				stdio: 'pipe'
			});
			isReady = true;
			break;
		} catch {
			console.log('⏳ Waiting for Postgres...');
			await wait(2000);
		}
	}

	if (!isReady) {
		console.error('❌ Postgres failed to start in time.');
		throw new Error('Postgres container failed to become ready');
	}

	console.log('✅ Postgres ready!');
}

async function stopDocker() {
	console.log('🛑 Stopping Postgres container...');
	try {
		execSync('bun run test:db:down', { stdio: 'pipe' });
	} catch (error) {
		console.warn('Warning: Error stopping containers:', error);
	}
}

export async function setup() {
	await startDocker();
	return async () => {
		await stopDocker();
	};
}
