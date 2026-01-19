import {useState, useEffect} from 'react';
import {queueAPI} from '../api';
import {QueueItem} from '../components/QueueList';

export const useQueue = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await queueAPI.getQueue();
      setQueue(response.data.queue || []);
    } catch (err) {
      setError('Error al cargar la cola');
      console.error('Error fetching queue:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToQueue = async (clientName: string, phoneNumber: string) => {
    try {
      await queueAPI.addToQueue({clientName, phoneNumber});
      await fetchQueue();
    } catch (err) {
      setError('Error al agregar a la cola');
      console.error('Error adding to queue:', err);
    }
  };

  const nextInQueue = async () => {
    try {
      await queueAPI.nextInQueue();
      await fetchQueue();
    } catch (err) {
      setError('Error al pasar al siguiente');
      console.error('Error moving to next:', err);
    }
  };

  const completeQueueItem = async (id: string) => {
    try {
      await queueAPI.completeQueueItem(id);
      await fetchQueue();
    } catch (err) {
      setError('Error al completar turno');
      console.error('Error completing queue item:', err);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return {
    queue,
    loading,
    error,
    fetchQueue,
    addToQueue,
    nextInQueue,
    completeQueueItem,
  };
};
