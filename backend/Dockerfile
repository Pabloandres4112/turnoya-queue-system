# Usa imagen oficial de Node.js
FROM node:18-alpine

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instala dependencias
RUN pnpm install --frozen-lockfile --prod=false

# Copia el código fuente
COPY . .

# Compila TypeScript
RUN pnpm run build

# Expone el puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["node", "dist/main.js"]
