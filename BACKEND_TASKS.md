# Backend Tasks - TurnoYa MVP (Actualizado)

Objetivo: mantener un backlog real del estado actual del backend para cerrar el MVP multi-negocio (WhatsApp-first).

Ultima actualizacion: 12-04-2026 (segunda revision)

---

## Resumen Ejecutivo

Total de tareas activas: 16
- Completadas: 8
- En progreso: 2
- Pendientes: 6

Estado general:
- Auth y roles base: listos
- Modelo multi-negocio (relaciones DB): listo
- Cola operativa en produccion: pendiente (sigue en mock)
- WhatsApp Cloud API real: pendiente

---

## 1) Tareas Completadas

### 1. Infraestructura base (DONE)
- Estructura modular NestJS disponible.
- Docker compose funcional con backend, postgres y pgadmin.
- Build de backend y levantamiento en contenedor validados.

Archivos clave:
- backend/src/app.module.ts
- docker-compose.yml
- backend/Dockerfile
- backend/.dockerignore

### 2. Autenticacion JWT + credenciales (DONE)
- Register y login implementados.
- JWT strategy y guard funcionando.
- Endpoint GET /api/v1/auth/me funcionando con token.
- Hash de password con bcrypt.

Archivos clave:
- backend/src/modules/auth/auth.module.ts
- backend/src/modules/auth/auth.service.ts
- backend/src/modules/auth/auth.controller.ts
- backend/src/modules/auth/jwt.strategy.ts
- backend/src/common/guards/jwt-auth.guard.ts

### 3. Roles y autorizacion base (DONE)
- Roles definidos: platform_admin, business_owner, business_staff.
- Roles guard + decorador @Roles activos.
- Endpoints de users protegidos por rol.

Archivos clave:
- backend/src/modules/users/user-role.enum.ts
- backend/src/common/decorators/roles.decorator.ts
- backend/src/common/guards/roles.guard.ts
- backend/src/modules/users/user.controller.ts

### 4. Persistencia real de users en PostgreSQL (DONE)
- UserService usa TypeORM repository (no mock).
- CRUD basico de users persistido.

Archivo clave:
- backend/src/modules/users/user.service.ts

### 5. Separacion de modelo plataforma vs contactos WhatsApp (DONE)
- Entidad whatsapp_contacts creada.
- Estructura base para contactos por negocio.

Archivo clave:
- backend/src/modules/whatsapp-contacts/whatsapp-contact.entity.ts

### 6. Relaciones y foreign keys multi-negocio (DONE)
- FK queue.businessId -> users.id (NOT NULL, con indice)
- FK queue.contactId -> whatsapp_contacts.id (nullable)
- FK whatsapp_contacts.businessId -> users.id
- Indice compuesto: (businessId, queueDate, status) para queries de cola del dia.
- Columna platformUserId renombrada a businessId en queue y whatsapp_contacts.

Archivos clave:
- backend/src/modules/users/user.entity.ts
- backend/src/modules/queue/queue.entity.ts
- backend/src/modules/whatsapp-contacts/whatsapp-contact.entity.ts

### 7. Hardening del schema y contratos de tipos (DONE)
- estimatedTime renombrado a estimatedTimeMinutes en entity, DTO, service, specs y whatsapp.service.
- UserSettings documentada con JSDoc (unidades, semantica por campo) como unica fuente de verdad en user.entity.
- user.types.ts re-exporta UserSettings desde entity; eliminada definicion duplicada.
- User.settings tipado como UserSettings | null (ya no acepta Record<string, any>).
- Estrategia de position documentada en entity: el servicio recalcula en bloque, sin unique en BD.
- Decision de historico documentada en queueDate: la tabla acumula, no se purga automaticamente.
- 51 tests pasando tras el rename.

Archivos clave:
- backend/src/modules/queue/queue.entity.ts
- backend/src/modules/queue/queue.dto.ts
- backend/src/modules/queue/queue.service.ts
- backend/src/modules/users/user.entity.ts
- backend/src/modules/users/user.types.ts
- backend/src/services/whatsapp.service.ts

### 8. Base de testing inicial (DONE)
- Tests unitarios existentes para users, queue y notifications.

Archivos clave:
- backend/src/modules/users/user.service.spec.ts
- backend/src/modules/users/user.controller.spec.ts
- backend/src/modules/queue/queue.service.spec.ts
- backend/src/modules/queue/queue.controller.spec.ts
- backend/src/modules/notifications/notif.service.spec.ts

---

## 2) Tareas En Progreso

### 9. Cola persistente en BD real (IN PROGRESS)
Estado actual:
- queue.entity ya existe y esta relacionada.
- queue.service sigue en memoria con mockQueue.

Falta:
- Reemplazar mockQueue por repository TypeORM.
- Guardar y consultar por negocio (platformUserId).
- Dejar de depender de datos hardcodeados.

Archivos a trabajar:
- backend/src/modules/queue/queue.service.ts
- backend/src/modules/queue/queue.controller.ts

