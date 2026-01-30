# 📋 Backend Tasks - TurnoYa MVP

**Objetivo:** Completar todas las funcionalidades necesarias para tener un **Producto Mínimo Viable (MVP)** funcional.

**Fecha de inicio:** 29 de Enero de 2026

---

## 🎯 Resumen de Tareas

Total de tareas: **18**
- ✅ Completadas: **4**
- 🔄 En progreso: **0**
- ⏳ Por hacer: **14**

---

## ✅ FASE 1: Infraestructura Base (COMPLETADO)

### ✅ 1. Estructura de carpetas y módulos
- **Estado:** ✅ DONE
- **Descripción:** Crear estructura modular de carpetas (modules/, services/, common/)
- **Archivos:** `backend/src/modules/`, `backend/src/services/`, `backend/src/common/`
- **Completado por:** Sesión inicial

### ✅ 2. Tipado TypeScript y DTOs
- **Estado:** ✅ DONE
- **Descripción:** Implementar tipado fuerte, enums, decoradores de validación
- **Archivos:** 
  - `backend/src/modules/queue/queue.dto.ts`
  - `backend/src/modules/users/user.dto.ts`
  - `backend/src/modules/notifications/notif.dto.ts`
- **Validaciones:** class-validator, decoradores (@IsString, @IsEnum, etc.)
- **Completado por:** 18-01-2026

### ✅ 3. Entidades TypeORM
- **Estado:** ✅ DONE
- **Descripción:** Crear entidades con columnas, tipos, relaciones
- **Archivos:**
  - `backend/src/modules/queue/queue.entity.ts`
  - `backend/src/modules/users/user.entity.ts`
- **Base de datos:** PostgreSQL 15
- **Completado por:** 18-01-2026

### ✅ 4. Docker Setup (3 servicios)
- **Estado:** ✅ DONE
- **Descripción:** Configurar Docker con hot-reload, PostgreSQL, pgAdmin
- **Archivos:**
  - `docker-compose.dev.yml` (desarrollo)
  - `Dockerfile.dev` (backend con hot-reload)
  - `Dockerfile` (producción)
  - `.env` (variables de entorno)
- **Servicios:** backend, postgres, pgadmin
- **Completado por:** 18-01-2026

---

## 🔄 FASE 2: Autenticación y Autorización (POR HACER)

### 5. Autenticación JWT
- **Estado:** ⏳ TODO
- **Descripción:** Implementar login y generación de tokens JWT
- **Subtareas:**
  - [ ] Instalar `@nestjs/jwt` y `@nestjs/passport`
  - [ ] Crear `auth.module.ts` con estrategia JWT
  - [ ] Implementar endpoint POST `/api/v1/auth/login`
  - [ ] Endpoint POST `/api/v1/auth/register` para nuevos usuarios
  - [ ] Validar contraseñas con `bcrypt`
  - [ ] Crear guard `@UseGuards(JwtAuthGuard)` para rutas protegidas
- **Archivos a crear:**
  - `backend/src/modules/auth/auth.module.ts`
  - `backend/src/modules/auth/auth.service.ts`
  - `backend/src/modules/auth/auth.controller.ts`
  - `backend/src/modules/auth/jwt.strategy.ts`
  - `backend/src/common/guards/jwt-auth.guard.ts`
- **Dependencias:** `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`
- **Prioridad:** 🔴 ALTA

### 6. Guards y Decoradores de Autorización
- **Estado:** ⏳ TODO
- **Descripción:** Crear guards para validar roles y permisos
- **Subtareas:**
  - [ ] Guard `@UseGuards(JwtAuthGuard)`
  - [ ] Decorador `@IsOwner()` para verificar propiedad de recursos
  - [ ] Validar que solo el dueño de la cola puede acceder
- **Archivos a crear:**
  - `backend/src/common/guards/jwt-auth.guard.ts`
  - `backend/src/common/decorators/is-owner.decorator.ts`
- **Prioridad:** 🔴 ALTA

---

## 🔄 FASE 3: Lógica de Negocio - Queue (POR HACER)

### 7. Servicio de Cola Completo
- **Estado:** ⏳ TODO (parcial)
- **Descripción:** Implementar toda la lógica de gestión de cola
- **Subtareas:**
  - [ ] Método `getQueue()` - obtener cola del día actual
  - [ ] Método `getQueueByDate(date)` - obtener cola por fecha
  - [ ] Método `addToQueue(createQueueDto)` - agregar cliente
  - [ ] Método `nextInQueue()` - siguiente en la cola
  - [ ] Método `completeQueue(id)` - marcar como completado
  - [ ] Método `skipQueue(id)` - cliente no asistió
  - [ ] Método `updatePosition()` - recalcular posiciones
  - [ ] Método `getEstimatedTime()` - calcular tiempo estimado
  - [ ] Método `pauseQueue()` / `resumeQueue()` - pausar automación
