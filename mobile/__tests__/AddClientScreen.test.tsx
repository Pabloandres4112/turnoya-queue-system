/**
 * Tests for AddClientScreen component
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {Alert} from 'react-native';
import AddClientScreen from '../src/screens/AddClientScreen';
import api from '../src/api';
import {getAllText, findButtonByText} from '../src/testUtils';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('../src/api', () => ({
  __esModule: true,
  default: {
    queue: {
      getAll: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      next: jest.fn(),
    },
  },
}));

jest.spyOn(Alert, 'alert');

describe('AddClientScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<AddClientScreen />);
    });
  });

  it('displays the Agregar Cliente title', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<AddClientScreen />);
    });

    expect(getAllText(renderer!.root)).toContain('Agregar Cliente');
  });

  it('displays input fields for client name and phone number', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<AddClientScreen />);
    });

    const {TextInput} = require('react-native');
    const inputs = renderer!.root.findAllByType(TextInput);

    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('shows error alert when client name is empty', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<AddClientScreen />);
    });

    const submitButton = findButtonByText(renderer!.root, 'Agregar a la Cola');

    await ReactTestRenderer.act(async () => {
      submitButton!.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'El nombre del cliente es requerido',
    );
  });

  it('shows error alert when phone number is empty but name is provided', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<AddClientScreen />);
    });

    const {TextInput} = require('react-native');
    const inputs = renderer!.root.findAllByType(TextInput);

    // Fill in client name (first input)
    await ReactTestRenderer.act(async () => {
      inputs[0].props.onChangeText('Juan Pérez');
    });

    const submitButton = findButtonByText(renderer!.root, 'Agregar a la Cola');

    await ReactTestRenderer.act(async () => {
      submitButton!.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'El número de teléfono es requerido',
    );
  });

  it('calls api.queue.create with form data when valid inputs are provided', async () => {
    (api.queue.create as jest.Mock).mockResolvedValueOnce({success: true});
    (Alert.alert as jest.Mock).mockImplementationOnce(
      (_title: string, _message: string, buttons?: Array<{onPress?: () => void}>) => {
        buttons?.[0]?.onPress?.();
      },
    );

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<AddClientScreen />);
    });

    const {TextInput} = require('react-native');
    const inputs = renderer!.root.findAllByType(TextInput);

    await ReactTestRenderer.act(async () => {
      inputs[0].props.onChangeText('Test Client');
      inputs[1].props.onChangeText('+573001234567');
    });

    const submitButton = findButtonByText(renderer!.root, 'Agregar a la Cola');

    await ReactTestRenderer.act(async () => {
      await submitButton!.props.onPress();
    });

    expect(api.queue.create).toHaveBeenCalledWith(
      expect.objectContaining({
        clientName: 'Test Client',
        phoneNumber: '+573001234567',
      }),
    );
  });

  it('shows error alert when api call fails', async () => {
    (api.queue.create as jest.Mock).mockRejectedValueOnce(
      new Error('Network error'),
    );

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<AddClientScreen />);
    });

    const {TextInput} = require('react-native');
    const inputs = renderer!.root.findAllByType(TextInput);

    await ReactTestRenderer.act(async () => {
      inputs[0].props.onChangeText('Test Client');
      inputs[1].props.onChangeText('+573001234567');
    });

    const submitButton = findButtonByText(renderer!.root, 'Agregar a la Cola');

    await ReactTestRenderer.act(async () => {
      await submitButton!.props.onPress();
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'No se pudo agregar el cliente',
    );
  });
});
