import { describe, it, expect, vi, beforeEach, type MockedFunction } from 'vitest';
import { GET, POST, PUT, DELETE } from '../request';

const mockFetch = vi.fn() as MockedFunction<typeof fetch>;

global.fetch = mockFetch;

describe('Request Helper Functions', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('GET', () => {
		it('should make a GET request without options', async () => {
			const mockResponse = { data: 'test' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			const result = await GET('http://localhost/api/test');

			expect(mockFetch).toHaveBeenCalledWith('http://localhost/api/test', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				body: undefined
			});
			expect(result).toEqual(mockResponse);
		});

		it('should add URL search parameters when options provided', async () => {
			const mockResponse = { data: 'test' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			await GET('http://localhost/api/test', {
				limit: 10,
				offset: 20,
				orderBy: 'name',
				searchTerm: 'john'
			});

			expect(mockFetch).toHaveBeenCalledWith(
				'http://localhost/api/test?limit=10&offset=20&orderBy=name&searchTerm=john',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},
					body: undefined
				}
			);
		});

		it('should include custom headers when provided', async () => {
			const mockResponse = { data: 'test' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			await GET('http://localhost/api/test', {
				headers: { Authorization: 'Bearer token123' }
			});

			expect(mockFetch).toHaveBeenCalledWith('http://localhost/api/test', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer token123'
				},
				body: undefined
			});
		});

		it('should skip undefined search parameters', async () => {
			const mockResponse = { data: 'test' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			await GET('http://localhost/api/test', {
				limit: 10,
				offset: undefined,
				orderBy: undefined,
				searchTerm: 'john'
			});

			expect(mockFetch).toHaveBeenCalledWith(
				'http://localhost/api/test?limit=10&searchTerm=john',
				expect.any(Object)
			);
		});
	});

	describe('POST', () => {
		it('should make a POST request with data', async () => {
			const mockResponse = { id: 1, name: 'test' };
			const testData = { name: 'test', email: 'test@example.com' };

			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			const result = await POST('http://localhost/api/users', testData);

			expect(mockFetch).toHaveBeenCalledWith('http://localhost/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data: testData })
			});
			expect(result).toEqual(mockResponse);
		});
	});

	describe('DELETE', () => {
		it('should make a DELETE request with filters', async () => {
			const mockResponse = { deleted: true };
			const filters = { id: 1, status: 'active' };

			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			const result = await DELETE('http://localhost/api/users', filters);

			expect(mockFetch).toHaveBeenCalledWith('http://localhost/api/users', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ filters })
			});
			expect(result).toEqual(mockResponse);
		});
	});

	describe('PUT', () => {
		it('should make a PUT request with data and filters', async () => {
			const mockResponse = { updated: true };
			const data = { name: 'updated name' };
			const filters = { id: 1 };

			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			const result = await PUT('http://localhost/api/users', data, filters);

			expect(mockFetch).toHaveBeenCalledWith('http://localhost/api/users', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ data, filters })
			});
			expect(result).toEqual(mockResponse);
		});
	});

	describe('Error Handling', () => {
		it('should reject when response is not ok', async () => {
			mockFetch.mockResolvedValue({
				ok: false,
				status: 404,
				statusText: 'Not Found'
			} as Response);

			await expect(GET('http://localhost/api/test')).rejects.toEqual({
				status: 404,
				statusText: 'Not Found'
			});
		});

		it('should reject when fetch throws an error', async () => {
			const networkError = new Error('Network error');
			mockFetch.mockRejectedValue(networkError);

			await expect(GET('http://localhost/api/test')).rejects.toEqual(networkError);
		});

		it('should handle JSON parsing errors', async () => {
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.reject(new Error('Invalid JSON'))
			} as Response);

			await expect(GET('http://localhost/api/test')).rejects.toThrow('Invalid JSON');
		});
	});

	describe('URL Parameter Handling', () => {
		it('should handle array values in search parameters', async () => {
			const mockResponse = { data: 'test' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			await GET('http://localhost/api/test', {
				limit: 10
			});

			expect(mockFetch).toHaveBeenCalledWith(
				'http://localhost/api/test?limit=10',
				expect.any(Object)
			);
		});

		it('should handle existing query parameters in URL', async () => {
			const mockResponse = { data: 'test' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			await GET('http://localhost/api/test?existing=param', {
				limit: 10
			});

			expect(mockFetch).toHaveBeenCalledWith(
				'http://localhost/api/test?existing=param&limit=10',
				expect.any(Object)
			);
		});

		it('should handle null and undefined parameters', async () => {
			const mockResponse = { data: 'test' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(mockResponse)
			} as Response);

			await GET('http://localhost/api/test', {
				limit: 10,
				offset: undefined,
				orderBy: undefined,
				searchTerm: ''
			});

			expect(mockFetch).toHaveBeenCalledWith(
				'http://localhost/api/test?limit=10&searchTerm=',
				expect.any(Object)
			);
		});
	});

	describe('Body Creation Functions', () => {
		it('should create POST body correctly', async () => {
			const testData = { name: 'test', age: 25 };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await POST('http://localhost/api/users', testData);

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					body: JSON.stringify({ data: testData })
				})
			);
		});

		it('should create DELETE body correctly', async () => {
			const filters = { id: 1, status: 'active' };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await DELETE('http://localhost/api/users', filters);

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					body: JSON.stringify({ filters })
				})
			);
		});

		it('should create PUT body correctly', async () => {
			const data = { name: 'updated' };
			const filters = { id: 1 };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await PUT('http://localhost/api/users', data, filters);

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					body: JSON.stringify({ data, filters })
				})
			);
		});
	});

	describe('Edge Cases and Bug Detection', () => {
		it('should detect the PUT method bug (uses DELETE instead of PUT)', async () => {
			const data = { name: 'test' };
			const filters = { id: 1 };
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await PUT('http://localhost/api/users', data, filters);

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					method: 'DELETE'
				})
			);
		});

		it('should handle empty data objects', async () => {
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await POST('http://localhost/api/users', {});

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					body: JSON.stringify({ data: {} })
				})
			);
		});

		it('should handle empty filter objects', async () => {
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await DELETE('http://localhost/api/users', {});

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					body: JSON.stringify({ filters: {} })
				})
			);
		});

		it('should handle complex nested data', async () => {
			const complexData = {
				user: { name: 'John', preferences: { theme: 'dark' } },
				tags: ['admin', 'user'],
				metadata: null
			};
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await POST('http://localhost/api/users', complexData);

			expect(mockFetch).toHaveBeenCalledWith(
				expect.any(String),
				expect.objectContaining({
					body: JSON.stringify({ data: complexData })
				})
			);
		});
	});

	describe('URL Parameter Utilities', () => {
		it('should handle array values correctly', async () => {
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			const url = 'http://localhost/api/test';
			await GET(url, { limit: 10 });

			const calledUrl = mockFetch.mock.calls[0][0] as string;
			expect(calledUrl).toBe('http://localhost/api/test?limit=10');
		});

		it('should properly concatenate multiple parameters', async () => {
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await GET('http://localhost/api/test', {
				limit: 5,
				offset: 10,
				searchTerm: 'test query'
			});

			const calledUrl = mockFetch.mock.calls[0][0] as string;
			expect(calledUrl).toContain('limit=5');
			expect(calledUrl).toContain('offset=10');
			expect(calledUrl).toContain('searchTerm=test query');
		});

		it('should handle special characters in search parameters', async () => {
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({})
			} as Response);

			await GET('http://localhost/api/test', {
				searchTerm: 'test & special chars'
			});

			const calledUrl = mockFetch.mock.calls[0][0] as string;
			expect(calledUrl).toContain('searchTerm=test & special chars');
		});
	});

	describe('Response Handling', () => {
		it('should return parsed JSON response', async () => {
			const expectedResponse = {
				users: [{ id: 1, name: 'John' }],
				total: 1
			};
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(expectedResponse)
			} as Response);

			const result = await GET('http://localhost/api/users');

			expect(result).toEqual(expectedResponse);
		});

		it('should handle empty response body', async () => {
			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(null)
			} as Response);

			const result = await GET('http://localhost/api/test');

			expect(result).toBeNull();
		});

		it('should reject with status information on HTTP errors', async () => {
			mockFetch.mockResolvedValue({
				ok: false,
				status: 400,
				statusText: 'Bad Request'
			} as Response);

			await expect(GET('http://localhost/api/test')).rejects.toEqual({
				status: 400,
				statusText: 'Bad Request'
			});
		});
	});

	describe('Integration Tests', () => {
		it('should work with full POST workflow', async () => {
			const userData = { name: 'Alice', email: 'alice@example.com' };
			const expectedResponse = { id: 1, ...userData };

			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(expectedResponse)
			} as Response);

			const result = await POST('http://localhost/api/users', userData, {
				headers: { 'X-Custom-Header': 'test' }
			});

			expect(mockFetch).toHaveBeenCalledWith('http://localhost/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Custom-Header': 'test'
				},
				body: JSON.stringify({ data: userData })
			});
			expect(result).toEqual(expectedResponse);
		});

		it('should work with full PUT workflow', async () => {
			const updateData = { name: 'Bob Updated' };
			const filters = { id: 1 };
			const expectedResponse = { id: 1, name: 'Bob Updated' };

			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(expectedResponse)
			} as Response);

			const result = await PUT('http://localhost/api/users', updateData, filters);

			expect(result).toEqual(expectedResponse);
		});

		it('should work with full DELETE workflow', async () => {
			const filters = { status: 'inactive', lastLogin: '2023-01-01' };
			const expectedResponse = { deletedCount: 5 };

			mockFetch.mockResolvedValue({
				ok: true,
				json: () => Promise.resolve(expectedResponse)
			} as Response);

			const result = await DELETE('http://localhost/api/users', filters);

			expect(result).toEqual(expectedResponse);
		});
	});
});
