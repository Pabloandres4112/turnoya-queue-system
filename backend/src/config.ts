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
    host: process.env.DB_HOST || '192.168.100.6',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'turnoya_db',
  },

  // Configuración de WhatsApp Business API
  whatsapp: {
    apiUrl: process.env.WHATSAPP_API_URL || process.env.WHATSAPP_BASE_URL,
    apiToken: process.env.WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_API_TOKEN,
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    maxRetries: parseInt(process.env.WHATSAPP_MAX_RETRIES || '2', 10),
    retryDelayMs: parseInt(process.env.WHATSAPP_RETRY_DELAY_MS || '1000', 10),
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

  // Versionado legal para trazabilidad de consentimientos
  legal: {
    termsVersion: process.env.LEGAL_TERMS_VERSION || 'v1',
    privacyPolicyVersion: process.env.LEGAL_PRIVACY_POLICY_VERSION || 'v1',
  },
};
