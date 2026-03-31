/**
 * Tests for the useQueue custom hook
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {useQueue} from '../src/hooks/useQueue';
import api from '../src/api';

jest.mock('../src/api', () => ({
  __esModule: true,
  default: {
    queue: {
      getAll: jest.fn(),
      create: jest.fn(),
      next: jest.fn(),
    },
  },
}));

const mockQueue = [
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
];

const mockQueueResponse = {
  queue: mockQueue,
  total: 1,
  currentPosition: 1,
};

/** Helper: renders the hook inside a test component and exposes results via ref */
function renderUseQueue() {
  const resultRef: {current: ReturnType<typeof useQueue> | null} = {
    current: null,
  };

  function TestComponent() {
    const hookResult = useQueue();
    resultRef.current = hookResult;
    return null;
  }

  let renderer: ReactTestRenderer.ReactTestRenderer;
  ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<TestComponent />);
  });

  return {resultRef, renderer: renderer!};
}

describe('useQueue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.queue.getAll as jest.Mock).mockResolvedValue(mockQueueResponse);
  });

  it('should start with loading true and empty queue', () => {
    (api.queue.getAll as jest.Mock).mockReturnValueOnce(new Promise(() => {}));

    const {resultRef} = renderUseQueue();

    expect(resultRef.current!.loading).toBe(true);
    expect(resultRef.current!.queue).toEqual([]);
    expect(resultRef.current!.error).toBeNull();
  });

  it('should load queue data on mount', async () => {
    const {resultRef} = renderUseQueue();

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(api.queue.getAll).toHaveBeenCalledTimes(1);
    expect(resultRef.current!.queue).toEqual(mockQueue);
    expect(resultRef.current!.loading).toBe(false);
  });

  it('should expose loadQueue, addToQueue and nextInQueue functions', async () => {
    const {resultRef} = renderUseQueue();

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(typeof resultRef.current!.loadQueue).toBe('function');
    expect(typeof resultRef.current!.addToQueue).toBe('function');
    expect(typeof resultRef.current!.nextInQueue).toBe('function');
  });

  it('should set error when getAll throws', async () => {
    (api.queue.getAll as jest.Mock).mockRejectedValueOnce(
      new Error('Network error'),
    );

    const {resultRef} = renderUseQueue();

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(resultRef.current!.error).toBe('Error cargando la cola');
    expect(resultRef.current!.loading).toBe(false);
  });

  it('should call api.queue.create and reload when addToQueue is called', async () => {
    (api.queue.create as jest.Mock).mockResolvedValueOnce({success: true});

    const {resultRef} = renderUseQueue();

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    await ReactTestRenderer.act(async () => {
      await resultRef.current!.addToQueue({
        clientName: 'Nuevo Cliente',
        phoneNumber: '+573002222222',
      });
    });

    expect(api.queue.create).toHaveBeenCalledWith({
      clientName: 'Nuevo Cliente',
      phoneNumber: '+573002222222',
    });
    expect(api.queue.getAll).toHaveBeenCalledTimes(2);
  });

  it('should throw when addToQueue fails', async () => {
    (api.queue.create as jest.Mock).mockRejectedValueOnce(
      new Error('Failed'),
    );

    const {resultRef} = renderUseQueue();

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    await expect(
      ReactTestRenderer.act(async () => {
        await resultRef.current!.addToQueue({
          clientName: 'Bad',
          phoneNumber: '+573001111111',
        });
      }),
    ).rejects.toThrow('Error agregando a la cola');
  });

  it('should call api.queue.next and reload when nextInQueue is called', async () => {
    (api.queue.next as jest.Mock).mockResolvedValueOnce({success: true});

    const {resultRef} = renderUseQueue();

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    await ReactTestRenderer.act(async () => {
      await resultRef.current!.nextInQueue();
    });

    expect(api.queue.next).toHaveBeenCalledTimes(1);
    expect(api.queue.getAll).toHaveBeenCalledTimes(2);
  });

  it('should throw when nextInQueue fails', async () => {
    (api.queue.next as jest.Mock).mockRejectedValueOnce(new Error('Failed'));

    const {resultRef} = renderUseQueue();

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    await expect(
      ReactTestRenderer.act(async () => {
        await resultRef.current!.nextInQueue();
      }),
    ).rejects.toThrow('Error avanzando turno');
  });
});
