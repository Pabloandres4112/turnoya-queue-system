/**
 * Tests for QueueScreen component
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import QueueScreen from '../src/screens/QueueScreen';
import api from '../src/api';
import {getAllText, findButtonByText} from '../src/testUtils';

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

const mockQueueData = {
  queue: [
    {
      id: '1',
      clientName: 'Juan Pérez',
      phoneNumber: '+573001234567',
      position: 1,
      status: 'in-progress',
      estimatedTime: 15,
      priority: false,
      createdAt: '2024-01-01T00:00:00.000Z',
      queueDate: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      clientName: 'María García',
      phoneNumber: '+573009876543',
      position: 2,
      status: 'waiting',
      estimatedTime: 30,
      priority: true,
      createdAt: '2024-01-01T00:00:00.000Z',
      queueDate: '2024-01-01T00:00:00.000Z',
    },
  ],
  total: 2,
  currentPosition: 1,
  message: 'OK',
};

describe('QueueScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows a loading indicator while data is being fetched', async () => {
    (api.queue.getAll as jest.Mock).mockReturnValueOnce(
      new Promise(() => {}),
    );

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<QueueScreen />);
    });

    const {ActivityIndicator} = require('react-native');
    const indicators = renderer!.root.findAllByType(ActivityIndicator);

    expect(indicators.length).toBeGreaterThan(0);
  });

  it('renders without crashing after data loads', async () => {
    (api.queue.getAll as jest.Mock).mockResolvedValueOnce(mockQueueData);

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<QueueScreen />);
    });

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });
  });

  it('displays client names after data loads', async () => {
    (api.queue.getAll as jest.Mock).mockResolvedValueOnce(mockQueueData);

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<QueueScreen />);
    });

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const text = getAllText(renderer!.root);

    expect(text).toContain('Juan Pérez');
    expect(text).toContain('María García');
  });

  it('displays the queue total count label', async () => {
    (api.queue.getAll as jest.Mock).mockResolvedValueOnce(mockQueueData);

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<QueueScreen />);
    });

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(getAllText(renderer!.root)).toContain('Total');
  });

  it('displays the "Siguiente Turno" button', async () => {
    (api.queue.getAll as jest.Mock).mockResolvedValueOnce(mockQueueData);

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<QueueScreen />);
    });

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(getAllText(renderer!.root)).toContain('Siguiente Turno');
  });

  it('calls api.queue.next when "Siguiente Turno" is pressed', async () => {
    (api.queue.getAll as jest.Mock).mockResolvedValue(mockQueueData);
    (api.queue.next as jest.Mock).mockResolvedValueOnce({success: true});

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<QueueScreen />);
    });

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    const nextButton = findButtonByText(renderer!.root, 'Siguiente Turno');

    await ReactTestRenderer.act(async () => {
      await nextButton!.props.onPress();
    });

    expect(api.queue.next).toHaveBeenCalledTimes(1);
  });

  it('shows empty state when there are no queue items', async () => {
    (api.queue.getAll as jest.Mock).mockResolvedValueOnce({
      queue: [],
      total: 0,
      currentPosition: 0,
    });

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<QueueScreen />);
    });

    await ReactTestRenderer.act(async () => {
      await Promise.resolve();
    });

    expect(getAllText(renderer!.root)).toContain('No hay turnos en la cola');
  });
});
