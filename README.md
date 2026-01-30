#  TurnoYa - Sistema de Gestión de Turnos

**TurnoYa** es una solución completa para gestionar colas y turnos en pequeños negocios mediante WhatsApp. Ideal para barberías, peluquerías, técnicos, talleres y cualquier servicio que necesite organizar sus turnos diarios.

##  Características Principales

-  **App Móvil** - React Native multiplataforma (iOS/Android)
- **API REST** - Backend escalable con NestJS
- **WhatsApp Integration** - Notificaciones y automatización
- **Dashboard** - Estadísticas en tiempo real
- **Configurable** - Tiempos, automatización, plantillas
- **Seguro** - JWT, validación de datos
-  **Containerizado** - Docker & Docker Compose

##  Stack Tecnológico

### Backend
```
Node.js 18+ | NestJS | TypeScript | PostgreSQL | Docker
```

### Mobile
```
React Native 0.83+ | TypeScript 5.8+ | React Navigation | Axios
```

##  Instalación

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/Pabloandres4112/turnoya-queue-system
cd turnoya-queue-system

# Iniciar servicios (Backend + PostgreSQL)
docker-compose up -d

# Backend disponible en: http://localhost:3000
# PostgreSQL en: localhost:5432
# pgAdmin en: http://localhost:5050
```

### Opción 2: Instalación Manual

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run start:dev
```

#### Mobile
```bash
cd mobile
npm install
npm run android    # Para Android
# o
npm run ios        # Para iOS (solo macOS)
```

##  Estructura del Proyecto

```
turnoya-queue-system/
│
├──  backend/                      # API REST
│   ├── src/
│   │   ├── modules/                # Módulos NestJS
│   │   │   ├── queue/              # Gestión de colas
│   │   │   ├── users/              # Gestión de usuarios/negocios
│   │   │   └── notifications/      # Notificaciones
│   │   ├── services/               # Servicios externos
│   │   │   ├── whatsapp/          # WhatsApp API
│   │   │   └── notification/      # Push notifications
│   │   ├── common/                 # Recursos compartidos
│   │   │   ├── filters/            # Exception filters
│   │   │   ├── interceptors/       # Logging interceptors
│   │   │   └── middlewares/        # Auth middleware
│   │   ├── app.module.ts           # Módulo raíz
│   │   ├── config.ts               # Configuración
│   │   └── main.ts                 # Entry point
│   ├── docker-compose.yml          # Desarrollo
│   ├── docker-compose.prod.yml     # Producción
│   ├── Dockerfile                  # Imagen
│   ├── package.json
│   └── tsconfig.json
│
├──  mobile/                       # Aplicación móvil React Native
│   ├── src/
│   │   ├── api/                    # Cliente HTTP para el backend
│   │   │   └── index.ts            # Endpoints tipados (getAll, create, delete, next)
│   │   ├── screens/                # Pantallas principales (4 pantallas)
│   │   │   ├── HomeScreen.tsx      # Pantalla inicial/Dashboard
│   │   │   ├── QueueScreen.tsx     # Gestión de cola en tiempo real
│   │   │   ├── AddClientScreen.tsx # Formulario agregar cliente
│   │   │   └── SettingsScreen.tsx  # Configuración del negocio
│   │   ├── navigation/             # React Navigation Stack
│   │   │   └── AppNavigator.tsx    # Configuración de rutas y navegación
│   │   ├── hooks/                  # Custom hooks React
│   │   │   └── useQueue.ts         # Hook para gestión de cola
│   │   ├── types/                  # Tipos e interfaces TypeScript
│   │   │   └── index.ts            # QueueItem, QueueResponse, NavigationTypes
│   │   ├── constants/              # Constantes globales
│   │   │   └── index.ts            # API_URL, COLORS, QUEUE_STATUS, DEFAULTS
│   │   └── utils/                  # Funciones auxiliares
│   │       └── formatters.ts       # Formateo de teléfono, tiempo, fecha
│   ├── android/                    # Configuración Android nativa
│   ├── ios/                        # Configuración iOS nativa
│   ├── App.tsx                     # Componente raíz de la aplicación
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├──  database/                    # Scripts SQL
│   └── init.sql                    # Schema inicial
│
├── docker-compose.yml              # Orquestación servicios
├── docker-compose.dev.yml
├── README.md                       # (Este archivo)
└── .gitignore
```

## Comandos Disponibles

### Backend
```bash
cd backend

# Desarrollo
npm run start:dev           # Con hot reload
npm run build              # Compilar
npm run test               # Tests

# Producción
npm run start:prod         # Producción
docker build -t turnoya-api .
```

