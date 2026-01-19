export const config = {
  // Configuración de la aplicación
  app: {
    name: 'TurnoYa',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },

  // Configuración del servidor
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    corsOrigin: process.env.CORS_ORIGIN || '*',
  },

  // Configuración de base de datos
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'turnoya',
  },

  // Configuración de WhatsApp Business API
  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL,
    apiToken: process.env.WHATSAPP_API_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  },

  // Configuración de notificaciones
  notifications: {
    enabled: process.env.NOTIFICATIONS_ENABLED === 'true',
  },

  // Configuración de JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'changeme',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
};
