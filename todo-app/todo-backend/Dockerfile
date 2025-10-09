# magen base oficial de Node.js 22 (incluye npm)
FROM node:22-alpine

#Carpeta de trabajo dentro del contenedor
WORKDIR /usr/src/app

#Se copia los archivos de dependencias primero (para aprovechar cache de Docker en futuros builds)
COPY package*.json ./

# Se instala las dependencias "normales" (production)
# --omit=dev evita instalar dependencias de desarrollo innecesarias
RUN npm install --omit=dev

# Se copia el resto del código del proyecto
COPY . .

# Se expone el puerto que usa Express
EXPOSE 3000

# Arranqu
CMD ["npm","start"]