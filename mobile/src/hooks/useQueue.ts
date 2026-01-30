import {useState, useEffect, useCallback} from 'react';
import {QueueItem, QueueResponse} from '../types';
import api from '../api';

export const useQueue = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQueue = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response: QueueResponse = await api.queue.getAll();
      setQueue(response.queue);
    } catch (err) {
      setError('Error cargando la cola');
      console.error('Error cargando cola:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToQueue = useCallback(
    async (data: {
      clientName: string;
      phoneNumber: string;
      estimatedTime?: number;
      priority?: boolean;
    }) => {
      try {
        await api.queue.create(data);
        await loadQueue();
      } catch (err) {
        throw new Error('Error agregando a la cola');
      }
    },
    [loadQueue],
  );

  const nextInQueue = useCallback(async () => {
    try {
      await api.queue.next();
      await loadQueue();
    } catch (err) {
      throw new Error('Error avanzando turno');
    }
  }, [loadQueue]);

  useEffect(() => {
    loadQueue();
  }, [loadQueue]);

  return {
    queue,
    loading,
    error,
    loadQueue,
    addToQueue,
    nextInQueue,
  };
};