### 10. Aislamiento por negocio en operaciones de cola (IN PROGRESS)
Estado actual:
- Hay roles, pero no ownership estricto en cola.

Falta:
- Filtrar queries por businessId del JWT.
- Impedir que un negocio vea/modifique cola de otro.

---

## 3) Pendientes Prioritarios (MVP)

### 11. Endpoints de queue orientados a operacion real + reglas de negocio (TODO - ALTA)
Endpoints:
- GET /queue — cola del dia del negocio autenticado.
- GET /queue/:date — cola por fecha.
- POST /queue — agregar turno (asigna businessId desde JWT).
- PUT /queue/:id
- DELETE /queue/:id
- POST /queue/next — avanza turno, recalcula posiciones.
- POST /queue/complete/:id
- POST /queue/skip/:id
- POST /queue/pause / POST /queue/resume

Reglas de negocio a implementar:
- Recalcular position y estimatedTimeMinutes al agregar/avanzar/cancelar.
- Evitar duplicados: mismo phoneNumber en el mismo dia+negocio.
- Prioridad: insertar delante de los waiting no prioritarios.
- maxDaysAhead aplicado al crear turno.
- Bloquear creacion si la cola esta en pausa.

Nota:
- Algunos endpoints existen en el controller pero usan mock; hay que reemplazar la logica completa.

### 12. Integracion real de WhatsApp Cloud API (TODO - ALTA)
- Cliente HTTP real a Meta (axios o fetch nativo).
- Variables de entorno reales (WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID).
- Manejo de errores y reintentos basicos.
- Validar que contacto no esta en excludedContacts antes de enviar.

Archivo principal:
- backend/src/services/whatsapp.service.ts

### 13. Webhook de WhatsApp (TODO - ALTA)
- GET verificacion webhook.
- POST recepcion de mensajes.
- Validacion de firma.
- Dispatcher de comandos minimos.

Archivos sugeridos:
- backend/src/modules/webhooks/webhooks.controller.ts
- backend/src/modules/webhooks/webhooks.service.ts

### 14. Contactos excluidos y automatizaciones (TODO - MEDIA)
- Endpoints para agregar/remover excludedContacts en settings del negocio.
- Aplicar exclusion en whatsapp.service antes de enviar mensaje.

### 15. Historial de mensajes (TODO - MEDIA)
- Entidad MessageLog con FK a users.id y a whatsapp_contacts.id.
- Guardar incoming/outgoing, timestamp y estado (sent, delivered, read, failed).

### 16. Calidad y docs de salida MVP (TODO - MEDIA)
- Tests pendientes:
  - AuthService/AuthController (ninguno existe aun).
  - QueueService con repository mock (los spec actuales prueban el mock en memoria, no TypeORM).
  - E2E basico: register -> login -> crear turno -> next -> complete.
- Swagger/OpenAPI en todos los controllers.

---

## 4) Tareas Antiguas Eliminadas o Ajustadas

Estas tareas ya no deben figurar como TODO:
- "Crear auth.module/auth.service/auth.controller" -> ya existe.
- "Instalar @nestjs/jwt, @nestjs/passport, bcrypt" -> ya instalado.
- "Crear guard JWT" -> ya existe y esta activo.
- "Crear entidades base" -> ya existen y ya tienen relaciones.

Estas tareas se ajustaron por nuevo requerimiento multi-negocio:
- "Cola simple por app" -> ahora debe ser cola por negocio (platformUserId).
- "Contactos como usuarios" -> ahora separados (users vs whatsapp_contacts).

---

## 5) Siguiente Sprint Recomendado

Sprint objetivo: cerrar la Etapa A del MVP (cola real en BD por negocio)

1. Migrar QueueService a TypeORM real (inyectar QueueRepository, eliminar mockQueue).
2. Asignar businessId desde el JWT en create/get/next/complete/skip.
3. Implementar recalculo de position y estimatedTimeMinutes al agregar/avanzar/cancelar.
4. Agregar specs de QueueService con getRepositoryToken(QueueEntity) mockeado.
5. Rebuilded + validacion completa en Docker + Postman.

Definition of done del sprint:
- Crear/consultar/avanzar/completar turnos persiste en PostgreSQL por negocio.
- Ningun endpoint de queue usa datos hardcodeados.
- Un negocio no puede leer ni modificar la cola de otro.
- Tests nuevos de QueueService pasan.

---

## 6) Riesgos Actuales

1. Riesgo funcional: queue sigue en mock y da falsa sensacion de avance.
2. Riesgo de seguridad de datos: ownership de cola aun no esta cerrado.
3. Riesgo de salida MVP: sin webhook real no hay loop WhatsApp end-to-end.

---

## 7) Checklist de Control Rapido

- Auth JWT funcionando: SI
- Roles y permisos base: SI
- Relaciones DB multi-negocio (FKs reales con businessId): SI
- Schema hardening (tipos, unidades, contratos): SI
- Tests base (51 pasando): SI
- Queue persistente real por negocio: NO
- Webhook WhatsApp real: NO
- Mensajeria automatica real: NO
- E2E criticos MVP: NO
- Swagger API: NO
