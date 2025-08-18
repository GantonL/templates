import { db } from '../client';
import { ServiceFactory } from './factory';

export class ServiceProvider {
	private static instance: ServiceProvider | undefined;
	private factory: ServiceFactory;

	private constructor(client: typeof db) {
		this.factory = new ServiceFactory(client);
	}

	static getInstance(databaseClient = db): ServiceProvider {
		if (!ServiceProvider.instance) {
			ServiceProvider.instance = new ServiceProvider(databaseClient);
		}
		return ServiceProvider.instance;
	}

	static clearInstance(): void {
		ServiceProvider.instance = undefined;
	}

	getFactory(): ServiceFactory {
		return this.factory;
	}
}

export const provider = ServiceProvider.getInstance();