- **Archivo:** `backend/src/modules/queue/queue.service.ts`
- **Lógica:**
  - Solo una cola activa por día
  - Tiempo estimado = suma de tiempos promedio hasta el turno actual
  - Posición actualiza en tiempo real
  - Prioridad: algunos clientes primero
- **Prioridad:** 🔴 ALTA

### 8. Controller de Cola - Endpoints REST
- **Estado:** ⏳ TODO
- **Descripción:** Crear endpoints HTTP para gestionar la cola
- **Subtareas:**
  - [ ] GET `/api/v1/queue` - obtener cola actual
  - [ ] GET `/api/v1/queue/:date` - obtener cola por fecha
  - [ ] POST `/api/v1/queue` - agregar cliente
  - [ ] PUT `/api/v1/queue/:id` - actualizar datos del cliente
  - [ ] DELETE `/api/v1/queue/:id` - eliminar de la cola
  - [ ] POST `/api/v1/queue/:id/complete` - marcar como completado
  - [ ] POST `/api/v1/queue/:id/skip` - marcar como no asistió
  - [ ] POST `/api/v1/queue/next` - avanzar a siguiente
  - [ ] POST `/api/v1/queue/pause` - pausar automación
  - [ ] POST `/api/v1/queue/resume` - reanudar automación
- **Archivo:** `backend/src/modules/queue/queue.controller.ts`
- **Validaciones:** 
  - @UseGuards(JwtAuthGuard)
  - DTO validation
  - Validar que solo el dueño puede modificar
- **Prioridad:** 🔴 ALTA

### 9. Manejo de Contactos Excluidos
- **Estado:** ⏳ TODO
- **Descripción:** Implementar lista de contactos que no reciben automatización
- **Subtareas:**
  - [ ] Campo `excludedPhones: string[]` en UserSettings
  - [ ] Validar antes de enviar mensajes automáticos
  - [ ] Endpoint para agregar/remover de lista excluida
- **Archivo:** `backend/src/modules/users/user.service.ts`
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 4: WhatsApp Business API (POR HACER)

### 10. Configuración de WhatsApp Business API
- **Estado:** ⏳ TODO
- **Descripción:** Integrar WhatsApp Business Cloud API
- **Subtareas:**
  - [ ] Registrar en Meta Developer Portal
  - [ ] Obtener Phone Number ID, Business Account ID, Access Token
  - [ ] Configurar variables en `.env`
  - [ ] Crear cliente HTTP para WhatsApp API
- **Variables de entorno a actualizar:**
  ```
  WHATSAPP_PHONE_NUMBER_ID=
  WHATSAPP_BUSINESS_ACCOUNT_ID=
  WHATSAPP_ACCESS_TOKEN=
  WHATSAPP_WEBHOOK_VERIFY_TOKEN=
  ```
- **Archivo:** `backend/src/services/whatsapp.service.ts`
- **Prioridad:** 🔴 ALTA

### 11. Webhook para recibir mensajes de WhatsApp
- **Estado:** ⏳ TODO
- **Descripción:** Crear endpoint que reciba mensajes incoming
- **Subtareas:**
  - [ ] Endpoint POST `/api/v1/webhooks/whatsapp` para recibir mensajes
  - [ ] Endpoint GET `/api/v1/webhooks/whatsapp` para verificación
  - [ ] Verificar firma de WhatsApp (HMAC-SHA256)
  - [ ] Parsear mensaje incoming
  - [ ] Procesar comandos (siguiente, terminé, agregar cliente, etc.)
  - [ ] Guardar historial de mensajes
  - [ ] Responder automáticamente según contexto
- **Archivos a crear:**
  - `backend/src/modules/webhooks/webhooks.controller.ts`
  - `backend/src/modules/webhooks/webhooks.service.ts`
- **Comandos soportados:**
  - "siguiente" → avanzar a siguiente en la cola
  - "terminé" → marcar como completado
  - "agregar [nombre]" → agregar nuevo cliente
  - "pausa" → pausar automación
  - "reanuda" → reanudar automación
- **Prioridad:** 🔴 ALTA

