# Usa imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package.json yarn.lock* package-lock.json* ./

# Instala dependencias
RUN npm install --production=false

# Copia el código fuente
COPY . .

# Compila TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["node", "dist/main.js"]
