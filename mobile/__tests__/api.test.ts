/**
 * Tests for the API module
 */

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;

import {api} from '../src/api';

const API_URL = 'http://localhost:3000/api/v1';

const mockQueueResponse = {
  queue: [
    {
      id: '1',
      clientName: 'Juan Pérez',
      phoneNumber: '+573001234567',
      position: 1,
      status: 'in-progress' as const,
      estimatedTime: 15,
      priority: false,
      createdAt: '2024-01-01T00:00:00.000Z',
      queueDate: '2024-01-01T00:00:00.000Z',
    },
  ],
  total: 1,
  currentPosition: 1,
  message: 'OK',
};

beforeEach(() => {
  mockFetch.mockReset();
});

describe('api.queue.getAll', () => {
  it('should call fetch with the correct URL', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockQueueResponse),
    });

    await api.queue.getAll();

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/queue`);
  });

  it('should return parsed JSON response', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockQueueResponse),
    });

    const result = await api.queue.getAll();

    expect(result).toEqual(mockQueueResponse);
  });
});

describe('api.queue.create', () => {
  const createData = {
    clientName: 'Test Client',
    phoneNumber: '+573001111111',
    estimatedTime: 30,
    priority: false,
  };

  it('should call fetch with POST method and correct URL', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({success: true}),
    });

    await api.queue.create(createData);

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/queue`,
      expect.objectContaining({method: 'POST'}),
    );
  });

  it('should send JSON content-type header', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({success: true}),
    });

    await api.queue.create(createData);

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/queue`,
      expect.objectContaining({
        headers: {'Content-Type': 'application/json'},
      }),
    );
  });

  it('should serialize the body as JSON', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({success: true}),
    });

    await api.queue.create(createData);

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/queue`,
      expect.objectContaining({body: JSON.stringify(createData)}),
    );
  });
});

describe('api.queue.delete', () => {
  it('should call fetch with DELETE method and item id in URL', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({success: true}),
    });

    await api.queue.delete('item-99');

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/queue/item-99`, {
      method: 'DELETE',
    });
  });
});

describe('api.queue.next', () => {
  it('should call fetch with POST method to the next endpoint', async () => {
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({success: true}),
    });

    await api.queue.next();

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/queue/next`, {
      method: 'POST',
    });
  });
});
