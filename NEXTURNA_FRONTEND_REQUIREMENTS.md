# NEXTURNA - Requerimientos Frontend (Aplicación Móvil)

## 1. Visión del Producto

Nexturna es una plataforma de gestión de turnos y cupos por WhatsApp para pequeños negocios de servicios. La aplicación móvil permite que dueños de negocios gestionen su cola de atención, configure automatizaciones, y reciba notificaciones en tiempo real.

Rubros objetivo:
- Barbería y peluquería
- Técnicos y talleres
- Consultorios y servicios médicos
- Servicios de atención por orden de llegada
- Cualquier negocio que requiera gestión de turnos

---

## 2. Estado Actual del Backend

El backend está completamente funcional con:

2.1 Autenticación
- Registro de usuarios con JWT
- Login con token persistente
- Roles: BUSINESS_OWNER, BUSINESS_STAFF, PLATFORM_ADMIN

2.2 Gestión de Usuarios
- Creación de perfil de negocio
- Configuración por negocio:
  - averageServiceTime (tiempo promedio de atención)
  - automationEnabled (activar/desactivar automáticas)
  - excludedContacts (números que no reciben mensajes)
  - maxDaysAhead (máxima anticipación para crear turnos)
  - queuePaused (pausar recepción de turnos)

2.3 Gestión de Turnos (Queue)
- Crear turno con validación
- Listar turnos del día
- Obtener turno actual (IN_PROGRESS)
- Avanzar al siguiente turno
- Completar turno con tiempo real de atención
- Saltarse turno (no asistió)
- Pausa/reanudación de cola
- Cálculo automático de tiempo estimado
- Filtro por fecha

2.4 Integración WhatsApp (Tarea 12-13)
- Cliente HTTP a Meta Cloud API
- Envío de confirmaciones
- Envío de avisos (próximo, listo)
- Webhook para recibir mensajes entrantes
- Validación de firma HMAC-SHA256
- Logging de todos los mensajes

2.5 Auditoría (Tarea 15)
- MessageLog con dirección (SENT/RECEIVED)
- Tipos: CONFIRMATION, APPROACHING, READY, CUSTOM, INCOMING
- Estado: PENDING, SENT, DELIVERED, FAILED
- Historial por número, turno o negocio

---

## 3. Requerimientos Frontend - Funcionalidades Críticas

### 3.1 Autenticación (CRÍTICO)

#### 3.1.1 Login
- Email o número de WhatsApp
- Contraseña
- Validación en cliente
- Manejo de errores:
  - Usuario no existe
  - Contraseña incorrecta
  - Conexión perdida
- Guardado de token en AsyncStorage
- Navegación a Home tras login exitoso

#### 3.1.2 Registro
- Nombre del dueño/gerente
- Nombre del negocio
- Email
- Número de WhatsApp (formato E.164: +57XXXXXXXXXX)
- Contraseña (mínimo 8 caracteres)
- Confirmar contraseña
- Aceptar términos
- Validaciones en cliente
- Manejo de errores:
  - Email ya registrado
  - Número de WhatsApp ya registrado
  - Validación de formato
- Auto-login tras registro exitoso
- Navegación a Home

#### 3.1.3 AuthContext
- State: user, token, isLoading, error
- Métodos: login, register, logout, refreshToken
- Persistencia en AsyncStorage
- Validación de token al iniciar app
- Auto-logout si token expira

#### 3.1.4 Rutas Protegidas
- Detectar token válido
- Stack de Auth (Login, Signup) si no autenticado
- Stack de App (Home, Queue, AddClient, Settings, Plans) si autenticado
- Splash screen mientras valida
- Redirigir a Login si token inválido

### 3.2 Pantalla de Home (CRÍTICO)

Mostrar:
- Bienvenida con nombre del dueño
- Nombre del negocio
- Información del plan actual (Gratis/Básico/Pro)
- Estado de automáticas (Pausada/Activa)
- Métricas del día:
  - Total clientes en cola
  - Cliente actual (nombre y teléfono)
  - Tiempo promedio de atención hoy
  - Clientes no asistieron