### 12. Envío automático de mensajes
- **Estado:** ⏳ TODO
- **Descripción:** Enviar mensajes automáticos a clientes
- **Subtareas:**
  - [ ] Método para enviar confirmación de turno
  - [ ] Método para enviar posición en cola
  - [ ] Método para enviar tiempo estimado
  - [ ] Método para avisar "tu turno es próximo"
  - [ ] Método para avisar "es tu turno, por favor acércate"
  - [ ] Validar que contacto no está en lista excluida
  - [ ] Rate limiting (no más de X mensajes por minuto)
  - [ ] Log de todos los mensajes enviados
- **Archivo:** `backend/src/services/whatsapp.service.ts`
- **Plantillas de mensaje:**
  ```
  Confirmación: "Hola {nombre}, tu turno fue agregado. Posición: {posición}"
  Próximo: "Hola {nombre}, tu turno es próximo. Tiempo: ~{minutos} minutos"
  Tu turno: "Hola {nombre}, ¡es tu turno! Por favor acércate"
  ```
- **Prioridad:** 🔴 ALTA

### 13. Almacenamiento de historial de mensajes
- **Estado:** ⏳ TODO
- **Descripción:** Guardar todos los mensajes en la BD
- **Subtareas:**
  - [ ] Crear entidad `MessageLog`
  - [ ] Guardar mensaje incoming
  - [ ] Guardar mensaje outgoing
  - [ ] Timestamp de envío/recepción
  - [ ] Estado del mensaje (sent, delivered, read, failed)
  - [ ] Endpoint para obtener historial por cliente
- **Archivos a crear:**
  - `backend/src/modules/messages/message.entity.ts`
  - `backend/src/modules/messages/message.service.ts`
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 5: Validaciones y Manejo de Errores (POR HACER)

### 14. Filtros de Excepción Globales
- **Estado:** ⏳ TODO
- **Descripción:** Mejorar manejo de errores HTTP
- **Subtareas:**
  - [ ] Crear `http-exception.filter.ts` (ya existe)
  - [ ] Capturar ValidationException
  - [ ] Capturar NotFoundException
  - [ ] Capturar ConflictException
  - [ ] Responder con formato estándar
  - [ ] Loguear errores 5xx
- **Archivo:** `backend/src/common/filters/http-exception.filter.ts`
- **Formato de respuesta:**
  ```json
  {
    "statusCode": 400,
    "message": "Validation failed",
    "errors": [...]
  }
  ```
- **Prioridad:** 🟡 MEDIA

### 15. Validaciones de Negocio
- **Estado:** ⏳ TODO
- **Descripción:** Agregar reglas de negocio en los servicios
- **Subtareas:**
  - [ ] No duplicar número de teléfono el mismo día
  - [ ] Validar formato de teléfono
  - [ ] Validar nombre no vacío
  - [ ] Máximo de cupos por día configurable
  - [ ] No permitir agregar si pausa está activa
  - [ ] Validar que solo dueño modifica su cola
- **Archivos:** `backend/src/modules/queue/queue.service.ts`
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 6: Testing (POR HACER)

### 16. Tests Unitarios
- **Estado:** ⏳ TODO
- **Descripción:** Cobertura de tests para servicios principales
- **Subtareas:**
  - [ ] Tests para `QueueService` (agregar, siguiente, completer)
  - [ ] Tests para `AuthService` (login, register)
  - [ ] Tests para `WhatsAppService` (enviar mensaje)
  - [ ] Tests para DTOs y validaciones
  - [ ] Mocks de dependencias
- **Carpeta:** `backend/tests/`
- **Framework:** Jest (ya configurado)
- **Cobertura mínima:** 80%
- **Prioridad:** 🟡 MEDIA

### 17. Tests E2E (End-to-End)
- **Estado:** ⏳ TODO
- **Descripción:** Pruebas de flujo completo
- **Subtareas:**
  - [ ] Test: usuario se registra
  - [ ] Test: usuario inicia sesión
  - [ ] Test: agregar cliente a la cola
  - [ ] Test: obtener próximo en cola
  - [ ] Test: completar turno
  - [ ] Test: pausar/reanudar automación
  - [ ] Test: webhook de WhatsApp (mensaje incoming)
- **Carpeta:** `backend/tests/e2e/`
- **Prioridad:** 🟡 MEDIA

---

## 🔄 FASE 7: Documentación (POR HACER)

### 18. Documentación de API (Swagger)
- **Estado:** ⏳ TODO
- **Descripción:** Generar documentación automática de endpoints
- **Subtareas:**
  - [ ] Instalar `@nestjs/swagger`
  - [ ] Decoradores @ApiOperation, @ApiResponse en controllers
  - [ ] Documentar parámetros, body, respuestas
  - [ ] Documentar códigos de error (400, 401, 404, 500)
  - [ ] URL disponible en `http://localhost:3000/api/docs`
  - [ ] Incluir ejemplos de request/response
