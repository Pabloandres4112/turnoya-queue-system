import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {QueueList, Button} from '../components';
import {useQueue} from '../hooks';

/**
 * Pantalla de gestión de cola de turnos
 */
export const QueueScreen: React.FC = () => {
  const {queue, loading, nextInQueue, completeQueue} = useQueue();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cola de Turnos</Text>
        <Text style={styles.subtitle}>{queue.length} personas en espera</Text>
      </View>

      <QueueList
        items={queue}
        onComplete={completeQueue}
        loading={loading}
        emptyMessage="No hay turnos en la cola"
      />

      <View style={styles.footer}>
        <Button title="Siguiente Turno" onPress={nextInQueue} size="large" />
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