- 5 botones principales:
  - Ir a Cola (con badge de cantidad)
  - Agregar Cliente
  - Configuración
  - Ver Planes
  - Cerrar Sesión
- Indicador de sincronización
- Botón para refresh manual
- Indicador de conexión (conectado/desconectado)

### 3.3 Pantalla de Cola (CRÍTICO)

Mostrar:
- Lista de clientes en orden de llegada
- Cliente actual resaltado en color diferente
- Para cada cliente:
  - Posición en cola
  - Nombre
  - Teléfono
  - Hora de llegada
  - Tiempo estimado de espera
  - Prioridad (si aplica)
  - Notas (si existen)
- Acciones para cliente actual:
  - Botón "Siguiente" (avanza a siguiente)
  - Botón "Completar" (marca como completado)
  - Botón "No Asistió" (marca como skipped)
  - Modal para registrar tiempo real de atención
- Acciones adicionales:
  - Pull-to-refresh para actualizar
  - Búsqueda por nombre o teléfono
  - Filtro por estado (espera, en atención, completado)
- Modal al presionar cliente:
  - Detalles completos
  - Historial de mensajes enviados
  - Opción para contactar directamente
- Sincronización automática cada 30 segundos

### 3.4 Pantalla de Agregar Cliente (CRÍTICO)

Formulario con validaciones:
- Nombre del cliente (mínimo 3, máximo 100 caracteres)
- Número de WhatsApp (formato E.164: +57XXXXXXXXXX)
- Checkbox "Prioritario" (opcional)
- Campo de notas (opcional, máximo 500 caracteres)
- Validaciones:
  - Nombre no vacío
  - Teléfono válido
  - No duplicados el mismo día
  - Respetar límite de cupos según plan
  - No permitir si cola está pausada
  - Respeto de maxDaysAhead
- Acciones:
  - Botón "Agregar a Cola"
  - Botón "Cancelar"
  - Confirmación visual del éxito
  - Limpieza automática tras agregar
- Manejo de errores con mensajes claros
- Indicador de carga durante envío

### 3.5 Pantalla de Configuración (IMPORTANTE)

Secciones:

3.5.1 Información del Negocio
- Nombre del negocio (editable)
- Número de WhatsApp del negocio (editable)
- Email (editable)
- Ciudad/Ubicación (opcional)

3.5.2 Configuración Operativa
- Tiempo promedio de atención (en minutos, editable)
- Máxima anticipación para turnos (en días, editable)
- Horario de atención (inicio y fin, opcional)
- Máximo de clientes por día (según plan)

3.5.3 Automatización WhatsApp
- Toggle "Activar automatización"
- Toggle "Enviar confirmación"
- Toggle "Enviar aviso próximo"
- Toggle "Enviar aviso listo"
- Contactos excluidos:
  - Lista de números que NO reciben mensajes
  - Botón para agregar contacto
  - Botón para remover contacto

3.5.4 Pausa de Cola
- Toggle "Pausar recepción de turnos"
- Cuando está pausada, no se pueden agregar clientes
- Mostrar advertencia en Home y Queue

3.5.5 Plan Actual
- Nombre del plan (Gratis/Básico/Pro)
- Límites vigentes
- Botón "Ver Planes" para cambiar
- Próxima fecha de renovación

3.5.6 Cerrar Sesión
- Botón "Cerrar Sesión"
- Confirmación antes de salir

### 3.6 Pantalla de Planes y Pagos (IMPORTANTE)

3.6.1 Visualización de Planes
Mostrar 3 tarjetas:

PLAN GRATIS
- Costo: $0/mes
- Límites:
  - Hasta 50 turnos/mes
  - 1 negocio
  - Mensajería automática limitada (solo confirmación)
  - Soporte comunitario
  - Datos guardados 30 días
- Botón "Plan Actual" (si está activo) o "Activar"

