# TurnoYa Backend

Backend para el sistema de gestión de turnos por WhatsApp.

## 🚀 Tecnologías

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- Docker

## 📋 Requisitos previos

- Node.js 18+
- npm o yarn
- PostgreSQL 14+
- Docker (opcional)

## 🛠️ Instalación

1. Clonar el repositorio
2. Instalar dependencias:

```bash
npm install
```

3. Copiar el archivo de entorno:

```bash
cp .env.example .env
```

4. Configurar las variables de entorno en `.env`

5. Iniciar en modo desarrollo:

```bash
npm run start:dev
```

## 🐳 Docker

### Construir imagen:

```bash
docker build -t turnoya-backend .
```

### Ejecutar con Docker Compose:

```bash
docker-compose up
```

## 📚 Estructura del proyecto

```
src/
├── modules/         # Módulos de la aplicación
│   ├── queue/      # Gestión de cola
│   ├── users/      # Gestión de usuarios
│   └── notifications/  # Notificaciones
├── services/        # Servicios externos
│   ├── whatsapp.service.ts
│   └── notification.service.ts
├── common/          # Recursos compartidos
│   ├── filters/
│   ├── interceptors/
│   └── middlewares/
├── app.module.ts    # Módulo principal
├── main.ts          # Punto de entrada
└── config.ts        # Configuración
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests e2e
npm run test:e2e
```

## 📝 Scripts disponibles

- `npm run start:dev` - Inicia en modo desarrollo
- `npm run start:prod` - Inicia en modo producción
- `npm run build` - Compila el proyecto
- `npm run lint` - Ejecuta el linter
- `npm run format` - Formatea el código

## 🔗 API Endpoints

### Queue
- `GET /api/v1/queue` - Obtener cola actual
- `POST /api/v1/queue` - Agregar a la cola
- `PUT /api/v1/queue/:id` - Actualizar turno
- `DELETE /api/v1/queue/:id` - Eliminar turno
- `POST /api/v1/queue/next` - Siguiente turno
- `POST /api/v1/queue/complete/:id` - Completar turno

### Users
- `GET /api/v1/users/:id` - Obtener usuario
- `POST /api/v1/users` - Crear usuario
- `PUT /api/v1/users/:id` - Actualizar usuario
- `GET /api/v1/users/:id/settings` - Obtener configuración

### Notifications
- `POST /api/v1/notifications/send` - Enviar notificación
- `POST /api/v1/notifications/queue-update` - Notificar cambio en cola

## 📄 Licencia

MIT
