import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Switch} from 'react-native';
import {Card, Button} from '../components';

export const SettingsScreen: React.FC = () => {
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [averageTime, setAverageTime] = useState(30);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuración</Text>
        </View>

        <Card title="Automatización">
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>WhatsApp Automático</Text>
            <Switch
              value={automationEnabled}
              onValueChange={setAutomationEnabled}
              trackColor={{false: '#767577', true: '#81C784'}}
              thumbColor={automationEnabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.settingDescription}>
            Responde automáticamente a mensajes de WhatsApp
          </Text>
        </Card>

        <Card title="Notificaciones">
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Notificaciones Push</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{false: '#767577', true: '#81C784'}}
              thumbColor={notificationsEnabled ? '#007AFF' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.settingDescription}>
            Recibe notificaciones de nuevos turnos
          </Text>
        </Card>

        <Card title="Tiempos">
          <View style={styles.setting}>
            <Text style={styles.settingLabel}>Tiempo promedio por atención</Text>
            <Text style={styles.settingValue}>{averageTime} min</Text>
          </View>
        </Card>

        <Card title="Contactos Excluidos">
          <Text style={styles.settingDescription}>
            Lista de contactos que no recibirán mensajes automáticos
          </Text>
          <Text style={styles.emptyText}>No hay contactos excluidos</Text>
        </Card>

        <View style={styles.actions}>
          <Button title="Guardar Cambios" onPress={() => {}} size="large" />
          <Button
            title="Más Opciones"
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 16,
  },
  actions: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  actionButton: {
    marginTop: 12,
  },
});