PLAN BÁSICO
- Costo: $9.99/mes (o equivalente local)
- Límites:
  - Hasta 500 turnos/mes
  - 1 negocio
  - Todas las automatizaciones WhatsApp
  - Reportes básicos
  - Historial completo
  - Datos guardados indefinidamente
  - Soporte por email
- Botón "Activar" o "Cambiar a Este Plan"

PLAN PRO
- Costo: $29.99/mes (o equivalente local)
- Límites:
  - Turnos ilimitados/mes
  - Múltiples negocios (si se implementa)
  - Todas las features del Básico
  - Reportes avanzados
  - Exportar datos (CSV, PDF)
  - API para integraciones
  - Soporte prioritario
  - SLA de disponibilidad
- Botón "Activar" o "Cambiar a Este Plan"

3.6.2 Método de Pago
- Sección "Métodos de Pago"
- Agregar tarjeta:
  - Número de tarjeta (enmascarado)
  - Nombre del titular
  - Fecha de vencimiento
  - CVV
  - Código postal
- Listar tarjetas guardadas
- Botón para eliminar tarjeta
- Opción de pago único vs. suscripción
- Procesamiento seguro (usar Stripe, PayPal, MercadoPago)

3.6.3 Facturación
- Sección "Historial de Transacciones"
- Listar:
  - Fecha
  - Concepto
  - Monto
  - Estado (completado, pendiente, fallido)
- Botón para descargar recibo
- Mostrar próxima fecha de renovación (suscripciones)

3.6.4 Cambio de Plan
- Permitir cambio sin penalidad
- Cálculo prorrateado de diferencia
- Confirmación de cambio
- Aplicación inmediata

### 3.7 Pantalla de Detalles de Cliente (COMPLEMENTARIO)

Modal o pantalla con:
- Nombre completo
- Teléfono
- Hora de llegada
- Posición en cola
- Tiempo en espera actual
- Notas personales
- Prioridad
- Historial de mensajes enviados a este cliente:
  - Tipo (confirmación, próximo, listo)
  - Fecha y hora
  - Estado de envío (enviado, entregado, leído)
- Botones de acción:
  - Llamar directo
  - Enviar mensaje WhatsApp manual
  - Cambiar a prioritario
  - Agregar nota
  - Contacto anterior

### 3.8 Componentes Reutilizables

Crear biblioteca de componentes:
- Botón (primario, secundario, peligro)
- Input de texto (con validación)
- Input de teléfono (con formato E.164)
- Input de dinero
- Toggle/Switch
- Tarjeta (para planes, clientes, etc.)
- Modal/Diálogo
- Cargador/Spinner
- Indicador de estado (conectado/desconectado)
- Badge (para número de clientes)
- Encabezado personalizado
- Pie de página
- Alerta/Toast para mensajes

---

## 4. Integración con Backend Actual

### 4.1 Endpoints Requeridos (todos disponibles)

AUTENTICACIÓN
- POST /auth/register - Crear cuenta
- POST /auth/login - Obtener token
- POST /auth/logout - Invalidar token

USUARIOS
- GET /users/:id - Obtener perfil
- PUT /users/:id - Actualizar perfil
- GET /users/:id/settings - Obtener configuración
- PUT /users/:id/settings - Actualizar configuración
- GET /users/:id/excluded-contacts - Listar contactos excluidos
- POST /users/:id/excluded-contacts - Agregar contacto excluido
- DELETE /users/:id/excluded-contacts/:phone - Remover contacto excluido

TURNOS
- GET /queue - Listar cola del día actual
- GET /queue?queueDate=YYYY-MM-DD - Listar cola de una fecha específica
- POST /queue - Crear turno
- PUT /queue/:id - Actualizar turno
- DELETE /queue/:id - Eliminar turno
- POST /queue/:id/complete - Marcar como completado
- POST /queue/:id/skip - Marcar como no asistió (skip)
- POST /queue/next - Avanzar al siguiente
- POST /queue/pause - Pausar cola
- POST /queue/resume - Reanudar cola

