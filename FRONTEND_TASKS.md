# 📱 Frontend Tasks - TurnoYa MVP

**Objetivo:** Completar todas las funcionalidades necesarias para tener una **Aplicación Móvil (MVP)** funcional conectada al backend.

**Fecha de inicio:** 29 de Enero de 2026

---

## 🎯 Resumen de Tareas

Total de tareas: **20**
- ✅ Completadas: **3**
- 🔄 En progreso: **0**
- ⏳ Por hacer: **17**

---

## ✅ FASE 1: Setup Inicial (COMPLETADO)

### ✅ 1. Estructura de carpetas
- **Estado:** ✅ DONE
- **Descripción:** Crear estructura modular (api/, screens/, hooks/, constants/, utils/, etc.)
- **Archivos:** 
  - `mobile/src/api/index.ts`
  - `mobile/src/screens/` (4 pantallas)
  - `mobile/src/navigation/AppNavigator.tsx`
  - `mobile/src/hooks/useQueue.ts`
  - `mobile/src/types/index.ts`
  - `mobile/src/constants/index.ts`
  - `mobile/src/utils/formatters.ts`
- **Completado por:** 26-01-2026

### ✅ 2. React Navigation Setup
- **Estado:** ✅ DONE
- **Descripción:** Instalar y configurar React Navigation con Stack Navigator
- **Paquetes:** 
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `react-native-screens`
  - `react-native-safe-area-context`
  - `react-native-gesture-handler`
- **Archivo:** `mobile/src/navigation/AppNavigator.tsx`
- **Completado por:** 29-01-2026

### ✅ 3. Pantallas Base (4 pantallas)
- **Estado:** ✅ DONE
- **Descripción:** Crear 4 pantallas principales
- **Archivos:**
  - `mobile/src/screens/HomeScreen.tsx` (dashboard)
  - `mobile/src/screens/QueueScreen.tsx` (lista de cola)
  - `mobile/src/screens/AddClientScreen.tsx` (formulario)
  - `mobile/src/screens/SettingsScreen.tsx` (configuración)
- **Completado por:** 26-01-2026

---

## 🔄 FASE 2: Autenticación en Frontend (POR HACER)

### 4. Login Screen
- **Estado:** ⏳ TODO
- **Descripción:** Crear pantalla de login
- **Subtareas:**
  - [ ] Pantalla con campos email/teléfono y contraseña
  - [ ] Validación de campos en cliente
  - [ ] Botón "Ingresar"
  - [ ] Link "¿Olvidaste tu contraseña?"
  - [ ] Indicador de carga mientras se valida
  - [ ] Manejo de errores (usuario no existe, contraseña incorrecta)
  - [ ] Guardado de token en AsyncStorage
  - [ ] Navegación a Home después de login exitoso
- **Archivo:** `mobile/src/screens/LoginScreen.tsx`
- **Componentes requeridos:**
  - Botón reutilizable
  - Campo de input reutilizable
  - Validaciones (email válido, contraseña mínimo 6 caracteres)
- **Prioridad:** 🔴 ALTA

### 5. Register/Signup Screen
- **Estado:** ⏳ TODO
- **Descripción:** Crear pantalla de registro
- **Subtareas:**
  - [ ] Campos: nombre, email, teléfono, nombre del negocio, contraseña, confirmar
  - [ ] Validaciones en cliente
  - [ ] Aceptar términos y condiciones
  - [ ] Botón "Registrarse"
  - [ ] Indicador de carga
  - [ ] Manejo de errores (email ya existe, teléfono inválido)
  - [ ] Navegación a Login después de registro exitoso
  - [ ] Auto-login después de registro exitoso (opcional)
- **Archivo:** `mobile/src/screens/SignupScreen.tsx`
- **Validaciones:**
  - Email válido (regex)
  - Teléfono válido (10-15 dígitos)
  - Nombre no vacío
  - Contraseña mínimo 6 caracteres
  - Contraseñas coinciden
- **Prioridad:** 🔴 ALTA

### 6. AuthContext para Estado Global
- **Estado:** ⏳ TODO
- **Descripción:** Context API para manejar autenticación globalmente
- **Subtareas:**
  - [ ] Context con user, token, isLoading, error
  - [ ] Función login(email, password)
  - [ ] Función register(datos)
  - [ ] Función logout()
  - [ ] Función refreshToken()
  - [ ] Persistencia con AsyncStorage
  - [ ] Validar token al iniciar app
  - [ ] Provider wrapeado en App.tsx
