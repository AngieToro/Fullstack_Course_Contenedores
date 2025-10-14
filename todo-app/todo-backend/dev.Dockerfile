# todo-backend/dev.Dockerfile
FROM node:22-alpine

# 1) Carpeta de trabajo
WORKDIR /usr/src/app

# 2) Copias manifests para cachear deps
COPY package*.json ./

# 3) Instalar dependencias (incluye devDependencies: nodemon)
RUN npm install

# 4) Copiar todo
COPY . .

# 5) Exponer puerto de la app
EXPOSE 3000

# 6) Correr
CMD ["npm","run","dev"]