### Mobile
```bash
cd mobile

# Desarrollo
npm start                  # Metro bundler
npm run android            # Ejecutar Android
npm run ios                # Ejecutar iOS
npm test                   # Tests

# Build
npm run build:android      # APK de producción
npm run build:ios          # IPA de producción
```

##  Configuración

### Variables de Entorno - Backend (.env)

```env
# Node
NODE_ENV=development
PORT=3000

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=turnoya
DB_PASSWORD=turnoya_secure_password
DB_NAME=turnoya_db

# WhatsApp API
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_API_TOKEN=your_whatsapp_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id

# Notificaciones
NOTIFICATION_SERVICE_KEY=your_firebase_key

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d

# Email (opcional)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

### Variables de Entorno - Mobile (.env)

```env
REACT_APP_API_URL=http://localhost:3000/api/v1
REACT_APP_WHATSAPP_API_URL=https://api.whatsapp.com
REACT_APP_ENV=development
```

##  Endpoints API Principales

### Queue (Colas)
```
GET    /api/v1/queue              # Obtener cola actual
POST   /api/v1/queue              # Agregar cliente a cola
PUT    /api/v1/queue/:id          # Actualizar cliente
DELETE /api/v1/queue/:id          # Eliminar de cola
POST   /api/v1/queue/next         # Siguiente en cola
POST   /api/v1/queue/complete/:id # Marcar completado
```

### Users (Usuarios/Negocios)
```
GET    /api/v1/users/:id          # Obtener usuario
POST   /api/v1/users              # Crear usuario
PUT    /api/v1/users/:id          # Actualizar usuario
GET    /api/v1/users/:id/settings # Obtener configuración
```

### Notifications
```
POST   /api/v1/notifications/send # Enviar notificación
```

##  Troubleshooting

### Metro bundler no inicia
```bash
cd mobile
npm start -- --reset-cache
```

### Puerto 8081 en uso (Windows)
```powershell
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

### Build error Android
```bash
cd mobile/android
./gradlew clean
cd ..
npm run android
```

### Erro de conexión a BD
```bash
# Verificar que Docker está corriendo
docker-compose ps
# Reiniciar servicios
docker-compose restart postgres
```

##  Screenshots

- **Home Screen**: Dashboard con estadísticas del día
- **Queue Screen**: Vista en tiempo real de la cola
- **Settings Screen**: Configuración del negocio

##  Flujo de Datos

```
Cliente envía mensaje WhatsApp
         ↓
WhatsApp Business API
         ↓
Backend (NestJS/NodeJS)
         ↓
PostgreSQL (Almacenar datos)
         ↓
App Móvil (React Native)
         ↓
Mostrar en tiempo real
         ↓
Notificar al cliente por WhatsApp
```

##  Testing

### Backend
```bash
cd backend
npm test              # Todos los tests
npm test -- --watch  # Modo watch
```

### Mobile
```bash
cd mobile
npm test              # Tests Jest
```

##  Roadmap

-  Estructura base del proyecto
-  API REST básica
-  Aplicación móvil base
-  Integración WhatsApp Business API
-  Sistema de autenticación JWT completo
-  Notificaciones push
-  Panel de estadísticas avanzadas
-  Tests completos (E2E, Unit)
- Documentación API (Swagger)
- CI/CD Pipeline (GitHub Actions)

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/NewFeature`)
3. Commit cambios (`git commit -m 'Add NewFeature'`)
4. Push rama (`git push origin feature/NewFeature`)
5. Abre Pull Request

##  Convenciones de Código

- **TypeScript**: Tipado fuerte en todo el código
- **Commits**: `type(scope): description` (feat, fix, docs, style, refactor, test, chore)
- **Branching**: `feature/`, `bugfix/`, `hotfix/`, `docs/`
- **Nombres**: camelCase para variables, PascalCase para componentes/tipos

##  Licencia

MIT License - Consulta [LICENSE](LICENSE) para detalles

##  Autores

- **Pablo Andrés** - [@Pabloandres4112](https://github.com/Pabloandres4112)

##  Soporte

- **Issues**: [GitHub Issues](https://github.com/Pabloandres4112/turnoya-queue-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Pabloandres4112/turnoya-queue-system/discussions)

## Agradecimientos

- [React Native Community](https://reactnative.dev)
- [NestJS](https://nestjs.com)
- [React Navigation](https://reactnavigation.org)

---

<div align="center">

**Hecho con ❤️ para pequeños negocios**

 Si este proyecto te fue útil, considera darle una estrella en GitHub

</div>