- **Archivo:** `mobile/src/context/AuthContext.tsx`
- **Estructura:**
  ```typescript
  interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterDto) => Promise<void>;
    logout: () => Promise<void>;
  }
  ```
- **Prioridad:** 🔴 ALTA

### 7. Protección de Rutas (Navigation)
- **Estado:** ⏳ TODO
- **Descripción:** Navegar a Login o Home según autenticación
- **Subtareas:**
  - [ ] Detectar si hay token guardado
  - [ ] Mostrar Stack de Login si no está autenticado
  - [ ] Mostrar Stack de App si está autenticado
  - [ ] Pantalla de splash mientras se valida
  - [ ] Redireccionar a Login si token expira
- **Archivo:** `mobile/src/navigation/AppNavigator.tsx` (modificar)
- **Flujo:**
  ```
  App → AuthContext → Token disponible?
    → Sí → Stack App (Home, Queue, AddClient, Settings)
    → No → Stack Auth (Login, Signup)
  ```
- **Prioridad:** 🔴 ALTA

---

## 🔄 FASE 3: Integración con Backend (POR HACER)

### 8. Cliente API Completo
- **Estado:** ⏳ TODO (parcial)
- **Descripción:** Mejorar cliente HTTP para todas las operaciones
- **Subtareas:**
  - [ ] Autenticación (login, register, logout)
  - [ ] Gestión de cola (getQueue, addToQueue, nextQueue, etc.)
  - [ ] Gestión de configuración (getSettings, updateSettings)
  - [ ] Historial de mensajes
  - [ ] Interceptor para agregar token en headers
  - [ ] Manejo de errores automático
  - [ ] Retry automático en caso de fallo
  - [ ] Cancelación de requests pendientes
- **Archivo:** `mobile/src/api/index.ts`
- **Funciones:**
  ```typescript
  // Auth
  export const login = (email: string, password: string)
  export const register = (data: RegisterDto)
  
  // Queue
  export const getQueue = ()
  export const addToQueue = (clientName: string, phoneNumber: string, priority?: boolean)
  export const nextInQueue = ()
  export const completeQueue = (id: string)
  export const skipQueue = (id: string)
  export const getQueueByDate = (date: string)
  
  // Settings
  export const getBusinessSettings = ()
  export const updateBusinessSettings = (settings: SettingsDto)
  ```
- **Prioridad:** 🔴 ALTA

### 9. Hook useAuth Completo
- **Estado:** ⏳ TODO
- **Descripción:** Custom hook para operaciones de autenticación
- **Subtareas:**
  - [ ] Hook que usa AuthContext
  - [ ] Validar token local
  - [ ] Manejar login/logout
  - [ ] Guardar token en AsyncStorage
  - [ ] Refrescar token si está vencido
  - [ ] Retornar { user, token, isLoading, error, login, register, logout }
- **Archivo:** `mobile/src/hooks/useAuth.ts`
- **Prioridad:** 🔴 ALTA

### 10. Hook useQueue Mejorado
- **Estado:** ⏳ TODO
- **Descripción:** Mejorar hook para operaciones de cola
- **Subtareas:**
  - [ ] Conectar con API real (no mock)
  - [ ] getQueue() con carga desde backend
  - [ ] addToQueue() POST al backend
  - [ ] nextInQueue() POST al backend
  - [ ] completeQueue() PUT al backend
  - [ ] Manejo de errores
  - [ ] Refresh manual y automático
  - [ ] Pull-to-refresh en QueueScreen
  - [ ] Retornar { queue, isLoading, error, addToQueue, nextInQueue, completeQueue, refresh }
- **Archivo:** `mobile/src/hooks/useQueue.ts`
- **Cambios:**
  - De datos mock a API real
  - Actualizar tipo de respuesta
  - Manejar errores HTTP
- **Prioridad:** 🔴 ALTA

### 11. Hook useSettings Nuevo
- **Estado:** ⏳ TODO
- **Descripción:** Custom hook para configuración del negocio
- **Subtareas:**
  - [ ] Obtener configuración actual
  - [ ] Actualizar configuración
  - [ ] Almacenar configuración localmente
  - [ ] Sincronizar con backend
  - [ ] Retornar { settings, isLoading, error, updateSettings, refresh }
