# TurnoYa MVP Multi-Negocio (WhatsApp First)

## 1) Objetivo de este documento
Definir un marco claro para construir el MVP sin desviar alcance, ampliando TurnoYa de un solo rubro a multiples tipos de negocio, manteniendo WhatsApp como canal principal.

Tambien define una propuesta de planes comerciales para futuro, sin implementarlos ahora.

---

## 2) Vision del producto (version MVP)
TurnoYa sera un motor de gestion de turnos y cupos por WhatsApp para pequenos negocios de servicios, no limitado a peluqueria.

Ejemplos de rubros objetivo en MVP:
- Barberia y peluqueria
- Tecnicos y talleres
- Consultorios y servicios de agenda basica
- Servicios de atencion por orden de llegada o con cupos diarios

Principio clave:
- Generalizar lo necesario sin sobre-ingenieria.

---

## 3) Estado actual del backend (base real)
Segun el backend actual, hoy existe:

### 3.1 Lo que ya esta avanzado
- API NestJS modular
- Autenticacion JWT (registro y login)
- Usuarios/negocios persistidos en PostgreSQL con TypeORM
- Endpoints de users con lectura/actualizacion de configuracion
- Infraestructura Docker y base de datos funcional
- Estructura para integracion WhatsApp y notificaciones
- Tests backend en funcionamiento

### 3.2 Lo que hoy sigue en modo demo o parcial
- QueueService aun usa datos mock en memoria
- Logica de cola no esta persistida totalmente en BD
- WhatsAppService aun no integra Cloud API real (solo stubs)
- Automatizaciones por eventos (recordatorios, flujo conversacional) sin cerrar end-to-end

---

## 4) Alcance MVP recomendado (que SI entra)
Para evitar dispersarnos, el MVP debe cerrar estas capacidades:

### 4.1 Multi-negocio basico
- Cada usuario representa un negocio
- Configuracion por negocio (tiempo promedio, automatizacion, contactos excluidos)
- Aislamiento de datos por negocio

### 4.2 Turnos/cupos operativos
- Crear turno
- Consultar cola/agenda activa
- Avanzar siguiente turno
- Completar turno
- Cancelar/eliminar turno
- Recalcular posicion y tiempo estimado de espera

### 4.3 Flujo WhatsApp minimo viable
- Recibir mensaje entrante por webhook
- Enviar confirmacion de alta de turno
- Enviar aviso de turno proximo
- Enviar aviso de turno listo

### 4.4 Seguridad y operacion
- JWT para rutas de operacion del negocio
- Validaciones de negocio minimas
- Logging y manejo de errores consistente

---

## 5) Lo que NO entra en el MVP (para proteger enfoque)
- Cobro de planes
- Pasarela de pagos
- Facturacion
- Motor complejo de pricing
- Multicanal completo (email, instagram, etc.) como canal primario
- Personalizacion avanzada por sector con reglas especiales profundas

Nota: Se puede dejar preparado el modelo para evolucion futura, pero sin implementar flujo comercial en esta fase.

---

## 6) Modelo funcional para multiples rubros (sin romper lo actual)
En vez de hablar de peluqueria, usar lenguaje neutro:
- Cliente
- Turno o cupo
- Cola o agenda del dia
- Estado del turno (waiting, in-progress, completed, skipped)
- Tiempo estimado

Configuraciones por negocio recomendadas para MVP:
- averageServiceTime
- automationEnabled
- excludedContacts
- maxDaysAhead

Con esto se cubren varios rubros sin cambiar toda la arquitectura.

---

## 7) Puntos fuertes y puntos debiles (MVP)

### 7.1 Puntos fuertes
- Base tecnica ya existe y esta bien encaminada
- Auth JWT y users ya operativos
- Stack moderno y mantenible
- WhatsApp como canal de alta adopcion para pequenos negocios

