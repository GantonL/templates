interface BaseRequestOptions {
	fetch?: typeof fetch;
	headers?: RequestInit['headers'];
}
interface BaseFilters {
	searchTerm?: string;
}
interface UrlSearchParams extends BaseFilters {
	limit?: number;
	orderBy?: string;
	offset?: number;
}
interface GetOptions extends BaseRequestOptions, UrlSearchParams {}

interface CreateUpdateDeleteOptions extends BaseRequestOptions, BaseFilters {
	body?: RequestInit['body'];
}

const baseHeaders = {
	'Content-Type': 'application/json'
};

export const GET = async <R>(url: string, options?: GetOptions): Promise<R> => {
	if (options) {
		url = addUrlSearchParams(url, {
			limit: options.limit,
			orderBy: options.orderBy,
			offset: options.offset,
			searchTerm: options?.searchTerm
		});
	}
	const reponse = await baseRequest(url, 'GET', options);
	return reponse as R;
};

export const POST = async <D, R>(
	url: string,
	data: D,
	options?: CreateUpdateDeleteOptions
): Promise<R> => {
	options = createPostBody(data, options);
	const reponse = await baseRequest(url, 'POST', options);
	return reponse as R;
};

export const DELETE = async <F, R>(
	url: string,
	filters: F,
	options?: CreateUpdateDeleteOptions
): Promise<R> => {
	options = createDeleteBody(filters, options);
	const reponse = await baseRequest(url, 'DELETE', options);
	return reponse as R;
};

export const PUT = async <D, F, R>(
	url: string,
	data: D,
	filters: F,
	options?: CreateUpdateDeleteOptions
): Promise<R> => {
	options = createPutBody(data, filters, options);
	const reponse = await baseRequest(url, 'DELETE', options);
	return reponse as R;
};

const baseRequest = async (
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	options?: RequestInit & BaseRequestOptions
) => {
	return new Promise((resolve, reject) => {
		const executeFetch = options?.fetch ?? fetch;
		executeFetch(url, {
			method,
			headers: {
				...baseHeaders,
				...options?.headers
			},
			body: options?.body
		})
			.then(async (res) => {
				if (res?.ok) {
					const response = await res.json();
					resolve(response);
				}
				reject({
					status: res.status,
					statusText: res.statusText
				});
			})
			.catch((e) => {
				reject(e);
			});
	});
};

const addUrlSearchParams = (url: string, parameters: UrlSearchParams) => {
	if (!parameters) return url;
	// To preserve definitive order, instead of using Object.keys(parameters);
	const keys: (keyof UrlSearchParams)[] = ['limit', 'offset', 'orderBy', 'searchTerm'];
	for (const key of keys) {
		const value = parameters[key];
		if (value === undefined || value === null) continue;
		url = applySearchParamOnUrl(url, key, value);
	}
	return url;
};

const applySearchParamOnUrl = (
	url: string,
	key: string,
	value: string | number | (string | number)[]
) => {
	let concatenator = '?';
	if (url.includes(concatenator)) {
		concatenator = '&';
	}
	if (Array.isArray(value)) {
		value = value.map((e) => String(e)).join();
	}
	const concatenatedUrl = url.concat(`${concatenator}${key}=${value}`);
	return concatenatedUrl;
};

const createPostBody = (data: unknown, options?: CreateUpdateDeleteOptions) => {
	const response: CreateUpdateDeleteOptions = {
		...options,
		body: JSON.stringify({ data })
	};
	return response;
};

const createDeleteBody = (filters: unknown, options?: CreateUpdateDeleteOptions) => {
	const response: CreateUpdateDeleteOptions = {
		...options,
		body: JSON.stringify({ filters })
	};
	return response;
};

const createPutBody = (data: unknown, filters: unknown, options?: CreateUpdateDeleteOptions) => {
	const response: CreateUpdateDeleteOptions = {
		...options,
		body: JSON.stringify({ data, filters })
	};
	return response;
};