- **Archivo:** `mobile/src/hooks/useSettings.ts`
- **Configuración:**
  - Tiempo promedio de atención
  - Nombre del negocio
  - Horario de atención
  - Máximo de cupos por día
  - Contactos excluidos
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 4: Pantallas Mejoradas (POR HACER)

### 12. HomeScreen Mejorada
- **Estado:** ⏳ TODO
- **Descripción:** Mejorar pantalla de inicio
- **Subtareas:**
  - [ ] Mostrar nombre del negocio
  - [ ] Mostrar usuario autenticado
  - [ ] Mostrar métricas:
    - Clientes en cola hoy
    - Promedio de espera
    - Clientes atendidos
    - Clientes no asistieron
  - [ ] Botones principales (Queue, AddClient, Settings)
  - [ ] Botón "Salir" para logout
  - [ ] Indicador de sincronización
  - [ ] Botón para manual refresh
  - [ ] Estado de automatización (pausado/activo)
- **Archivo:** `mobile/src/screens/HomeScreen.tsx` (actualizar)
- **Datos requeridos:** 
  - useAuth() - obtener usuario
  - useQueue() - obtener métricas de cola
  - useSettings() - obtener nombre del negocio
- **Prioridad:** 🟡 MEDIA

### 13. QueueScreen Mejorada
- **Estado:** ⏳ TODO
- **Descripción:** Mejorar pantalla de gestión de cola
- **Subtareas:**
  - [ ] Conectar con API real
  - [ ] Pull-to-refresh para actualizar
  - [ ] Mostrar cliente actual (highlight)
  - [ ] Mostrar próximos 3-5 clientes
  - [ ] Botón "Siguiente" para avanzar
  - [ ] Botón "Completar" para marcar como hecho
  - [ ] Botón "No asistió" para skip
  - [ ] Información detallada al presionar cliente
  - [ ] Ordenamiento por prioridad
  - [ ] Indicador de tiempo estimado actualizado
  - [ ] Búsqueda por nombre/teléfono
- **Archivo:** `mobile/src/screens/QueueScreen.tsx` (actualizar)
- **Datos requeridos:**
  - useQueue() - obtener cola
  - useSettings() - obtener tiempo promedio
- **Acciones:**
  - onPress "Siguiente" → nextInQueue()
  - onPress "Completar" → completeQueue(id)
  - onPress "No asistió" → skipQueue(id)
  - Swipe-right → completar
  - Swipe-left → no asistió
- **Prioridad:** 🟡 MEDIA

### 14. AddClientScreen Mejorada
- **Estado:** ⏳ TODO
- **Descripción:** Mejorar formulario de agregar cliente
- **Subtareas:**
  - [ ] Validar nombre (no vacío, mínimo 3 caracteres)
  - [ ] Validar teléfono (formato válido)
  - [ ] Checkbox para "cliente prioritario"
  - [ ] Comentarios opcionales (por qué viene)
  - [ ] Confirmación visual del envío
  - [ ] Manejo de errores con mensajes claros
  - [ ] Reset de formulario después de éxito
  - [ ] Autollenado con últimos clientes frecuentes (si existe)
  - [ ] Botón "Cancelar"
  - [ ] Indicador de carga
- **Archivo:** `mobile/src/screens/AddClientScreen.tsx` (actualizar)
- **Validaciones:**
  - Nombre: 3-100 caracteres
  - Teléfono: formato válido (10-15 dígitos)
  - Sin duplicados el mismo día
  - Máximo no excedido para el día
- **Acciones:**
  - Submit → addToQueue()
  - Validar formulario antes de enviar
- **Prioridad:** 🟡 MEDIA

### 15. SettingsScreen Mejorada
- **Estado:** ⏳ TODO
- **Descripción:** Implementar pantalla de configuración
- **Subtareas:**
  - [ ] Información del negocio (nombre, teléfono)
  - [ ] Tiempo promedio de atención (input numérico)
  - [ ] Máximo de cupos por día
  - [ ] Horario de atención (inicio y fin)
  - [ ] Contactos excluidos (agregar/remover)
  - [ ] Pausa/Reanuda automación
  - [ ] Historial de mensajes (link a otra pantalla)
  - [ ] Estadísticas del día
  - [ ] Botón "Guardar cambios"
  - [ ] Botón "Salir"
  - [ ] Confirmación antes de logout
