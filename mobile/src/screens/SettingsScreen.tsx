import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configuración</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Nombre del Negocio</Text>
          <Text style={styles.settingValue}>Mi Negocio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Tiempo Promedio de Servicio</Text>
          <Text style={styles.settingValue}>30 minutos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notificaciones WhatsApp</Text>
          <Text style={styles.settingValue}>Activadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Días de anticipación</Text>
          <Text style={styles.settingValue}>7 días</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.version}>TurnoYa v1.0.0</Text>
          <Text style={styles.copyright}>© 2026 TurnoYa</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 30,
  },
  settingItem: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#475569',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 20,
  },
  version: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#cbd5e1',
  },
});

export default SettingsScreen;
