/**
 * Tests for SettingsScreen component
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import SettingsScreen from '../src/screens/SettingsScreen';
import {getAllText} from '../src/testUtils';

describe('SettingsScreen', () => {
  it('renders without crashing', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<SettingsScreen />);
    });
  });

  it('displays the Configuración title', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });

    expect(getAllText(renderer!.root)).toContain('Configuración');
  });

  it('displays the business name setting', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });

    expect(getAllText(renderer!.root)).toContain('Nombre del Negocio');
  });

  it('displays the average service time setting', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });

    const text = getAllText(renderer!.root);

    expect(text).toContain('Tiempo Promedio de Servicio');
    expect(text).toContain('30 minutos');
  });

  it('displays the WhatsApp notifications setting', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });

    const text = getAllText(renderer!.root);

    expect(text).toContain('Notificaciones WhatsApp');
    expect(text).toContain('Activadas');
  });

  it('displays the advance days setting', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });

    const text = getAllText(renderer!.root);

    expect(text).toContain('Días de anticipación');
    expect(text).toContain('7 días');
  });

  it('displays the version footer', async () => {
    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<SettingsScreen />);
    });

    expect(getAllText(renderer!.root)).toContain('TurnoYa v1.0.0');
  });
});