- **Archivo:** `mobile/src/screens/SettingsScreen.tsx` (actualizar)
- **Datos requeridos:**
  - useSettings() - obtener y actualizar
  - useAuth() - para logout
  - useQueue() - para estadísticas
- **Prioridad:** 🟡 MEDIA

### 16. Pantalla de Detalles de Cliente (Nueva)
- **Estado:** ⏳ TODO
- **Descripción:** Modal/Pantalla para ver detalles de un cliente
- **Subtareas:**
  - [ ] Modal con información detallada
  - [ ] Nombre, teléfono, posición, estado
  - [ ] Tiempo en cola
  - [ ] Tiempo estimado para este cliente
  - [ ] Botones de acción (siguiente, completar, skip)
  - [ ] Botón para enviar WhatsApp manual
  - [ ] Cerrar modal
  - [ ] Historial de mensajes para este cliente
- **Archivo:** `mobile/src/screens/ClientDetailScreen.tsx`
- **Datos requeridos:**
  - QueueItem (completo)
  - useQueue() - para acciones
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 5: Componentes Reutilizables (POR HACER)

### 17. Componentes UI Comunes
- **Estado:** ⏳ TODO
- **Descripción:** Crear componentes presentacionales reutilizables
- **Subtareas:**
  - [ ] Botón personalizado (varios tamaños/colores)
  - [ ] Input de texto con validación visual
  - [ ] Card reutilizable
  - [ ] Badge para estado (waiting, in-progress, completed)
  - [ ] Badge para prioridad
  - [ ] Loading spinner
  - [ ] Empty state (cuando no hay datos)
  - [ ] Error message component
  - [ ] Header con título y botones
  - [ ] Bottom sheet para acciones
- **Carpeta:** `mobile/src/components/`
- **Archivos:**
  - `mobile/src/components/Button.tsx`
  - `mobile/src/components/Input.tsx`
  - `mobile/src/components/Card.tsx`
  - `mobile/src/components/Badge.tsx`
  - `mobile/src/components/LoadingSpinner.tsx`
  - `mobile/src/components/EmptyState.tsx`
  - `mobile/src/components/ErrorMessage.tsx`
  - `mobile/src/components/Header.tsx`
- **Propiedades:**
  - Styles consistentes con COLORS
  - Accesibilidad (testID para tests)
  - TypeScript tipado
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 6: Notificaciones Push (POR HACER)

### 18. Setup de Notificaciones Push
- **Estado:** ⏳ TODO
- **Descripción:** Integrar notificaciones push desde el backend
- **Subtareas:**
  - [ ] Instalar `react-native-firebase` o `expo-notifications`
  - [ ] Solicitar permisos en tiempo de ejecución
  - [ ] Obtener FCM token
  - [ ] Guardar token en backend
  - [ ] Escuchar mensajes incoming
  - [ ] Manejar notificación en primer plano
  - [ ] Manejar notificación en segundo plano
  - [ ] Navegar a pantalla correspondiente al tocar notificación
- **Paquetes:** 
  - `react-native-firebase` (Android/iOS)
  - O `expo-notifications` (si es Expo)
- **Prioridad:** 🟡 MEDIA

### 19. Notificaciones Locales
- **Estado:** ⏳ TODO
- **Descripción:** Notificaciones locales para avisos en tiempo real
- **Subtareas:**
  - [ ] Avisar cuando es el turno del usuario
  - [ ] Avisar cuando quedan 5 minutos
  - [ ] Avisar cuando quedan 1 minutos
  - [ ] Sonido personalizado
  - [ ] Vibración personalizada
  - [ ] Cancelar notificaciones cuando sea necesario
- **Paquetes:** `react-native-notifee` o `react-native-push-notification`
- **Triggers:**
  - Cuando el cliente en posición actual es atendido
  - Cuando se acerca el turno del cliente
  - Cuando hay nuevos mensajes
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 7: Almacenamiento Local (POR HACER)

