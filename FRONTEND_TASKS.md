# Frontend Tasks - Nexturna MVP

Objetivo: completar las funcionalidades del frontend móvil para operar 100% con el backend actual.

Nombre oficial del producto: Nexturna.

## 1. Estado actual

Total de tareas: 25
Completadas: 3
En progreso: 0
Pendientes: 22

## 2. Backend actual verificado

Base URL local:
- http://localhost:3000/api/v1

Endpoints reales disponibles:
- Auth: POST /auth/register, POST /auth/login, GET /auth/me
- Users: GET /users/:id, GET /users/:id/settings, PUT /users/:id, GET/POST/DELETE /users/:id/excluded-contacts
- Queue: GET /queue, GET /queue/:date, POST /queue, PUT /queue/:id, DELETE /queue/:id, POST /queue/next, POST /queue/complete/:id, POST /queue/skip/:id, POST /queue/pause, POST /queue/resume
- Message logs: GET /message-logs, GET /message-logs/:id, GET /message-logs/phone/:phoneNumber, GET /message-logs/queue/:queueId, POST /message-logs, PUT /message-logs/:id
- Webhook: GET /webhooks/whatsapp, POST /webhooks/whatsapp

Nota importante:
- En backend hoy no existe endpoint de pagos/planes todavía. El frontend puede dejar lista la UI y contratos, pero la integración final depende de endpoints nuevos.

## 3. Fase 1 - Setup inicial

### 1. Estructura de carpetas
Estado: DONE
- mobile/src/api/index.ts
- mobile/src/screens (4 pantallas base)
- mobile/src/navigation/AppNavigator.tsx
- mobile/src/hooks/useQueue.ts
- mobile/src/types/index.ts
- mobile/src/constants/index.ts
- mobile/src/utils/formatters.ts

### 2. React Navigation
Estado: DONE
- @react-navigation/native
- @react-navigation/native-stack
- react-native-screens
- react-native-safe-area-context
- react-native-gesture-handler

### 3. Pantallas base
Estado: DONE
- HomeScreen
- QueueScreen
- AddClientScreen
- SettingsScreen

## 4. Fase 2 - Autenticación frontend

### 4. Login Screen
Estado: TODO
Archivo: mobile/src/screens/LoginScreen.tsx
- [ ] Campo identifier (email o whatsapp)
- [ ] Campo password
- [ ] Validación local de campos
- [ ] Botón ingresar
- [ ] Estado loading
- [ ] Manejo de errores 401/403/500
- [ ] Guardado de token en AsyncStorage
- [ ] Navegación a Home

### 5. Signup Screen
Estado: TODO
Archivo: mobile/src/screens/SignupScreen.tsx
- [ ] businessName
- [ ] whatsappNumber (E.164)
- [ ] email opcional
- [ ] password (min 6)
- [ ] confirm password
- [ ] términos y condiciones
- [ ] validaciones de formulario
- [ ] integración con POST /auth/register
- [ ] auto login opcional

### 6. AuthContext
Estado: TODO
Archivo: mobile/src/context/AuthContext.tsx
- [ ] user, token, isLoading, error
- [ ] login(identifier, password)
- [ ] register(data)
- [ ] logout()
- [ ] restoreSession()
- [ ] persistencia AsyncStorage
- [ ] refresh de perfil con GET /auth/me

### 7. Rutas protegidas
Estado: TODO
Archivo: mobile/src/navigation/AppNavigator.tsx
- [ ] Auth stack si no hay token
- [ ] App stack si hay token
- [ ] Splash mientras valida sesión
- [ ] redirección automática en 401

## 5. Fase 3 - Integración backend

### 8. Cliente API completo
Estado: TODO
Archivo: mobile/src/api/index.ts
- [ ] wrapper HTTP con base /api/v1
- [ ] interceptores de Authorization
- [ ] parseo estandarizado de errores
- [ ] reintentos para 5xx/timeout
- [ ] cancelación de requests en unmount

### 9. Hook useAuth
Estado: TODO
Archivo: mobile/src/hooks/useAuth.ts
- [ ] exponer user/token/isLoading/error
- [ ] wrappers login/register/logout
- [ ] clearError

### 10. Hook useQueue
Estado: TODO
Archivo: mobile/src/hooks/useQueue.ts
- [ ] getQueue()
- [ ] getQueueByDate(date) usando /queue/:date
- [ ] addToQueue()
- [ ] nextInQueue()
- [ ] completeQueue(id) usando /queue/complete/:id
- [ ] skipQueue(id) usando /queue/skip/:id
- [ ] refresh manual y automático
- [ ] gestión de errores

### 11. Hook useSettings
Estado: TODO
Archivo: mobile/src/hooks/useSettings.ts
- [ ] getUserSettings(userId)
- [ ] updateUser(userId, { settings })
- [ ] addExcludedContact
- [ ] removeExcludedContact
- [ ] pauseQueue/resumeQueue

## 6. Fase 4 - Pantallas operativas

