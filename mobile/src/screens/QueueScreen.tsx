import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {QueueList, QueueItem, Button} from '../components';

export const QueueScreen: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Cargar cola desde API
    loadQueue();
  }, []);

  const loadQueue = async () => {
    setLoading(true);
    try {
      // TODO: Llamar a queueAPI.getQueue()
      setQueue([]);
    } catch (error) {
      console.error('Error al cargar cola:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      // TODO: Llamar a queueAPI.nextInQueue()
      await loadQueue();
    } catch (error) {
      console.error('Error al pasar al siguiente:', error);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      // TODO: Llamar a queueAPI.completeQueueItem(id)
      await loadQueue();
    } catch (error) {
      console.error('Error al completar turno:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cola de Turnos</Text>
        <Text style={styles.subtitle}>{queue.length} personas en espera</Text>
      </View>

      <QueueList
        items={queue}
        onComplete={handleComplete}
        loading={loading}
        emptyMessage="No hay turnos en la cola"
      />

      <View style={styles.footer}>
        <Button title="Siguiente Turno" onPress={handleNext} size="large" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
});
