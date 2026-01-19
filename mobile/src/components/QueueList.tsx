import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';

export interface QueueItem {
  id: string;
  clientName: string;
  phoneNumber: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'no-show';
  position: number;
  estimatedTime: number;
}

interface QueueListProps {
  items: QueueItem[];
  onNext?: () => void;
  onComplete?: (id: string) => void;
  onItemPress?: (item: QueueItem) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export const QueueList: React.FC<QueueListProps> = ({
  items,
  onNext,
  onComplete,
  onItemPress,
  loading = false,
  emptyMessage = 'No hay turnos en la cola',
}) => {
  const renderItem: ListRenderItem<QueueItem> = ({item}) => (
    <TouchableOpacity
      style={styles.itemWrapper}
      onPress={() => onItemPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.position}>#{item.position}</Text>
          <View style={styles.nameSection}>
            <Text style={styles.name}>{item.clientName}</Text>
            <Text style={styles.phone}>{item.phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.itemActions}>
          <Text style={styles.time}>{item.estimatedTime} min</Text>
          <View style={[styles.statusBadge, styles[`status_${item.status}`]]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{emptyMessage}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  position: {
    fontSize: 24,
    fontWeight: '700',
    marginRight: 16,
    color: '#007AFF',
    minWidth: 40,
  },
  nameSection: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  phone: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  itemActions: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  time: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 6,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  status_waiting: {
    backgroundColor: '#FFF3CD',
  },
  'status_in-progress': {
    backgroundColor: '#D1ECF1',
  },
  status_completed: {
    backgroundColor: '#D4EDDA',
  },
  status_'no-show': {
    backgroundColor: '#F8D7DA',
  },
  emptyContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