MENSAJES
- GET /message-logs - Obtener historial de mensajes
- GET /message-logs/:id - Obtener un mensaje específico
- GET /message-logs/phone/:phoneNumber - Historial de un cliente
- GET /message-logs/queue/:queueId - Mensajes de un turno

WEBHOOK
- GET /webhooks/whatsapp - Verificación de webhook (no requiere autenticación)
- POST /webhooks/whatsapp - Recibir eventos (no requiere autenticación)

### 4.2 Headers Requeridos

Todas las requests autenticadas requieren:
```
Authorization: Bearer <token>
Content-Type: application/json
```

### 4.3 Estructura de Respuestas

Éxito (2xx):
```json
{
  "success": true,
  "data": {},
  "message": "Operación exitosa"
}
```

Error (4xx/5xx):
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

---

## 5. Gestión de Estado (Estado Global)

### 5.1 AuthContext
```
- user: { id, role, businessName, whatsappNumber, email }
- token: string
- isLoading: boolean
- error: string | null
- login(email, password)
- register(businessName, whatsappNumber, email, password)
- logout()
- refreshToken()
```

### 5.2 QueueContext
```
- queue: QueueItem[]
- isLoading: boolean
- error: string | null
- selectedDate: string
- getQueue(date)
- addToQueue(name, phone, priority, notes)
- nextInQueue()
- completeQueue(id, actualTime)
- skipQueue(id)
- refreshQueue()
```

### 5.3 SettingsContext
```
- settings: UserSettings
- isLoading: boolean
- error: string | null
- updateSettings(settings)
- pauseQueue()
- resumeQueue()
- addExcludedContact(phone)
- removeExcludedContact(phone)
```

### 5.4 PlanContext
```
- currentPlan: Plan
- methods: PaymentMethod[]
- transactions: Transaction[]
- isLoading: boolean
- error: string | null
- changePlan(planId)
- addPaymentMethod(card)
- removePaymentMethod(id)
- getTransactionHistory()
```

---

## 6. Persistencia Local (AsyncStorage)

Guardar localmente:
```
auth:token - JWT token
auth:user - Datos del usuario
auth:expiresAt - Fecha de expiración del token

queue:cache - Cache de última cola obtenida
queue:lastSync - Timestamp de última sincronización

settings:cache - Configuración del negocio
settings:lastSync - Timestamp de última sincronización

plan:current - Plan activo
plan:cachedLimits - Límites del plan

ui:theme - Tema (light/dark, opcional para futuro)
```

Estrategia de cache:
- Invalidar cache cada 30 segundos
- Permitir acceso offline con datos en cache
- Sincronizar automáticamente cuando hay conexión
- Mostrar indicador "datos desactualizados" si es offline

---

## 7. Validaciones en Cliente

### 7.1 Email
- Formato válido (regex estándar)
- Máximo 255 caracteres

### 7.2 Contraseña
- Mínimo 8 caracteres
- Máximo 128 caracteres
- Requisitos opcionales: mayúscula, número, símbolo (implementar según política)

### 7.3 Teléfono (WhatsApp)
- Formato E.164: +57XXXXXXXXXX
- Validar con librería (libphonenumber-js)
- País predefinido (Colombia por defecto, seleccionable)

### 7.4 Nombre (Cliente o Negocio)
- Mínimo 3 caracteres
- Máximo 100 caracteres
- Permitir letras, números, espacios, guiones

### 7.5 Notas
- Máximo 500 caracteres

### 7.6 Tiempo de Atención
- Número positivo (1-1440 minutos)
- Máxima anticipación (1-365 días)

---

## 8. Manejo de Errores HTTP

### 8.1 Errores Comunes

400 Bad Request
- Campo inválido o faltante
- Mostrar error específico del campo

401 Unauthorized
- Token inválido o expirado
- Limpiar storage
- Redirigir a Login
- Mostrar "Su sesión expiró"

