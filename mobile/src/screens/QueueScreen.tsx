import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {QueueItem, QueueResponse} from '../types';
import api from '../api';

const QueueScreen: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadQueue = async () => {
    try {
      const response: QueueResponse = await api.queue.getAll();
      setQueue(response.queue);
    } catch (error) {
      console.error('Error cargando cola:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadQueue();
  };

  const handleNext = async () => {
    try {
      await api.queue.next();
      loadQueue();
    } catch (error) {
      console.error('Error avanzando turno:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return '#10b981';
      case 'waiting':
        return '#f59e0b';
      case 'completed':
        return '#6b7280';
      default:
        return '#ef4444';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'En atención';
      case 'waiting':
        return 'Esperando';
      case 'completed':
        return 'Completado';
      default:
        return 'No asistió';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Cargando cola...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cola de Turnos</Text>
        <Text style={styles.total}>Total: {queue.length}</Text>
      </View>

      <FlatList
        data={queue}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <View style={styles.queueItem}>
            <View style={styles.itemHeader}>
              <View style={styles.positionBadge}>
                <Text style={styles.positionText}>#{item.position}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {backgroundColor: getStatusColor(item.status)},
                ]}>
                <Text style={styles.statusText}>
                  {getStatusText(item.status)}
                </Text>
              </View>
            </View>

            <Text style={styles.clientName}>{item.clientName}</Text>
            <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            <Text style={styles.estimatedTime}>
              Tiempo estimado: {item.estimatedTime} min
            </Text>

            {item.priority && (
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>⚡ Prioritario</Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay turnos en la cola</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Siguiente Turno</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748b',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  total: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 5,
  },
  queueItem: {
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  positionBadge: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  positionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 5,
  },
  estimatedTime: {
    fontSize: 14,
    color: '#64748b',
  },
  priorityBadge: {
    marginTop: 10,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  priorityText: {
    color: '#f59e0b',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  nextButton: {
    backgroundColor: '#10b981',
    margin: 20,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QueueScreen;