### 20. AsyncStorage y Persistencia
- **Estado:** ⏳ TODO
- **Descripción:** Guardar datos localmente para offline
- **Subtareas:**
  - [ ] Instalar `@react-native-async-storage/async-storage`
  - [ ] Guardar último usuario autenticado
  - [ ] Guardar token JWT
  - [ ] Guardar configuración del negocio (cachear)
  - [ ] Cachear última cola conocida
  - [ ] Sincronizar cuando vuelve la conexión
  - [ ] Limpiar datos sensibles al logout
  - [ ] Versionamiento de cache
- **Datos a guardar:**
  - `auth:token` - Token JWT
  - `auth:user` - Datos del usuario
  - `queue:cache` - Última cola conocida
  - `settings:cache` - Configuración guardada
  - `app:lastSync` - Última sincronización
- **Uso:** En hooks de autenticación y cola para persistencia
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 8: Validaciones y Manejo de Errores (POR HACER)

### 21. Validaciones en Cliente
- **Estado:** ⏳ TODO
- **Descripción:** Validar datos antes de enviar
- **Subtareas:**
  - [ ] Email válido (regex)
  - [ ] Teléfono válido (formato según país)
  - [ ] Contraseña (mínimo, mayúsculas, números)
  - [ ] Nombres no vacíos
  - [ ] Campos requeridos
  - [ ] Mensajes de error claros
  - [ ] Desactivar botón si hay errores
  - [ ] Mostrar errores en rojo en tiempo real
- **Carpeta:** `mobile/src/utils/validators.ts`
- **Funciones:**
  ```typescript
  export const validateEmail = (email: string): string | null
  export const validatePassword = (password: string): string | null
  export const validatePhoneNumber = (phone: string): string | null
  export const validateName = (name: string): string | null
  ```
- **Prioridad:** 🟡 MEDIA

### 22. Manejo de Errores HTTP
- **Estado:** ⏳ TODO
- **Descripción:** Capturar y mostrar errores de forma amigable
- **Subtareas:**
  - [ ] Detectar si no hay conexión
  - [ ] Mostrar mensaje: "Sin conexión. Reintentando..."
  - [ ] Capturar errores 401 (no autenticado)
  - [ ] Capturar errores 403 (sin permisos)
  - [ ] Capturar errores 404 (no encontrado)
  - [ ] Capturar errores 500 (error del servidor)
  - [ ] Retry automático para errores temporales
  - [ ] Toast/Alert con mensaje de error
  - [ ] Log de errores (para debugging)
- **Archivo:** `mobile/src/api/index.ts` (mejorar)
- **Comportamiento:**
  - 401 → Redirigir a Login
  - 403 → Mostrar "Sin permisos"
  - 404 → Mostrar "No encontrado"
  - 500 → Mostrar "Error del servidor, intenta más tarde"
  - Sin conexión → Modo offline con aviso
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 9: Testing (POR HACER)

### 23. Tests Unitarios
- **Estado:** ⏳ TODO
- **Descripción:** Pruebas de funciones y componentes
- **Subtareas:**
  - [ ] Tests para hooks (useAuth, useQueue, useSettings)
  - [ ] Tests para utilidades (validators, formatters)
  - [ ] Tests para componentes (Button, Input, Card)
  - [ ] Mocks de API
  - [ ] Mocks de AsyncStorage
  - [ ] Cobertura mínima 70%
- **Carpeta:** `mobile/__tests__/`
- **Framework:** Jest (ya instalado)
- **Prioridad:** 🟡 MEDIA

### 24. Tests E2E
- **Estado:** ⏳ TODO
- **Descripción:** Pruebas de flujo completo en el emulador
- **Subtareas:**
  - [ ] Test: usuario se registra y login
  - [ ] Test: usuario ve la cola
  - [ ] Test: usuario agrega cliente
  - [ ] Test: usuario completa turno
  - [ ] Test: usuario accede a settings
  - [ ] Test: logout funciona
- **Herramientas:** Detox o Appium
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 10: Documentación (POR HACER)

### 25. Documentación del Frontend
- **Estado:** ⏳ TODO
- **Descripción:** Documentar arquitectura y guía de desarrollo
- **Subtareas:**
  - [ ] README.md mejorado
  - [ ] Guía de estructura de carpetas
  - [ ] Guía de cómo agregar pantalla nueva
  - [ ] Guía de cómo agregar hook nuevo
  - [ ] Documentación de componentes (Storybook opcional)
  - [ ] Configuración de env variables
  - [ ] Setup para desarrollo local
  - [ ] Troubleshooting comunes