- **Archivos a actualizar:** Todos los controllers
- **Dependencia:** `@nestjs/swagger`, `swagger-ui-express`
- **Prioridad:** 🟡 MEDIA

---

## 📊 Tabla de Dependencias

| Tarea | Dependencias | Bloqueada |
|-------|-------------|-----------|
| 5. JWT Auth | 1,2,3,4 | ❌ No |
| 6. Guards | 5 | Sí (esperar 5) |
| 7. Queue Service | 5,6 | Sí (esperar 5,6) |
| 8. Queue Controller | 7 | Sí (esperar 7) |
| 10. WhatsApp Config | 5 | Sí (esperar 5) |
| 11. Webhook | 10,7 | Sí (esperar 10,7) |
| 12. Auto Messages | 11 | Sí (esperar 11) |
| 14. Exception Filters | 7,8 | Sí (esperar 7,8) |
| 15. Business Validation | 7,8 | Sí (esperar 7,8) |
| 16. Unit Tests | 5,7,12 | Sí (esperar 5,7,12) |
| 17. E2E Tests | 8,11,14 | Sí (esperar 8,11,14) |
| 18. Swagger Docs | 8 | Sí (esperar 8) |

---

## 🚀 Orden Recomendado de Ejecución

### Sprint 1 (Semana 1)
1. ✅ **Tarea 5:** Autenticación JWT (2-3 días)
2. ✅ **Tarea 6:** Guards y Decoradores (1 día)

### Sprint 2 (Semana 1-2)
3. ✅ **Tarea 7:** Servicio de Cola Completo (3-4 días)
4. ✅ **Tarea 8:** Controller de Cola (1-2 días)
5. ✅ **Tarea 9:** Contactos Excluidos (1 día)

### Sprint 3 (Semana 2-3)
6. ✅ **Tarea 10:** Configuración WhatsApp (1 día)
7. ✅ **Tarea 11:** Webhook de WhatsApp (3-4 días)
8. ✅ **Tarea 12:** Envío automático de mensajes (2-3 días)

### Sprint 4 (Semana 3-4)
9. ✅ **Tarea 14:** Filtros de Excepción (1 día)
10. ✅ **Tarea 15:** Validaciones de Negocio (2 días)
11. ✅ **Tarea 13:** Historial de Mensajes (2 días)

### Sprint 5 (Semana 4)
12. ✅ **Tarea 16:** Tests Unitarios (3-4 días)
13. ✅ **Tarea 17:** Tests E2E (2-3 días)
14. ✅ **Tarea 18:** Swagger Documentation (1-2 días)

---

## ✨ MVP Ready Checklist

- [ ] **Autenticación funcional** (Tarea 5, 6)
- [ ] **Gestión de cola completa** (Tarea 7, 8)
- [ ] **Recepción de mensajes WhatsApp** (Tarea 11)
- [ ] **Envío automático de respuestas** (Tarea 12)
- [ ] **Manejo de errores mejorado** (Tarea 14, 15)
- [ ] **Tests principales cobriendo flujo** (Tarea 16, 17)
- [ ] **API documentada** (Tarea 18)
- [ ] **Todos los endpoints testados manualmente**
- [ ] **Variables de entorno configuradas (sin hardcodes)**
- [ ] **Docker funcionando sin errores**
- [ ] **Base de datos persistiendo datos**
- [ ] **Logs visibles en docker logs**

---

## 📝 Notas Importantes

1. **No empezar Fase 2 sin terminar Fase 1** ✅ (ya hecha)
2. **WhatsApp API requiere tokens reales** - Obtener de Meta Developer Portal
3. **Testing debe ser progresivo** - Escribir tests conforme se completan funciones
4. **Documentación en código** - Comentarios en funciones complejas
5. **Git commits frecuentes** - Hacer commit por tarea completada
6. **Logs importantes** - Usar `console.log` o `Logger` de NestJS

---

## 📞 Contactos Importantes

- **Meta Developer:** https://developers.facebook.com/
- **WhatsApp Business API Docs:** https://developers.facebook.com/docs/whatsapp/
- **NestJS Docs:** https://docs.nestjs.com/
- **TypeORM Docs:** https://typeorm.io/

---

**Generado:** 29 de Enero de 2026  
**Estado:** 🔄 En Planificación  
**Próximo paso:** Comenzar Tarea 5 (Autenticación JWT)

