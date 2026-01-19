import {useState, useEffect} from 'react';
import {queueAPI} from '../api';
import type {QueueItem, UseQueueReturn} from '../types';

/**
 * Hook personalizado para gestionar la cola de turnos
 * @returns {UseQueueReturn} Estado y métodos de la cola
 */
export const useQueue = (): UseQueueReturn => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga la cola actual desde la API
   */
  const loadQueue = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await queueAPI.getQueue();
      // response.data es directamente QueueItem[]
      setQueue(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar la cola';
      setError(errorMessage);
      console.error('Error fetching queue:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Agrega un cliente a la cola
   */
  const addToQueue = async (item: Partial<QueueItem>): Promise<void> => {
    try {
      await queueAPI.addToQueue(item);
      await loadQueue();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al agregar a la cola';
      setError(errorMessage);
      console.error('Error adding to queue:', err);
    }
  };

  /**
   * Remueve un cliente de la cola
   */
  const removeFromQueue = async (id: string): Promise<void> => {
    try {
      await queueAPI.deleteQueue(id);
      await loadQueue();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al remover de la cola';
      setError(errorMessage);
      console.error('Error removing from queue:', err);
    }
  };

  /**
   * Avanza al siguiente en la cola
   */
  const nextInQueue = async (): Promise<void> => {
    try {
      await queueAPI.nextInQueue();
      await loadQueue();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al pasar al siguiente';
      setError(errorMessage);
      console.error('Error moving to next:', err);
    }
  };

  /**
   * Marca un turno como completado
   */
  const completeQueue = async (id: string): Promise<void> => {
    try {
      await queueAPI.completeQueueItem(id);
      await loadQueue();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al completar turno';
      setError(errorMessage);
      console.error('Error completing queue item:', err);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  return {
    queue,
    loading,
    error,
    loadQueue,
    addToQueue,
    removeFromQueue,
    nextInQueue,
    completeQueue,
  };
};
