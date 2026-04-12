# Backend Tasks - TurnoYa MVP (Actualizado)

Objetivo: mantener un backlog real del estado actual del backend para cerrar el MVP multi-negocio (WhatsApp-first).

Ultima actualizacion: 12-04-2026

---

## Resumen Ejecutivo

Total de tareas activas: 16
- Completadas: 7
- En progreso: 2
- Pendientes: 7

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
- FK whatsapp_contacts.platformUserId -> users.id
- FK queue.platformUserId -> users.id
- FK queue.contactId -> whatsapp_contacts.id

Archivos clave:
- backend/src/modules/users/user.entity.ts
- backend/src/modules/queue/queue.entity.ts
- backend/src/modules/whatsapp-contacts/whatsapp-contact.entity.ts

### 7. Base de testing inicial (DONE)
- Tests unitarios existentes para users, queue y notifications.

Archivos clave:
- backend/src/modules/users/user.service.spec.ts
- backend/src/modules/users/user.controller.spec.ts
- backend/src/modules/queue/queue.service.spec.ts
- backend/src/modules/queue/queue.controller.spec.ts
- backend/src/modules/notifications/notif.service.spec.ts

---

## 2) Tareas En Progreso

### 8. Cola persistente en BD real (IN PROGRESS)
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

### 9. Aislamiento por negocio en operaciones de cola (IN PROGRESS)
Estado actual:
- Hay roles, pero no ownership estricto en cola.

Falta:
- Filtrar queries por platformUserId del JWT.
- Impedir que un negocio vea/modifique cola de otro.

---

## 3) Pendientes Prioritarios (MVP)

### 10. Endpoints de queue orientados a operacion real (TODO - ALTA)
- GET /queue (del negocio autenticado y fecha actual)
- GET /queue/:date
- POST /queue
- PUT /queue/:id
- DELETE /queue/:id
- POST /queue/next
- POST /queue/complete/:id
- POST /queue/skip/:id
- POST /queue/pause
- POST /queue/resume

Nota:
- Algunos endpoints existen, pero hoy no tienen logica productiva real.

### 11. Reglas de negocio de cola (TODO - ALTA)
- Recalcular posicion y tiempo estimado real.
- Evitar duplicados por telefono en el mismo dia/negocio.
- Soportar prioridad correctamente.
- Estado de cola pausada/reanudada.
- maxDaysAhead aplicado en creacion de turnos.

### 12. Integracion real de WhatsApp Cloud API (TODO - ALTA)
- Cliente HTTP real a Meta.
- Variables de entorno reales.
- Manejo de errores y reintentos.

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
- Endpoints para agregar/remover excludedContacts.
- Aplicar exclusion antes de enviar mensajes automáticos.

### 15. Historial de mensajes (TODO - MEDIA)
- Entidad MessageLog.
- Guardar incoming/outgoing y estado del envio.

### 16. Calidad y docs de salida MVP (TODO - MEDIA)
- Completar tests faltantes:
  - AuthService/AuthController
  - QueueService con TypeORM real
  - E2E de auth + queue + permisos
- Swagger/OpenAPI para consumo de API.

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

1. Migrar QueueService a TypeORM real y eliminar mockQueue.
2. Forzar uso de platformUserId desde JWT en todos los endpoints queue.
3. Implementar next/complete/skip con recalculo de posiciones.
4. Agregar tests unitarios de QueueService con repository mock.
5. Validar flujo completo en Docker + Postman.

Definition of done del sprint:
- Crear/consultar/avanzar/completar turnos persiste en PostgreSQL.
- Ningun endpoint de queue usa datos hardcodeados.
- Un negocio no puede operar cola de otro.

---

## 6) Riesgos Actuales

1. Riesgo funcional: queue sigue en mock y da falsa sensacion de avance.
2. Riesgo de seguridad de datos: ownership de cola aun no esta cerrado.
3. Riesgo de salida MVP: sin webhook real no hay loop WhatsApp end-to-end.

---

## 7) Checklist de Control Rapido

- Auth JWT funcionando: SI
- Roles y permisos base: SI
- Relaciones DB multi-negocio: SI
- Queue persistente real: NO
- Webhook WhatsApp real: NO
- Mensajeria automatica real: NO
- E2E criticos MVP: NO
- Swagger API: NO
