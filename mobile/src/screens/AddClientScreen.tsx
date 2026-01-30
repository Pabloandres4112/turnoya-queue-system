import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../api';

const AddClientScreen: React.FC = () => {
  const navigation = useNavigation();
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('30');
  const [priority, setPriority] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddClient = async () => {
    if (!clientName.trim()) {
      Alert.alert('Error', 'El nombre del cliente es requerido');
      return;
    }

    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'El número de teléfono es requerido');
      return;
    }

    setLoading(true);

    try {
      await api.queue.create({
        clientName: clientName.trim(),
        phoneNumber: phoneNumber.trim(),
        estimatedTime: parseInt(estimatedTime) || 30,
        priority,
      });

      Alert.alert('Éxito', 'Cliente agregado a la cola', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el cliente');
      console.error('Error agregando cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Agregar Cliente</Text>

        <Text style={styles.label}>Nombre del Cliente</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Juan Pérez"
          value={clientName}
          onChangeText={setClientName}
        />

        <Text style={styles.label}>Número de Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: +573001234567"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Tiempo Estimado (minutos)</Text>
        <TextInput
          style={styles.input}
          placeholder="30"
          value={estimatedTime}
          onChangeText={setEstimatedTime}
          keyboardType="numeric"
        />

        <View style={styles.priorityContainer}>
          <Text style={styles.label}>Cliente Prioritario</Text>
          <Switch
            value={priority}
            onValueChange={setPriority}
            trackColor={{false: '#d1d5db', true: '#93c5fd'}}
            thumbColor={priority ? '#2563eb' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAddClient}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Agregando...' : 'Agregar a la Cola'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#1e293b',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
  },
  cancelButton: {
    backgroundColor: '#64748b',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddClientScreen;