403 Forbidden
- Permisos insuficientes
- Mostrar "No tienes permisos para esta acción"

404 Not Found
- Recurso no existe
- Mostrar "Elemento no encontrado"

409 Conflict
- Violación de regla de negocio (ej: cliente duplicado)
- Mostrar mensaje específico

500 Server Error
- Error interno del servidor
- Mostrar "Error del servidor, intenta de nuevo"
- Reintentar automáticamente

### 8.2 Sin Conexión

- Detectar falta de conexión
- Mostrar banner "Sin conexión"
- Permitir lectura de cache
- Encolar acciones para enviar cuando haya conexión
- Mostrar "Pendiente de sincronización"

---

## 9. Notificaciones y Alertas

### 9.1 Toast Notifications (messages breves)
- Éxito: "Cliente agregado a la cola"
- Error: "Error al conectar, intenta de nuevo"
- Info: "Cola actualizada"
- Duración: 3 segundos

### 9.2 Alertas Modales
- Confirmaciones críticas: "¿Cerrar sesión?"
- Errores importantes
- Cambios de plan

### 9.3 Notificaciones Push (futuro)
- Cuando sea turno del cliente (si la app está cerrada)
- Nuevos clientes agregados por otro usuario
- Recordatorios de pago
- Alertas de plan por vencer

---

## 10. Estructura de Carpetas Recomendada

