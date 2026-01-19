import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Card, Button} from '../components';

interface HomeScreenProps {
  navigation?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const stats = {
    inQueue: 0,
    completed: 0,
    noShow: 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>TurnoYa</Text>
          <Text style={styles.subtitle}>Gestión de turnos simplificada</Text>
        </View>

        <Card title="Estado del Día">
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.inQueue}</Text>
              <Text style={styles.statLabel}>En Cola</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.completed}</Text>
              <Text style={styles.statLabel}>Atendidos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.noShow}</Text>
              <Text style={styles.statLabel}>No Asistió</Text>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button title="Ver Cola" onPress={() => {}} variant="primary" size="large" />
          <Button
            title="Configuración"
            onPress={() => {}}
            variant="secondary"
            size="large"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 8,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  actions: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  actionButton: {
    marginTop: 12,
  },
});
