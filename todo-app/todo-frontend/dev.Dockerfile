FROM node:22-alpine
WORKDIR /usr/src/app
COPY . .
# Cambia npm ci a npm install ya que vamos a estar en modo de desarrollo
RUN npm install

EXPOSE 5173
# npm run dev es el comando para iniciar la aplicación en modo de desarrollo
CMD ["npm","run","dev","--","--host","0.0.0.0","--port","5173"]