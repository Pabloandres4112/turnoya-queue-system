# Nexturna - Contrato de Integración Frontend Backend

Documento técnico para implementar el frontend de Nexturna con el backend actual sin ambigüedades.

## 1. Base de API y convenciones

Base URL local:
- http://localhost:3000/api/v1

Headers para rutas autenticadas:
- Authorization: Bearer <token>
- Content-Type: application/json

Notas:
- El backend usa ValidationPipe con whitelist y transform.
- La app debe enviar campos exactos de cada DTO.

## 2. Contrato de autenticación

Endpoints reales:
- POST /auth/register
- POST /auth/login
- GET /auth/me

No existe actualmente:
- POST /auth/logout

### 2.1 Register request

```ts
interface RegisterRequest {
  businessName: string;
  whatsappNumber: string; // E.164
  email?: string;
  password: string; // min 6
}
```

### 2.2 Login request

```ts
interface LoginRequest {
  identifier: string; // email o whatsapp
  password: string;
}
```

### 2.3 Auth user response

```ts
interface AuthenticatedUser {
  id: string;
  role: 'platform_admin' | 'business_owner' | 'business_staff' | string;
  businessName: string;
  whatsappNumber: string;
  email: string | null;
  settings: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}
```

Persistencia sugerida en app:
- auth:token
- auth:user
- auth:expiresAt

## 3. Contrato de usuarios y settings

Endpoints reales:
- GET /users/:id
- GET /users/:id/settings
- PUT /users/:id
- GET /users/:id/excluded-contacts
- POST /users/:id/excluded-contacts
- DELETE /users/:id/excluded-contacts/:phoneNumber

No existe actualmente:
- PUT /users/:id/settings

Para actualizar settings se usa:
- PUT /users/:id con payload { settings: { ... } }

### 3.1 Tipos

```ts
interface UserSettings {
  averageServiceTime: number;
  automationEnabled: boolean;
  excludedContacts: string[];
  maxDaysAhead: number;
  queuePaused: boolean;
}

interface UpdateUserRequest {
  businessName?: string;
  email?: string;
  settings?: Partial<UserSettings>;
}
```

## 4. Contrato de queue

Endpoints reales:
- GET /queue
- GET /queue/:date
- POST /queue
- PUT /queue/:id
- DELETE /queue/:id
- POST /queue/next
- POST /queue/complete/:id
- POST /queue/skip/:id
- POST /queue/pause
- POST /queue/resume

### 4.1 Tipos principales

```ts
type QueueStatus = 'waiting' | 'in-progress' | 'completed' | 'noShow';

interface CreateQueueRequest {
  clientName: string;
  phoneNumber: string; // E.164
  estimatedTimeMinutes?: number;
  priority?: boolean;
  queueDate?: string; // YYYY-MM-DD
}

interface UpdateQueueRequest {
  status?: QueueStatus;
  estimatedTimeMinutes?: number;
  position?: number;
}
```

Importante para frontend:
- Para completar usar POST /queue/complete/:id (no /queue/:id/complete).
- Para no asistió usar POST /queue/skip/:id (no /queue/:id/skip).
- Para filtrar por fecha usar ruta /queue/:date.

## 5. Contrato de message logs

Endpoints reales:
- GET /message-logs
- GET /message-logs/:id
- GET /message-logs/phone/:phoneNumber
- GET /message-logs/queue/:queueId
- POST /message-logs
- PUT /message-logs/:id
- GET /message-logs/health/failed-count

### 5.1 Query disponible

```ts
interface MessageLogsQuery {
  phoneNumber?: string;
  direction?: 'SENT' | 'RECEIVED';
  status?: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED';
  limit?: number;
  offset?: number;
}
```

## 6. Contrato de webhook

Endpoints reales:
- GET /webhooks/whatsapp
- POST /webhooks/whatsapp

Uso:
- GET verifica challenge de Meta.
- POST recibe eventos de mensajes y status.

## 7. Mapa de implementación frontend

## 7.1 API client

Archivo objetivo:
- mobile/src/api/index.ts

Requisitos:
- Base URL configurable (dev/prod)
- Interceptor Authorization con token
- Parser de errores por status code
- Retry para 5xx y timeouts
- Manejo de desconexión

## 7.2 Context y hooks

Archivos objetivo:
- mobile/src/context/AuthContext.tsx
- mobile/src/hooks/useAuth.ts
- mobile/src/hooks/useQueue.ts
- mobile/src/hooks/useSettings.ts

Requisitos:
- restore session desde AsyncStorage
- invalidar sesión en 401
- sincronización periódica de queue
- actualización de settings con PUT /users/:id

## 7.3 Pantallas mínimas para operar

- LoginScreen
- SignupScreen
- HomeScreen
- QueueScreen
- AddClientScreen
- SettingsScreen
- ClientDetailScreen

## 8. Planes, límites y tarjetas (futuro cercano)

Estado actual backend:
- No hay módulo de planes/pagos aún.

Lo que el frontend sí puede dejar listo ahora:
- Pantalla de planes (Gratis, Basico, Pro)
- Pantalla de tarjetas (alta, baja, listado)
- Bloqueo visual por límites de plan
- Contratos TypeScript de pagos para integración posterior

Límites funcionales propuestos:
- Gratis: 50 turnos/mes
- Basico: 500 turnos/mes
- Pro: ilimitado

Backend requerido para cerrar pagos 100%:
- GET /plans
- POST /plans/subscribe
- GET /billing/payment-methods
- POST /billing/payment-methods
- DELETE /billing/payment-methods/:id
- GET /billing/transactions

## 9. Checklist de completitud frontend

Autenticación:
- [ ] register y login funcionando
- [ ] token persistido
- [ ] auth/me funcionando
- [ ] auto logout en 401

Operación de cola:
- [ ] listar cola hoy
- [ ] listar cola por fecha
- [ ] crear turno
- [ ] siguiente turno
- [ ] completar turno
- [ ] marcar noShow
- [ ] pausar y reanudar cola

Configuración:
- [ ] leer settings
- [ ] actualizar settings con PUT /users/:id
- [ ] gestionar excluded contacts

Mensajes:
- [ ] listar logs
- [ ] filtrar por teléfono
- [ ] ver logs por turno

Calidad:
- [ ] manejo de errores HTTP
- [ ] modo offline básico con cache
- [ ] tests unitarios de hooks
- [ ] tests de pantallas críticas

Pagos y planes:
- [ ] UI lista
- [ ] validación de límites en frontend
- [ ] integración backend de pagos pendiente

## 10. Recomendaciones de ejecución

Orden recomendado inmediato:
1. AuthContext + API client
2. Login y Signup
3. Hook useQueue + QueueScreen
4. Hook useSettings + SettingsScreen
5. Planes y tarjetas como módulo desacoplado

Con este orden Nexturna queda operativa con el backend actual y preparada para sumar billing sin refactor grande.