### 7.2 Puntos debiles/riesgos
- Cola aun en mock: riesgo principal para salida a produccion
- Integracion WhatsApp real pendiente (webhook + envio real)
- Riesgo de intentar soportar demasiadas variantes de negocio desde dia 1
- Riesgo de mezclar objetivos tecnicos con comerciales demasiado pronto

### 7.3 Mitigaciones
- Priorizar persistencia real de queue en BD
- Cerrar solo 3-4 automatizaciones de WhatsApp esenciales
- Limitar configuracion por negocio a un set corto
- Dejar pagos fuera del MVP

---

## 8) Requisitos de salida MVP (Definition of Done)
El MVP se considera listo cuando:

1. Registro y login funcionan con JWT
2. Un negocio puede crear y operar su cola en BD real (sin mocks)
3. Se puede avanzar/completar turnos correctamente
4. Webhook de WhatsApp recibe y procesa comandos basicos
5. Mensajes automaticos clave salen correctamente
6. Datos quedan aislados por negocio
7. Logs y errores permiten soporte basico
8. Tests criticos backend pasan en CI

---

## 9) Arquitectura objetivo por etapas

### Etapa A (inmediata)
- Migrar QueueService a persistencia completa en TypeORM
- Endpoints queue listos para produccion basica

### Etapa B
- Webhook WhatsApp real + validacion de firma
- Dispatcher de comandos minimos

### Etapa C
- Automatizaciones por estado de turno
- Ajustes de confiabilidad (reintentos, idempotencia)

### Etapa D
- Pulido operacion (metricas, observabilidad, reportes basicos)

---

## 10) Planes a futuro (sin implementar ahora)
Este apartado es estrategico/comercial para referencia futura.

### 10.1 Plan Gratis (entrada)
Enfoque:
- Validacion inicial y adquisicion de usuarios

Posibles limites:
- 1 negocio
- Tope mensual de turnos
- Mensajeria automatica limitada
- Soporte basico

### 10.2 Plan Basico
Enfoque:
- Negocio pequeno con operacion diaria estable

Posibles beneficios:
- Mas turnos por mes
- Automatizaciones completas de WhatsApp
- Configuracion de negocio ampliada
- Reportes basicos

### 10.3 Plan Pro
Enfoque:
- Negocios con mayor volumen y necesidad operativa

Posibles beneficios:
- Mayor capacidad o sin limite practico
- Multi-sucursal o multi-operador (si se implementa)
- Reglas avanzadas de turnos
- Integraciones adicionales
- Soporte prioritario

### 10.4 Plan Enterprise (opcional futuro)
Enfoque:
- Cuentas con necesidades de personalizacion y SLA

Posibles beneficios:
- Seguridad y auditoria avanzada
- Integraciones dedicadas
- Soporte con acuerdos de servicio

Regla de negocio importante:
- Definir primero valor por plan.
- Cobro y billing despues de validar adopcion y retencion.

---

## 11) Decision productiva clave
Para la etapa actual:
- Construir producto util para multiples rubros sin agregar complejidad comercial prematura.

Traduccion practica:
- Primero producto que funcione bien (operacion diaria por WhatsApp + cola real).
- Despues monetizacion (planes y pagos).

---

## 12) Checklist ejecutivo para no desviarse
- Mantener enfoque MVP: operacion, no monetizacion
- Cerrar queue persistente en BD
- Cerrar webhook + mensajes esenciales
- Evitar sobrepersonalizacion por rubro
- Definir metrica de exito del MVP:
  - negocios activos por semana
  - turnos gestionados por negocio
  - tasa de mensajes entregados
  - tiempo promedio de atencion

---

## 13) Resumen corto
TurnoYa debe evolucionar de solucion para un rubro a plataforma de turnos multi-negocio por WhatsApp.

En esta fase, el exito depende de:
- robustez operativa del backend
- flujo conversacional funcional
- alcance bien controlado de MVP

Los planes comerciales quedan definidos estrategicamente para futuro, sin meter pago ni billing ahora.
