/**
 * Tipos e Interfaces de TurnoYa Mobile App
 * Definiciones centralizadas para type safety en toda la aplicación
 */

// ============ QUEUE (Colas) ============

/**
 * Representa un cliente en la cola de espera
 */
export interface QueueItem {
  id: string;
  clientName: string;
  phoneNumber: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'noShow';
  position: number;
  estimatedTime: number;
  priority?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============ USER (Usuario/Negocio) ============

/**
 * Configuración personalizada del negocio
 */
export interface UserSettings {
  averageServiceTime: number;
  automationEnabled: boolean;
  notificationsEnabled: boolean;
  excludedContacts?: string[];
  maxDaysAhead?: number;
  autoMessageTemplate?: string;
  businessHours?: {
    startTime: string;
    endTime: string;
  };
}

/**
 * Información del usuario/propietario del negocio
 */
export interface User {
  id: string;
  businessName: string;
  whatsappNumber: string;
  email?: string;
  settings?: UserSettings;
  createdAt?: string;
  updatedAt?: string;
}

// ============ AUTH & CONTEXT ============

/**
 * Tipo del contexto de autenticación
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (businessName: string, whatsappNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  updateSettings: (settings: UserSettings) => Promise<void>;
}

// ============ API RESPONSES ============

/**
 * Respuesta genérica de API con éxito
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Información de error de API
 */
export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}

// ============ NOTIFICATIONS ============

/**
 * Notificación de la app
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'queue_update' | 'turn_ready' | 'custom';
  read: boolean;
  createdAt: string;
}

// ============ HOOK RETURN TYPES ============

/**
 * Retorno del hook useQueue
 */
export interface UseQueueReturn {
  queue: QueueItem[];
  loading: boolean;
  error: string | null;
  loadQueue: () => Promise<void>;
  addToQueue: (item: Partial<QueueItem>) => Promise<void>;
  removeFromQueue: (id: string) => Promise<void>;
  nextInQueue: () => Promise<void>;
  completeQueue: (id: string) => Promise<void>;
}

/**
 * Retorno del hook useAuth
 */
export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (businessName: string, whatsappNumber: string) => Promise<void>;
  logout: () => Promise<void>;
  updateSettings: (settings: UserSettings) => Promise<void>;
}

// ============ COMPONENT PROPS ============

/**
 * Props del componente Button
 */
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

/**
 * Props del componente Card
 */
export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: any;
}

/**
 * Props del componente QueueList
 */
export interface QueueListProps {
  items: QueueItem[];
  onNext?: () => void;
  onComplete?: (id: string) => void;
  onItemPress?: (item: QueueItem) => void;
  loading?: boolean;
  emptyMessage?: string;
}

// ============ SCREEN PROPS ============

/**
 * Props para las pantallas con navigation
 */
export interface ScreenProps {
  navigation?: any;
  route?: any;
}