### 12. HomeScreen mejorada
Estado: TODO
- [ ] nombre del negocio
- [ ] métricas de cola del día
- [ ] estado de automatización
- [ ] estado de pausa de cola
- [ ] botones rápidos
- [ ] refresh

### 13. QueueScreen mejorada
Estado: TODO
- [ ] cliente actual destacado
- [ ] próximos clientes
- [ ] completar/no-show/siguiente
- [ ] pull to refresh
- [ ] búsqueda por nombre/teléfono
- [ ] detalle de cliente

### 14. AddClientScreen mejorada
Estado: TODO
- [ ] validación nombre (3-100)
- [ ] validación teléfono E.164
- [ ] prioridad
- [ ] notas opcionales
- [ ] mensajes de conflicto (duplicado, cola pausada)

### 15. SettingsScreen mejorada
Estado: TODO
- [ ] editar settings del negocio vía PUT /users/:id
- [ ] contactos excluidos
- [ ] pausa/reanuda cola
- [ ] acceso a historial de mensajes
- [ ] logout

### 16. ClientDetailScreen
Estado: TODO
- [ ] datos del cliente
- [ ] posición y ETA
- [ ] acciones operativas
- [ ] historial de mensajes del cliente

## 7. Fase 5 - Componentes reutilizables

### 17. Componentes UI comunes
Estado: TODO
Carpeta: mobile/src/components
- [ ] Button
- [ ] Input
- [ ] PhoneInput
- [ ] Card
- [ ] Badge de estado
- [ ] Loading
- [ ] EmptyState
- [ ] ErrorMessage
- [ ] Header
- [ ] BottomSheet

## 8. Fase 6 - Planes, límites y pagos

### 18. Planes en frontend (sin backend de pagos aún)
Estado: TODO
Archivo sugerido: mobile/src/screens/PlansScreen.tsx
- [ ] tarjeta plan Gratis
- [ ] tarjeta plan Basico
- [ ] tarjeta plan Pro
- [ ] mostrar límites por plan
- [ ] mostrar plan actual
- [ ] bloquear features según límite local

Límites objetivo de producto:
- Gratis: 50 turnos/mes
- Basico: 500 turnos/mes
- Pro: ilimitado

### 19. Tarjetas de pago (UI + contrato)
Estado: TODO
Archivo sugerido: mobile/src/screens/PaymentMethodsScreen.tsx
- [ ] listar tarjetas guardadas
- [ ] agregar tarjeta
- [ ] eliminar tarjeta
- [ ] marcar tarjeta principal
- [ ] validación de formulario de tarjeta
- [ ] contrato para Stripe o Mercado Pago

### 20. Suscripciones y facturación (UI + contrato)
Estado: TODO
- [ ] cambiar de plan
- [ ] confirmar upgrade/downgrade
- [ ] historial de transacciones
- [ ] próxima fecha de cobro
- [ ] estados de pago (ok, pendiente, fallido)

## 9. Fase 7 - Persistencia local

### 21. AsyncStorage y modo offline
Estado: TODO
- [ ] auth:token
- [ ] auth:user
- [ ] queue:cache
- [ ] settings:cache
- [ ] plan:current
- [ ] sincronización al recuperar conexión

## 10. Fase 8 - Validaciones y errores

### 22. Validaciones de cliente
Estado: TODO
Archivo: mobile/src/utils/validators.ts
- [ ] email
- [ ] password
- [ ] phoneNumber E.164
- [ ] nombre
- [ ] límites numéricos

### 23. Manejo de errores HTTP
Estado: TODO
- [ ] 400 validación
- [ ] 401 sesión expirada
- [ ] 403 permisos
- [ ] 404 recurso
- [ ] 409 conflicto de negocio
- [ ] 500 error servidor
- [ ] sin conexión

## 11. Fase 9 - Testing

### 24. Unit tests frontend
Estado: TODO
- [ ] hooks
- [ ] componentes
- [ ] validadores
- [ ] mocks de API y AsyncStorage
- [ ] cobertura mínima 70%

### 25. E2E tests frontend
Estado: TODO
- [ ] login
- [ ] alta de cliente
- [ ] flujo de cola
- [ ] configuración
- [ ] logout

## 12. Definition of Done frontend

Nexturna frontend se considera 100% implementado cuando:
- [ ] login y registro reales funcionando con backend
- [ ] sesión persistente con AsyncStorage
- [ ] todos los flujos de cola funcionando con endpoints actuales
- [ ] settings y excluded contacts sincronizados
- [ ] historial de mensajes visible
- [ ] validaciones completas de formularios
- [ ] manejo robusto de errores y offline
- [ ] tests unitarios y e2e en verde
- [ ] pantalla de planes y flujo de tarjetas listos para integrar con backend de pagos

## 13. Próximo sprint recomendado

Sprint siguiente (alto impacto):
1. Tarea 6 AuthContext
2. Tarea 8 Cliente API
3. Tarea 4 Login
4. Tarea 5 Signup
5. Tarea 7 Rutas protegidas

Con eso queda habilitado el resto del roadmap funcional.