- **Archivos:**
  - `mobile/README.md` (actualizar)
  - `mobile/DEVELOPMENT.md` (nuevo)
  - `mobile/ARCHITECTURE.md` (nuevo)
- **Prioridad:** 🟡 MEDIA

---

## 📊 Tabla de Dependencias

| Tarea | Dependencias | Bloqueada |
|-------|-------------|-----------|
| 4. Login Screen | 6, 8 | Sí (esperar 6,8) |
| 5. Signup Screen | 6, 8 | Sí (esperar 6,8) |
| 6. AuthContext | - | ❌ No |
| 7. Rutas Protegidas | 4, 5, 6 | Sí (esperar 4,5,6) |
| 8. Cliente API | - | ❌ No |
| 9. useAuth | 6, 8 | Sí (esperar 6,8) |
| 10. useQueue | 8 | Sí (esperar 8) |
| 11. useSettings | 8 | Sí (esperar 8) |
| 12. Home Mejorado | 9, 10, 11 | Sí (esperar 9,10,11) |
| 13. Queue Mejorado | 10 | Sí (esperar 10) |
| 14. AddClient Mejorado | 10 | Sí (esperar 10) |
| 15. Settings Mejorado | 11 | Sí (esperar 11) |
| 16. Client Detail | 10 | Sí (esperar 10) |
| 17. Componentes UI | - | ❌ No |
| 18. Push Notifications | - | ❌ No |
| 19. Local Notifications | 10 | Sí (esperar 10) |
| 20. AsyncStorage | 6, 10, 11 | Sí (esperar 6,10,11) |
| 21. Validaciones | - | ❌ No |
| 22. Manejo Errores | 8 | Sí (esperar 8) |
| 23. Unit Tests | 4,5,9,10,11,17,21 | Sí (esperar varios) |
| 24. E2E Tests | 4,5,7,12,13,14,15 | Sí (esperar varios) |
| 25. Documentación | Todas | Sí (último) |

---

## 🚀 Orden Recomendado de Ejecución

### Sprint 1 (Semana 1)
1. **Tarea 6:** AuthContext (1-2 días)
2. **Tarea 8:** Cliente API Completo (2 días)
3. **Tarea 21:** Validaciones (1 día)

### Sprint 2 (Semana 1-2)
4. **Tarea 4:** Login Screen (2 días)
5. **Tarea 5:** Signup Screen (2 días)
6. **Tarea 9:** useAuth Hook (1 día)

### Sprint 3 (Semana 2-3)
7. **Tarea 7:** Rutas Protegidas (1 día)
8. **Tarea 10:** useQueue Hook (2 días)
9. **Tarea 11:** useSettings Hook (1 día)

### Sprint 4 (Semana 3)
10. **Tarea 17:** Componentes UI (3-4 días)
11. **Tarea 22:** Manejo de Errores (1-2 días)

### Sprint 5 (Semana 4)
12. **Tarea 12:** Home Screen Mejorada (1-2 días)
13. **Tarea 13:** Queue Screen Mejorada (2 días)
14. **Tarea 14:** AddClient Screen Mejorada (1-2 días)

### Sprint 6 (Semana 4-5)
15. **Tarea 15:** Settings Screen Mejorada (2 días)
16. **Tarea 16:** Client Detail Screen (1-2 días)
17. **Tarea 20:** AsyncStorage (1-2 días)

### Sprint 7 (Semana 5-6)
18. **Tarea 18:** Push Notifications (2-3 días)
19. **Tarea 19:** Local Notifications (1-2 días)

### Sprint 8 (Semana 6)
20. **Tarea 23:** Unit Tests (3-4 días)
21. **Tarea 24:** E2E Tests (2-3 días)

### Sprint 9 (Semana 7)
22. **Tarea 25:** Documentación (2 días)

---

## ✨ MVP Ready Checklist

### Autenticación
- [ ] Login funcional con token JWT
- [ ] Register funcional
- [ ] AuthContext guardando token
- [ ] Rutas protegidas funcionando
- [ ] Logout limpia datos

