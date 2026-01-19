# Estructura de TurnoYa Mobile

## 📁 Carpetas y su propósito

### `/src` - Código fuente principal

#### `/api`
Cliente HTTP y llamadas a la API del backend.
- `client.ts` - Configuración de axios con interceptores
- `index.ts` - Exporta todos los endpoints (queue, user, notification)

#### `/components`
Componentes reutilizables de UI.
- `Button.tsx` - Botón con variantes (primary, secondary, danger)
- `Card.tsx` - Tarjeta contenedora
- `QueueList.tsx` - Lista de turnos
- `index.ts` - Exporta todos los componentes

#### `/screens`
Pantallas principales de la app.
- `HomeScreen.tsx` - Pantalla de inicio con estadísticas
- `QueueScreen.tsx` - Gestión de cola
- `SettingsScreen.tsx` - Configuración
- `index.ts` - Exporta todas las pantallas

#### `/navigation`
Configuración de navegación.
- `index.ts` - Navegador de pestañas (Bottom Tab Navigator)

#### `/hooks`
Custom hooks para lógica reutilizable.
- `useQueue.ts` - Manejo de la cola
- `useAuth.ts` - Autenticación y sesión
- `index.ts` - Exporta todos los hooks

#### `/context`
Context API para estado global.
- `AuthContext.tsx` - Contexto de autenticación
- `index.ts` - Exporta contextos

#### `/utils`
Funciones utilitarias.
- `time.ts` - Formateo de fechas y tiempos
- `notifications.ts` - Manejo de notificaciones
- `index.ts` - Exporta funciones útiles

#### `/types`
Tipos de TypeScript.
- `index.ts` - Interfaces y tipos globales

#### `/constants`
Constantes de la aplicación.
- `index.ts` - Colors, mensajes, configuración

#### `/assets`
Recursos estáticos.
- `/images` - Imágenes PNG, SVG, etc.
- `/icons` - Iconos de la app
- `/fonts` - Fuentes personalizadas

### Archivos raíz

- `App.tsx` - Componente principal
- `index.js` - Punto de entrada (React Native)
- `app.json` - Configuración de la app
- `package.json` - Dependencias y scripts
- `tsconfig.json` - Configuración de TypeScript
- `.eslintrc.js` - Reglas de linting
- `babel.config.js` - Configuración de Babel
- `metro.config.js` - Configuración de Metro bundler

---

## 🎯 Cómo usar cada carpeta

### Agregar un nuevo componente
```
Crear: src/components/MiComponente.tsx
Exportar en: src/components/index.ts
```

### Agregar una nueva pantalla
```
Crear: src/screens/MiPantalla.tsx
Exportar en: src/screens/index.ts
Agregar a: src/navigation/index.ts
```

### Agregar un custom hook
```
Crear: src/hooks/useMiHook.ts
Exportar en: src/hooks/index.ts
```

### Llamar a la API
```typescript
import { queueAPI } from '@/api';
const response = await queueAPI.getQueue();
```

---

## 📦 Estructura completa

```
mobile/
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── QueueList.tsx
│   │   └── index.ts
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── QueueScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── index.ts
│   ├── navigation/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useQueue.ts
│   │   ├── useAuth.ts
│   │   └── index.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── index.ts
│   ├── utils/
│   │   ├── time.ts
│   │   ├── notifications.ts
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts
│   ├── constants/
│   │   └── index.ts
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── App.tsx
│   └── ...
├── android/
├── ios/
├── index.js
├── app.json
├── package.json
├── tsconfig.json
└── ...
```

---

## ✅ La estructura está lista para desarrollar

Todos los archivos están organizados, tipados con TypeScript y listos para usar.
