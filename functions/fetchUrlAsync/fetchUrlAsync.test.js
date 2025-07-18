import { fetchUrlAsync } from './FfetchUrlAsync';

// Mock the global fetch function
global.fetch = jest.fn();

describe('fetchUrlAsync', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // Success cases for fetchUrlAsync function
  test('should successfully fetch content from a valid URL', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: () => Promise.resolve('<html>Mocked Content</html>'),
    });

    const result = await fetchUrlAsync('https://example.com');
    expect(result.isSuccess).toBe(true);
    expect(result.result).toBe('<html>Mocked Content</html>');
    expect(result.message).toBe('Content fetched successfully.');
    expect(fetch).toHaveBeenCalledWith('https://example.com');
  });

  test('should handle empty content from a valid URL', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: () => Promise.resolve(''),
    });

    const result = await fetchUrlAsync('https://empty.com');
    expect(result.isSuccess).toBe(true);
    expect(result.result).toBe('');
    expect(result.message).toBe('Content fetched successfully.');
    expect(fetch).toHaveBeenCalledWith('https://empty.com');
  });

  // Error cases for fetchUrlAsync function
  test('should return an error if URL is missing', async () => {
    const result = await fetchUrlAsync(undefined);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CFetchUrlAsync \| Validation error: The url must be a valid http\(s\) URL string./);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should return an error if URL is not a string', async () => {
    const result = await fetchUrlAsync(123);
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CFetchUrlAsync \| Validation error: The url must be a valid http\(s\) URL string./);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should return an error if URL does not start with http', async () => {
    const result = await fetchUrlAsync('ftp://example.com');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CFetchUrlAsync \| Validation error: The url must be a valid http\(s\) URL string./);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should return an error for network issues', async () => {
    fetch.mockRejectedValueOnce(new Error('Network down'));

    const result = await fetchUrlAsync('https://nonexistent.com');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CFetchUrlAsync \| BusinessLogic error: Network error or fetch failed: Network down/);
    expect(fetch).toHaveBeenCalledWith('https://nonexistent.com');
  });

  test('should return an error for HTTP 404 response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const result = await fetchUrlAsync('https://example.com/404');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CFetchUrlAsync \| BusinessLogic error: HTTP error: status 404 Not Found/);
    expect(fetch).toHaveBeenCalledWith('https://example.com/404');
  });

  test('should return an error for HTTP 500 response', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const result = await fetchUrlAsync('https://example.com/500');
    expect(result.isSuccess).toBe(false);
    expect(result.message).toMatch(/CFetchUrlAsync \| BusinessLogic error: HTTP error: status 500 Internal Server Error/);
    expect(fetch).toHaveBeenCalledWith('https://example.com/500');
  });
});