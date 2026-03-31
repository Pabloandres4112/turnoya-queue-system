/**
 * Tests for HomeScreen component
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import HomeScreen from '../src/screens/HomeScreen';
import {getAllText, findButtonByText} from '../src/testUtils';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: jest.fn(),
  }),
  useRoute: () => ({params: {}}),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders without crashing', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<HomeScreen />);
    });
  });

  it('displays the TurnoYa title', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });

    expect(getAllText(renderer!.root)).toContain('TurnoYa');
  });

  it('displays the subtitle text', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });

    expect(getAllText(renderer!.root)).toContain('Sistema de Gestión de Turnos');
  });

  it('displays navigation buttons for Queue, AddClient and Settings', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });

    const text = getAllText(renderer!.root);

    expect(text).toContain('Ver Cola de Turnos');
    expect(text).toContain('Agregar Cliente');
    expect(text).toContain('Configuración');
  });

  it('navigates to Queue screen when the queue button is pressed', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });

    const queueButton = findButtonByText(renderer!.root, 'Ver Cola de Turnos');

    await ReactTestRenderer.act(async () => {
      queueButton!.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('Queue');
  });

  it('navigates to AddClient screen when the add client button is pressed', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });

    const addClientButton = findButtonByText(renderer!.root, 'Agregar Cliente');

    await ReactTestRenderer.act(async () => {
      addClientButton!.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('AddClient');
  });

  it('navigates to Settings screen when the settings button is pressed', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<HomeScreen />);
    });

    const settingsButton = findButtonByText(renderer!.root, 'Configuración');

    await ReactTestRenderer.act(async () => {
      settingsButton!.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('Settings');
  });
});