### Pantallas
- [ ] Home mostrando usuario y métricas
- [ ] Queue listando clientes reales
- [ ] AddClient con validaciones
- [ ] Settings permitiendo cambiar configuración
- [ ] Todas las pantallas navigables

### API
- [ ] Cliente HTTP conectado al backend
- [ ] Endpoints de auth funcionando
- [ ] Endpoints de queue funcionando
- [ ] Manejo de errores implementado
- [ ] Tokens se envían en headers

### UX/UI
- [ ] Componentes reutilizables creados
- [ ] Validaciones en cliente funcionando
- [ ] Mensajes de error claros
- [ ] Indicadores de carga visibles
- [ ] Colores y estilos consistentes

### Funcionalidad
- [ ] Obtener cola del día
- [ ] Agregar cliente a cola
- [ ] Avanzar a siguiente cliente
- [ ] Completar atención
- [ ] Pull-to-refresh actualiza datos
- [ ] AsyncStorage cachea datos

### Testing & Docs
- [ ] Documentación actualizada
- [ ] Tests principales pasando
- [ ] Sin errores de compilación
- [ ] App funciona en Android emulador
- [ ] App funciona en iOS simulator (opcional)

---

## 📱 Pantallas Finales (MVP)

```
1. LoginScreen
   - Email/teléfono
   - Contraseña
   - Botón Ingresar
   - Link Registrarse

2. SignupScreen
   - Nombre, Email, Teléfono
   - Nombre del Negocio
   - Contraseña
   - Confirmar contraseña
   - Botón Registrarse

3. HomeScreen
   - Bienvenida con nombre
   - Métricas (clientes hoy, promedio espera, etc)
   - 4 botones: Queue, AddClient, Settings, Logout

4. QueueScreen
   - Lista de clientes en cola
   - Cliente actual (highlight)
   - Pull-to-refresh
   - Botones: Siguiente, Completar, Detalles

5. AddClientScreen
   - Nombre (validado)
   - Teléfono (validado)
   - Prioridad (checkbox)
   - Comentarios (opcional)
   - Botones: Agregar, Cancelar

6. SettingsScreen
   - Información del negocio
   - Tiempo promedio
   - Máximo de cupos
   - Horario de atención
   - Contactos excluidos
   - Botones: Guardar, Logout

7. ClientDetailScreen
   - Información completa del cliente
   - Posición y tiempo estimado
   - Botones de acción
   - Historial de mensajes
```

---

## 🔌 Tecnologías Frontend

| Componente | Versión | Propósito |
|-----------|---------|-----------|
| **React Native** | 0.83.1 | Framework móvil |
| **TypeScript** | 5.7.2 | Lenguaje tipado |
| **React Navigation** | 7.x | Navegación |
| **AsyncStorage** | 1.x | Persistencia local |
| **Fetch/Axios** | - | Cliente HTTP |
| **Jest** | 29.x | Testing |
| **Detox** | - | E2E Testing (opcional) |
| **Firebase** | - | Push Notifications (opcional) |

---

## 📝 Notas Importantes

1. **No empezar Fase 4 sin terminar Fase 2** - La autenticación es crítica
2. **Backend debe estar corriendo** - Para testear conexiones
3. **Testing incremental** - Escribir tests conforme se avanza
4. **Commits frecuentes** - Usar git para versionar cambios
5. **Emulador actualizado** - Android 11+ recomendado
6. **Metro limpio** - Limpiar caché si hay errores: `npm start -- --reset-cache`

---

## ✅ Pre-requisitos para Comenzar

- [x] Node.js 18+
- [x] React Native CLI instalada
- [x] Android SDK configurado (para Android)
- [x] Xcode instalado (para iOS, opcional)
- [x] Backend corriendo en `localhost:3000`
- [x] Metro Bundler iniciado
- [ ] Emulador Android abierto (para testing)

---

## 📞 Referencias Útiles

- **React Native Docs:** https://reactnative.dev/
- **React Navigation:** https://reactnavigation.org/
- **TypeScript:** https://www.typescriptlang.org/
- **Fetch API:** https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Jest Testing:** https://jestjs.io/

---

**Generado:** 29 de Enero de 2026  
**Estado:** 🔄 En Planificación  
**Próximo paso:** Comenzar Tarea 6 (AuthContext)

