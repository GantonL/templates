export interface ComboboxConfiguration {
	options: {
		value: string;
		label: string;
		description?: string;
		disabledIf?: (...args: unknown[]) => boolean;
		disabledIfArgs?: unknown;
	}[];
	event?: string;
	placeholder?: string;
	search?: {
		placeholder?: string;
		emptyState?: string;
	};
}