```
mobile/
├── src/
│   ├── api/
│   │   ├── index.ts          (cliente HTTP)
│   │   ├── auth.ts           (endpoints de auth)
│   │   ├── queue.ts          (endpoints de cola)
│   │   ├── users.ts          (endpoints de usuarios)
│   │   ├── plans.ts          (endpoints de planes)
│   │   └── interceptors.ts   (interceptores)
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── QueueContext.tsx
│   │   ├── SettingsContext.tsx
│   │   └── PlanContext.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useQueue.ts
│   │   ├── useSettings.ts
│   │   ├── usePlans.ts
│   │   └── useNetworkStatus.ts
│   │
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SignupScreen.tsx
│   │   ├── home/
│   │   │   └── HomeScreen.tsx
│   │   ├── queue/
│   │   │   ├── QueueScreen.tsx
│   │   │   └── ClientDetailModal.tsx
│   │   ├── addclient/
│   │   │   └── AddClientScreen.tsx
│   │   ├── settings/
│   │   │   ├── SettingsScreen.tsx
│   │   │   ├── ExcludedContactsScreen.tsx
│   │   │   └── BusinessInfoScreen.tsx
│   │   └── plans/
│   │       ├── PlansScreen.tsx
│   │       └── PaymentScreen.tsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── PhoneInput.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Card.tsx
│   │   ├── queue/
│   │   │   ├── QueueItem.tsx
│   │   │   ├── QueueMetrics.tsx
│   │   │   └── ClientCard.tsx
│   │   ├── plans/
│   │   │   ├── PlanCard.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   └── TransactionList.tsx
│   │   └── settings/
│   │       ├── SettingsSection.tsx
│   │       └── ContactExcludeList.tsx
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthStack.tsx
│   │   ├── AppStack.tsx
│   │   └── types.ts
│   │
│   ├── utils/
│   │   ├── validators.ts      (validaciones)
│   │   ├── formatters.ts      (formato datos)
│   │   ├── asyncStorage.ts    (persistencia)
│   │   ├── constants.ts       (constantes)
│   │   └── colors.ts          (paleta de colores)
│   │
│   ├── types/
│   │   ├── index.ts           (tipos principales)
│   │   ├── auth.ts
│   │   ├── queue.ts
│   │   ├── user.ts
│   │   └── plans.ts
│   │
│   ├── App.tsx
│   └── index.ts
│
├── __tests__/
│   ├── hooks/
│   │   ├── useAuth.test.ts
│   │   ├── useQueue.test.ts
│   │   └── useSettings.test.ts
│   ├── components/
│   │   ├── Button.test.tsx
│   │   └── Input.test.tsx
│   └── screens/
│       ├── LoginScreen.test.tsx
│       └── HomeScreen.test.tsx
│
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

---

## 11. Dependencias Requeridas

Core:
- react-native ^0.83.1
- react ^18.x
- typescript ^5.x
- react-navigation/native ^7.x
- react-navigation/native-stack ^7.x

Estado y Context:
- react-native-async-storage/async-storage ^1.x

HTTP y Validaciones:
- axios ^1.x (o fetch nativo)
- libphonenumber-js ^1.x
- validator ^13.x

UI y UX:
- react-native-gesture-handler ^2.x
- react-native-screens ^4.x
- react-native-safe-area-context ^4.x

Testing:
- jest ^29.x
- @testing-library/react-native ^12.x
- @testing-library/jest-native ^5.x

Pagos (cuando se implemente):
- stripe/stripe-react-native ^1.x
- O react-native-mercado-pago-sdk ^1.x

---

## 12. Priorización de Desarrollo

FASE 1: Autenticación (1-2 semanas)
- Login/Signup
- AuthContext
- Rutas protegidas
- AsyncStorage para persistencia

FASE 2: Funcionalidad Core (2-3 semanas)
- Home Screen
- Queue Screen
- Add Client Screen
- Integración con endpoints de queue

FASE 3: Configuración (1-2 semanas)
- Settings Screen
- Contactos excluidos
- Pausa/Reanudación de cola

FASE 4: Planes y Pagos (2-3 semanas)
- Plans Screen
- Integración con procesador de pagos
- Historial de transacciones

FASE 5: Pulido y Testing (1-2 semanas)
- Unit tests
- E2E tests
- Optimización de performance
- Documentación

---

## 13. Definición de Completitud

La aplicación frontend está 100% implementada cuando:

Autenticación
- Login funciona con credenciales reales
- Signup funciona y crea cuenta
- Token se guarda y se envía en requests
- Logout limpia datos
- Session expira correctamente

Funcionalidad Core
- Home muestra métricas correctas
- Queue lista turnos del backend
- Agregar cliente crea turno en backend
- Siguiente avanza cliente en backend
- Completar guarda tiempo real
- Saltar marca como no asistió

Configuración
- Settings actualiza backend
- Contactos excluidos se sincronizan
- Pausa/Reanudación funciona

Planes y Pagos
- Mostrar planes con límites correctos
- Agregar tarjeta almacena de forma segura
- Cambiar de plan actualiza backend
- Historial de transacciones se muestra

Validaciones
- Todos los campos validan en cliente
- Mensajes de error son claros
- No permite enviar datos inválidos

Offline
- Cache permite leer datos sin conexión
- Indicador de desconexión visible
- Sincroniza automáticamente

Testing
- Todos los hooks tienen tests
- Principales componentes tienen tests
- E2E test de flujo completo pasa

Performance
- App inicia en menos de 3 segundos
- Transiciones entre pantallas fluidas
- Sincronización no bloquea UI

---

## 14. Métricas de Éxito

Del lado del usuario:
- Time to login: menos de 5 segundos
- Time to agregar cliente: menos de 30 segundos
- Tasa de error: menos de 1%
- App no se cuelga durante uso normal

Del lado del negocio:
- Retención: 60%+ de usuarios activos 30 días
- Turnos por negocio: promedio 20+/día
- Satisfacción: rating 4.5+/5 en app store

---

## 15. Notas Importantes

- Backend está completamente funcional
- No esperar por features de backend adicionales
- Enfoque en UX/UI responsive y fluida
- Optimizar para conexiones lenta (3G)
- Soportar Android 8+ y iOS 12+
- Respetar límites de datos según plan
- Mensajes de error siempre en español
- Colores y branding de Nexturna aplicados
- Documentar cambios en Git
- Revisar logs en development

---

ESTADO ACTUAL: Listo para comenzar FASE 1 (Autenticación)
PRÓXIMAS ACCIONES: Crear estructura base, AuthContext, y Login Screen
