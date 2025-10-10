# Express application

Install dependencies with `npm install`

Run with `npm start`

Or in development mode with `npm run dev`

# Visit counter

When running the server, visit http://localhost:3000 to see visit counter, or give environment variable `PORT` to change the port.

# MongoDB

The application has /todos crud which requires a MongoDB. Pass connection url with env `MONGO_URL`

# Redis

Pass connection url with env `REDIS_URL`


Pasos creaciones manuales
1- Crear .dockerignore (en todo-backend/)

2- Crear el archivo Dockerfile (en todo-backend/)

3- Construir la imagen 
	docker build -t todo-backend .

4- Levantar Redis (para el contador) -> se crea una imagen y un contenedor
	docker network create todo-net
	docker run -d --name todo-redis --network todo-net redis:7

5- Ejecutar el backend con redis-> se crea una imagen y un contenedor
	docker run --rm --name todo-backend \
	  --network todo-net \
	  -p 3000:3000 \
	  -e PORT=3000 \
	  -e REDIS_URL=redis://todo-redis:6379 \
	  todo-backend

6- Abrir http://localhost:3000 (el contador es 1, refrescar varias veces y validar que se actualice)

7- Agregar MongoDB para /todos -> se crea una imagen y un contenedor
	docker run -d --name todo-mongo --network todo-net -p 27017:27017 mongo:7

8- Ejecutar el backend con redis y mongo db-> se crea una imagen y un contenedor
	docker run --rm --name todo-backend \
  	--network todo-net \
  	-p 3000:3000 \
  	-e PORT=3000 \
  	-e REDIS_URL=redis://todo-redis:6379 \
  	-e MONGO_URL=mongodb://todo-mongo:27017/todosdb \
  	todo-backend


Pasos creaciones usando Docker compose (plantillas)
1- Crear .dockerignore (en todo-backend/)

2- Crear el archivo Dockerfile (en todo-backend/)

3- Crear el archivo docker-compose.yml (en todo-backend/)

4- Construir la imagen
	docker compose -f docker-compose.dev.yml up -d (-d si ya se tiene, si es la primera vez no debe de ir)

5- Ejecutar los servidores de bases de datos (en todo-backend/)
	Como se activo la autenticación en Mongo con user root/example (del archivo yml)
	La URL debe incluir usuario/clave y authSource=admin (porque el usuario root vive en admin).
		MONGO_URL="mongodb://root:example@localhost:3456/the_database?authSource=admin" npm run dev
	
	Si se desea crear un usuario de aplicación en lugar de usar root (del archivo mongo-init.js)
		MONGO_URL="mongodb://the_username:the_password@localhost:3456/the_database" npm run dev

	Redis
		REDIS_URL="redis://localhost:6379" \
		(si el backend corre dentro de Docker, deberías usar redis://redis:6379)
