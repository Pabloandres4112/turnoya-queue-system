import { useState, useEffect, useCallback } from 'react';
import { QueueItem, QueueResponse, CreateQueueDto } from '../types';
import { queueApi } from '../api';

export const useQueue = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: QueueResponse = await queueApi.getQueue();
      setQueue(response.queue ?? []);
      setTotal(response.total ?? 0);
    } catch {
      setError('Error al cargar la cola');
    } finally {
      setLoading(false);
    }
  }, []);

  const addToQueue = useCallback(
    async (data: CreateQueueDto) => {
      const item = await queueApi.addToQueue(data);
      await loadQueue();
      return item;
    },
    [loadQueue],
  );

  const nextInQueue = useCallback(async () => {
    await queueApi.nextInQueue();
    await loadQueue();
  }, [loadQueue]);

  const completeItem = useCallback(
    async (id: string) => {
      await queueApi.completeQueueItem(id);
      await loadQueue();
    },
    [loadQueue],
  );

  const removeItem = useCallback(
    async (id: string) => {
      await queueApi.removeFromQueue(id);
      await loadQueue();
    },
    [loadQueue],
  );

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  const activeQueue = queue.filter(
    (i) => i.status === 'waiting' || i.status === 'in-progress',
  );
  const currentItem = queue.find((i) => i.status === 'in-progress') ?? null;
  const waitingCount = queue.filter((i) => i.status === 'waiting').length;
  const completedCount = queue.filter((i) => i.status === 'completed').length;
  const noShowCount = queue.filter((i) => i.status === 'noShow').length;

  return {
    queue,
    activeQueue,
    currentItem,
    total,
    waitingCount,
    completedCount,
    noShowCount,
    loading,
    error,
    refresh: loadQueue,
    addToQueue,
    nextInQueue,
    completeItem,
    removeItem,
  };
};
